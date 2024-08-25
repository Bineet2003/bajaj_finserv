from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Replace these with your actual user ID, email, and roll number
USER_ID = "bineet_kumar_patel"
COLLEGE_EMAIL_ID = "patelbineet2@gmail.com"
COLLEGE_ROLL_NUMBER = "21BCE2148"

@app.route('/bfhl', methods=['POST'])
def post_endpoint():
    try:
        data = request.get_json()
        numbers = [int(x) for x in data.get('data', []) if isinstance(x, int)]
        alphabets = [x for x in data.get('data', []) if isinstance(x, str) and x.isalpha()]
        highest_lowercase = [x for x in alphabets if x.islower()]
        if highest_lowercase:
            highest_lowercase = max(highest_lowercase)
        else:
            highest_lowercase = None

        response = {
            "status": "success",
            "user_id": USER_ID,
            "college_email_id": COLLEGE_EMAIL_ID,
            "college_roll_number": COLLEGE_ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"status": "failure", "error": str(e)}), 400

@app.route('/bfhl', methods=['GET'])
def get_endpoint():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
