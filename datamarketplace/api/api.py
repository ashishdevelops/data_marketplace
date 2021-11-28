from flask import Flask

app = Flask(__name__)


@app.route('/test')
def get_index():
    return {"test": 1}


if __name__ == '__main__':
    app.run(debug=True)
