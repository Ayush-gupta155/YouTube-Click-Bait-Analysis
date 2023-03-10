import os
from flask import Flask
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors


app = Flask(__name__)

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]

# Disable OAuthlib's HTTPS verification when running locally.
# *DO NOT* leave this option enabled in production.
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

api_service_name = "youtube"
api_version = "v3"
client_secrets_file = "client.json"
flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
    client_secrets_file, scopes)


@app.route('/', methods=['GET'])
def getVideos():
    credentials = flow.run_console()
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    request = youtube.search().list(
        part="id,snippet",
        q="martin garrix",
        type="video",
        maxResults=30

    )
    response = request.execute()

    return(response)


if __name__ == "__main__":
    app.run(debug=True)
