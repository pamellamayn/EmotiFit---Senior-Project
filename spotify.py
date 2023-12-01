from flask import Flask, request, redirect, session
import requests

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session management

# Spotify API credentials and URLs (replace with your actual credentials)
CLIENT_ID = '30198eecba5b46c989f757e00ef17090'
CLIENT_SECRET = '6e1eb9caf0e146c3a67e6f9499b4bf70'
REDIRECT_URI = 'http://localhost:5000/callback'
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'

@app.route('/')
def home():
    # Check if the user has already authenticated
    if 'access_token' in session:
        return f"Access token: {session['access_token']}"
    else:
        # Redirect to Spotify's authorization URL
        auth_url = f"{AUTH_URL}?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope=user-read-private"
        return redirect(auth_url)

@app.route('/logout')
def logout():
    session.pop('access_token', None)
    return redirect('/')

@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_response = requests.post(
        TOKEN_URL,
        data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }
    )
    token_data = token_response.json()
    access_token = token_data.get('access_token')
    session['access_token'] = access_token

    # Fetch user profile
    headers = {'Authorization': f'Bearer {access_token}'}
    user_profile_response = requests.get('https://api.spotify.com/v1/me', headers=headers)
    user_profile = user_profile_response.json()

    # Store user profile in session or process it as needed
    session['user_profile'] = user_profile

    return redirect('/profile')


@app.route('/profile')
def profile():
    user_profile = session.get('user_profile', {})
    if not user_profile:
        return "User profile not found. Please go to the home page and authorize again."

    # Construct a simple HTML page to display user information
    user_info_html = f"""
    <h1>User Profile Information</h1>
    <p><strong>Display Name:</strong> {user_profile.get('display_name')}</p>
    <p><strong>ID:</strong> {user_profile.get('id')}</p>
    <p><strong>Email:</strong> {user_profile.get('email')}</p>
    <p><strong>Country:</strong> {user_profile.get('country')}</p>
    <p><strong>Account Type:</strong> {user_profile.get('product')}</p>
    <p><a href='/'>Go Back</a></p>
    """
    return user_info_html


if __name__ == '__main__':
    app.run(debug=True, port=5000)
