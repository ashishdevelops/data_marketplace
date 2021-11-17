import flask

import datamarketplace

@datamarketplace.app.route('/login', methods=['GET', 'POST'])
def login():
    pass