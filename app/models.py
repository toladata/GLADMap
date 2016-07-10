from flask import Blueprint,  render_template,request
from flask_cache import Cache

from app import app
from app import mongo

mod_data = Blueprint('data', __name__)
cache = Cache(app,config={'CACHE_TYPE': 'simple'})


@mod_data.route("/")
def visualize():
    online_users = mongo.db.users.find({'online': True})
    print online_users
    return render_template('leaftlet.html')

