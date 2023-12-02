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
    params = {
    'client_id': CLIENT_ID,
    'response_type': 'code',
    'redirect_uri': REDIRECT_URI,
    'scope': 'user-read-private user-top-read user-library-read',  # Include necessary scopes
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

def get_top_items(access_token, type='tracks', time_range='medium_term', limit=10):
    url = f"https://api.spotify.com/v1/me/top/{type}"
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {'limit': limit, 'time_range': time_range}
    response = requests.get(url, headers=headers, params=params)

    if response.status_code != 200:
        print("Error fetching top items:", response.status_code)
        print("Response content:", response.text)
        return []

    return response.json().get('items', [])

def get_saved_tracks(access_token, limit=10):
    """Fetch the user's saved tracks from Spotify."""
    url = "https://api.spotify.com/v1/me/tracks"
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {'limit': limit}
    response = requests.get(url, headers=headers, params=params)
    return response.json().get('items', [])

# Example usage after getting access_token
top_tracks = get_top_items(access_token, 'tracks')
top_artists = get_top_items(access_token, 'artists')
saved_tracks = get_saved_tracks(access_token)

print("Top Tracks:", top_tracks)
print("Top Artists:", top_artists)
print("Saved Tracks:", saved_tracks)

import requests
from urllib.parse import urlencode
from pprint import pprint  
from tabulate import tabulate 


# Print the user's profile data using pprint for better formatting
user_profile = get_user_profile(access_token)
print("User's Profile:")
pprint(user_profile)  

def format_tracks(items):
    """Format track items for tabular display."""
    formatted = []
    for item in items:
        track = item['track'] if 'track' in item else item
        formatted.append([track['name'], track['artists'][0]['name'], track.get('album', {}).get('name', 'N/A')])
    return formatted

def print_tabular_data(items, headers):
    """Print items in a table format."""
    if items:
        print(tabulate(items, headers=headers, tablefmt="grid"))
    else:
        print("No items found.")

# Fetch and print top tracks, top artists, and saved tracks in a tabular format
top_tracks = get_top_items(access_token, 'tracks')
top_artists = get_top_items(access_token, 'artists')
saved_tracks = get_saved_tracks(access_token)

print("\nTop Tracks:")
print_tabular_data(format_tracks(top_tracks), ["Track Name", "Artist", "Album"])

print("\nTop Artists:")
print_tabular_data([[artist['name'], artist['genres'][0] if artist['genres'] else 'N/A', artist['popularity']] for artist in top_artists], ["Artist Name", "Genre", "Popularity"])

print("\nSaved Tracks:")
print_tabular_data(format_tracks(saved_tracks), ["Track Name", "Artist", "Album"])
