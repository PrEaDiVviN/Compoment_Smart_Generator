from flask import Flask, request, send_file
from flask_cors import CORS
from moviepy.editor import VideoFileClip

from Parser.LanguageParser import LanguageParser

app = Flask(__name__)
CORS(app)


@app.route("/video", methods = ["GET"])
def video():
    seconds = int(request.args.get("seconds"))

    clip = VideoFileClip("./large/video.mp4").subclip(0, seconds)
    clip.to_videofile("./large/output.mp4", codec="libx264", temp_audiofile='temp-audio.m4a', remove_temp=True, audio_codec='aac')
    return send_file("./large/output.mp4", mimetype='video/mp4')


@app.route("/audio", methods = ["GET"])
def audio():
    return send_file("./large/audio.mp3", mimetype='audio/mp3')


@app.route("/image", methods=['GET'])
def image():
    type = request.args.get('type')
    return send_file('./images/' + type + ".png", mimetype='image/png')


@app.route('/language', methods=["POST"])
def parse():
    parser = LanguageParser()

    json = request.json
    response = parser.parse(json["message"])
    print(response)
    return response


if __name__ == '__main__':

    app.run()
