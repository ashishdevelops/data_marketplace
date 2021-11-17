import flask
import datamarketplace


@datamarketplace.app.route('/')
def get_index():
    return "<h1>hello, welcome to the data marketplace<h1>"
