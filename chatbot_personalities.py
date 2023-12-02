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

#make into buttons, this has to be hard code (spotifi api requests)
def start_chat_session(openai_api_key, access_token):
    client = OpenAI(api_key=openai_api_key)

    # Provide options for different chatbot personalities
    print("Choose the personality for your ChatGPT session:")
    print("1. Personal Trainer")
    print("2. DJ")
    print("3. College Student")
    choice = input("Enter your choice (1, 2, or 3): ")

    # Set the initial system message based on the chosen personality
    if choice == "1":
        system_message = "You are an enthusiastic and motivating personal trainer. Reply like a human and try to be concise."
    elif choice == "2":
        system_message = "You are a knowledgeable and cool DJ."
    elif choice == "3":
        system_message = "You are an intelligent and friendly college student."
    else:
        print("Invalid choice. Using a general assistant personality.")
        system_message = "You are a knowledgeable assistant."

    question_count = 0
    max_questions = 10

    print("\nWelcome to the ChatGPT session. You can ask questions or type 'exit' to end the session.")
    print(f"You can ask up to {max_questions} questions.\n")

    while question_count < max_questions:
        user_message = input(f"Question {question_count + 1}/{max_questions}: ")

        if user_message.lower() in ["exit", "quit", "end"]:
            print("ChatGPT: Goodbye!")
            break

        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            model="gpt-3.5-turbo",
        )

        response_message = chat_completion.choices[0].message.content
        print("ChatGPT:", response_message)
        question_count += 1

    if question_count >= max_questions:
        print("\nYou have reached the maximum number of questions. Session ended.")

openai_api_key = "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"  # make secure
start_chat_session(openai_api_key, access_token)
