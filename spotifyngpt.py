import requests
from openai import OpenAI
from urllib.parse import urlencode

# Replace these placeholders with your actual Client ID and Client Secret (make secure later)
CLIENT_ID = '30198eecba5b46c989f757e00ef17090'  
CLIENT_SECRET = '6e1eb9caf0e146c3a67e6f9499b4bf70'  
REDIRECT_URI = 'http://localhost:5000/callback'  

# Authorization URL and Token URL from Spotify API
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'

def get_auth_url():
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': REDIRECT_URI,
        'scope': 'user-read-private user-top-read',  # Include user-top-read scope
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

def get_user_top_artists(access_token, limit=10):
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {'limit': limit}
    response = requests.get('https://api.spotify.com/v1/me/top/artists', headers=headers, params=params)
    
    if response.status_code != 200:
        print("Error:", response.status_code)
        print("Response content:", response.text)
        return []

    return [artist['name'] for artist in response.json().get('items', [])]



def get_music_recommendations(artists, openai_api_key):
    """Generate music recommendations based on a list of artists using OpenAI."""
    client = OpenAI(api_key=openai_api_key)

    prompt = "Based on these artists: " + ", ".join(artists) + ", suggest similar music artists or genres."
    
    response = client.chat.completions.create(
        messages=[{"role": "system", "content": "You are a knowledgeable music recommender."}, 
                  {"role": "user", "content": prompt}],
        model="gpt-3.5-turbo",
    )

    return response.choices[0].message.content

from openai import OpenAI
import requests

# Function to get the user's top track from Spotify
def get_top_track(access_token):
    url = "https://api.spotify.com/v1/me/top/tracks?limit=1"
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        top_track = response.json()['items'][0]
        return f"Your most liked song is '{top_track['name']}' by {', '.join(artist['name'] for artist in top_track['artists'])}."
    else:
        return "Unable to retrieve your most liked song from Spotify."

# Function to get the user's top artist from Spotify
def get_top_artist(access_token):
    url = "https://api.spotify.com/v1/me/top/artists?limit=1"
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        top_artist = response.json()['items'][0]
        return f"Your favorite artist is '{top_artist['name']}'."
    else:
        return "Unable to retrieve your favorite artist from Spotify."

#make into buttons, this has to be hard code (spotifi api requests)
def start_chat_session(openai_api_key, access_token):
    client = OpenAI(api_key=openai_api_key)
    question_count = 0
    max_questions = 10

    print("Welcome to the ChatGPT session. You can ask me questions about your Spotify preferences or type 'exit' to end the session.")
    print(f"You can ask up to {max_questions} questions.\n")

    while question_count < max_questions:
        user_message = input(f"Question {question_count + 1}/{max_questions}: ")

        if user_message.lower() in ["exit", "quit", "end"]:
            print("ChatGPT: Goodbye!")
            break

        # Determine the type of Spotify request based on the user's question
        if "most liked song" in user_message.lower():
            response_message = get_top_track(access_token)
        elif "favorite artist" in user_message.lower():
            response_message = get_top_artist(access_token)
        else:
            # For other types of questions, use ChatGPT as usual
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a knowledgeable assistant."},
                    {"role": "user", "content": user_message}
                ],
                model="gpt-3.5-turbo",
            )
            response_message = chat_completion.choices[0].message.content

        print("ChatGPT:", response_message)
        question_count += 1

    if question_count >= max_questions:
        print("\nYou have reached the maximum number of questions. Session ended.")

# Build on over time
openai_api_key = "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"  # make secure
start_chat_session(openai_api_key, access_token)
artists = get_user_top_artists(access_token)  # Use the access token from Spotify API
recommendations = get_music_recommendations(artists, openai_api_key)
print("Music Recommendations:", recommendations)
