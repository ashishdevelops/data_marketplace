import flask
import sqlite3
import requests
import ipfshttpclient
import os
# from brownie import SimpleCollectible, accounts, network, config

app = flask.Flask(__name__)

# def create_nft(sample_token_uri):
#     network.connect('rinkeby')
#     dev = accounts.add(config["wallets"]["from_key"])
#     print(network.show_active())
#     simple_collectible = SimpleCollectible[len(SimpleCollectible) - 1]
#     token_id = simple_collectible.tokenCounter()
#     transaction = simple_collectible.createCollectible(
#         sample_token_uri, {"from": dev})
#     transaction.wait(1)
#     print(
#         "Awesome! You can view your NFT at {}".format(
#             OPENSEA_FORMAT.format(simple_collectible.address, token_id)
#         )
#     )
#     print('Please give up to 20 minutes, and hit the "refresh metadata" button')
#     network.disconnect()


@app.route('/api/listings')
def get_listings():
    """Return a list of all listings."""

    with sqlite3.connect('datamarketplace/db/application.db') as con:
        cur = con.cursor()
        listings = cur.execute('SELECT * FROM listings')
        return flask.jsonify(listings.fetchall())


@app.route('/api/post', methods=['POST'])
def post_data():
    """Post a new listing."""
    print(os.getenv('IPFS_PROJECT_ID'))
    print(os.getenv('IPFS_PRIVATE_KEY'))
    context = {
        'posted?': True
    }
    # flask.request.files['file']
    file = {'file': 'test_images/test-image.jpeg'}
    response = requests.post('https://ipfs.infura.io:5001/api/v0/add', files=file,
                             auth=(os.getenv('IPFS_PROJECT_ID'), os.getenv('IPFS_PRIVATE_KEY')))
    # client = ipfshttpclient.connect('https://ipfs.infura.io', auth=(,))
    # os.system(
    #     "brownie run datamarketplace/blockchain_scripts/create.py --network rinkeby")
    context['ipfs'] = response.text
    return flask.make_response(flask.jsonify(**context), 201)


if __name__ == '__main__':
    app.run(debug=True)
