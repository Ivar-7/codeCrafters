import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

@app.route("/")
def index():
    return "Welcome to the home page!"

@app.route("/api", methods=["POST"])
def api():
    message = request.json.get("message")

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": message}
            ],
            model="gpt-3.5-turbo"
        )
        return jsonify({"response": chat_completion.choices[0].message.content.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/analyze-plan", methods=["POST"])
def analyze_plan():
    data = request.json
    plan = data.get("plan", "")

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant for analyzing crop rotation plans."},
                {"role": "user", "content": f"Analyze the following crop rotation plan and provide the advantages and possible demerits:\n\n{plan}"}
            ],
            model="gpt-3.5-turbo"
        )
        return jsonify({"analysis": chat_completion.choices[0].message.content.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
