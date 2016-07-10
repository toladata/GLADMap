from flask import Blueprint,  render_template,request
from flask_cache import Cache

from app import app

mod_data = Blueprint('data', __name__)
cache = Cache(app,config={'CACHE_TYPE': 'simple'})


@mod_data.route("/")
def visualize():
    return render_template('leaftlet.html')

