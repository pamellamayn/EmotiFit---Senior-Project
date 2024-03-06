import requests
from urllib.parse import urlencode
import random
import requests

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

# Function to get the user's liked songs playlist ID
def get_liked_songs_playlist_id(access_token):
    url = "https://api.spotify.com/v1/me/playlists"
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        playlists = response.json()['items']
        for playlist in playlists:
            if playlist['name'] == "Liked Songs":
                return playlist['id']

    return None

def get_audio_features_for_tracks(track_ids, access_token):
    """Fetch audio features for a list of track IDs."""
    url = f"https://api.spotify.com/v1/audio-features"
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {'ids': ','.join(track_ids)}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()['audio_features']
    else:
        print("Error fetching audio features:", response.status_code)
        return []

def get_audio_features_for_tracks(track_ids, access_token):
    if not track_ids:
        return []  # Return an empty list if no track IDs are provided

    url = f"https://api.spotify.com/v1/audio-features"
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {'ids': ','.join(track_ids)}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()['audio_features']
    else:
        print("Error fetching audio features:", response.status_code)
        return []  # Return an empty list in case of an error


def filter_tracks_by_bpm(audio_features, desired_bpm):
    """Filter tracks by BPM range."""
    bpm_lower_bound = desired_bpm - 10
    bpm_upper_bound = desired_bpm + 10
    return [track for track in audio_features if track and bpm_lower_bound <= track['tempo'] <= bpm_upper_bound]

def get_tracks_from_playlist(playlist_id, access_token):
    """Fetch tracks from a given Spotify playlist."""
    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        tracks = response.json()['items']
        return [track['track']['id'] for track in tracks if track['track']]
    else:
        print("Error fetching tracks from playlist:", response.status_code)
        return []

def play_random_songs(access_token):
    top_hits_playlist_id = "37i9dQZF1DXcBWIGoYBM5M"  # Spotify's "Top Hits" playlist ID
    desired_bpm = float(input("Enter your desired BPM: "))

    while True:
        user_choice = input("\nChoose an option:\n1. Play a random song in BPM range from Liked Playlist\n2. Change BPM\n3. Play a random song in BPM range from Top Hits Playlist\n4. Exit\nEnter choice (1-4): ")

        if user_choice == "1" or user_choice == "3":
            if user_choice == "1":
                url = "https://api.spotify.com/v1/me/tracks"
                response = requests.get(url, headers={'Authorization': f'Bearer {access_token}'})
                if response.status_code != 200:
                    print("Unable to access tracks.")
                    continue
                tracks = response.json()['items']
                track_ids = [track['track']['id'] for track in tracks]
                audio_features = get_audio_features_for_tracks(track_ids, access_token)

                if not audio_features:
                    print("No audio features found for tracks.")
                    continue

                bpm_filtered_tracks = filter_tracks_by_bpm(audio_features, desired_bpm)
                if bpm_filtered_tracks:
                    selected_track = random.choice(bpm_filtered_tracks)
                    selected_track_id = selected_track['id']
                    track_bpm = selected_track['tempo']
                else:
                    print("No tracks found within the specified BPM range.")
                    continue
            else:
                top_hits_tracks_ids = get_tracks_from_playlist(top_hits_playlist_id, access_token)
                if top_hits_tracks_ids:
                    selected_track_id = random.choice(top_hits_tracks_ids)
                    selected_track = requests.get(f"https://api.spotify.com/v1/audio-features/{selected_track_id}", 
                                              headers={'Authorization': f'Bearer {access_token}'}).json()
                    track_bpm = selected_track['tempo']
                else:
                    print("No tracks found in the Top Hits playlist.")
                    continue

            track_details_url = f"https://api.spotify.com/v1/tracks/{selected_track_id}"
            track_details_response = requests.get(track_details_url, headers={'Authorization': f'Bearer {access_token}'})
            if track_details_response.status_code == 200:
                track_details = track_details_response.json()
                track_name = track_details['name']
                artist_name = ', '.join(artist['name'] for artist in track_details['artists'])
                track_url = track_details['external_urls']['spotify']
                print(f"Song: {track_name} by {artist_name}\nURL: {track_url}")
                print(f"Song BPM: {track_bpm:.2f} (User selected BPM range: {desired_bpm - 10} to {desired_bpm + 10})")

        elif user_choice == "2":
            desired_bpm = float(input("Enter new desired BPM: "))

        elif user_choice == "4":
            print("Exiting program.")
            break

        else:
            print("Invalid choice. Please enter a number between 1 and 4.")



if access_token:
    play_random_songs(access_token)
else:
    print("Access token not available. Random songs cannot be played.")
