import flask

import datamarketplace


@datamarketplace.app.route('/listings', methods=['GET', 'POST'])
def get_listings():
    pass
