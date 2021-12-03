import flask
import sqlite3
from blockchain_scripts.create import main as create_nft

app = flask.Flask(__name__)

# def dict_factory(cursor, row):
#     """Convert database row objects to a dictionary keyed on column name.

#     This is useful for building dictionaries which are then used to render a
#     template.  Note that this would be inefficient for large queries.
#     """
#     return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}


# def get_db():
#     """Open a new database connection.

#     Flask docs:
#     https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
#     """
#     if 'sqlite_db' not in flask.g:
#         db_filename = app.config['/db/data.sql']
#         flask.g.sqlite_db = sqlite3.connect(str(db_filename))
#         flask.g.sqlite_db.row_factory = dict_factory

#         # Foreign keys have to be enabled per-connection.  This is an sqlite3
#         # backwards compatibility thing.
#         flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")

#     return flask.g.sqlite_db


# @app.teardown_appcontext
# def close_db(error):
#     """Close the database at the end of a request.

#     Flask docs:
#     https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
#     """
#     assert error or not error  # Needed to avoid superfluous style error
#     sqlite_db = flask.g.pop('sqlite_db', None)
#     if sqlite_db is not None:
#         sqlite_db.commit()
#         sqlite_db.close()


@app.route('api/listings')
def get_listings():
    """Return a list of all listings."""

    with sqlite3.connect('datamarketplace/db/application.db') as con:
        cur = con.cursor()
        listings = cur.execute('SELECT * FROM listings')
        return flask.jsonify(listings.fetchall())


@app.route('api/post', methods=['POST'])
def post_data():
    """Return a list of all listings."""
    context = {
        'posted?': True
    }
    create_nft()
    return flask.make_response(flask.jsonify(**context), 201)


if __name__ == '__main__':
    app.run(debug=True)
