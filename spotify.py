import requests
from urllib.parse import urlencode

# Replace these placeholders with your actual Client ID and Client Secret (make secure later)
CLIENT_ID = '30198eecba5b46c989f757e00ef17090'  
CLIENT_SECRET = '6e1eb9caf0e146c3a67e6f9499b4bf70'  
REDIRECT_URI = 'http://localhost:5000/callback'  

# Authorization URL and Token URL from Spotify API
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'

def get_auth_url():
    """Function to return the authorization URL to authenticate the user."""
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': REDIRECT_URI,
        'scope': 'user-read-private',  # Modify scopes as needed
    }
    url = f"{AUTH_URL}?{urlencode(params)}"
    return url

def get_access_token(code):
    """Function to exchange the code for an access token."""
    payload = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }
    response = requests.post(TOKEN_URL, data=payload)
    return response.json().get('access_token')

# Get the authorization URL and print it
print("Please navigate to this URL to authorize:", get_auth_url())

# The user would paste the full redirect URL here
redirect_response = input("Paste the redirect URL here: ")
code = redirect_response.split('code=')[1]

# Use the code to get the access token
access_token = get_access_token(code)
print("Access token:", access_token)

# Use the access token to get the user's profile
def get_user_profile(access_token):
    """Function to fetch the Spotify user profile using the access token."""
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get('https://api.spotify.com/v1/me', headers=headers)
    return response.json()

# Get and print the user profile data
user_profile = get_user_profile(access_token)
print("User's Profile:", user_profile)
