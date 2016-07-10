from flask import Blueprint,  render_template,request
from flask_cache import Cache
import os
from app import app
from app import mongo
import json

mod_data = Blueprint('data', __name__)
cache = Cache(app,config={'CACHE_TYPE': 'simple'})


@mod_data.route("/")
def visualize():
    online_users = mongo.db.users.find({'online': True})
    print online_users
    return render_template('leaftlet.html')


@mod_data.route("/get-uploaded-data")
def get_uploaded_data():
    allFiles=[]
    for files in os.listdir("app/static/upload"):
        allFiles.append(files)
    return json.dumps({"files": allFiles})


@mod_data.route("/upload-file", methods=['POST'])
def upload_file():
    print request
    files = request.files.getlist('file')[0]
    filename= request.values['fileNames']
    print filename
    if files:
        directory_path =  os.path.join('app/static/upload')
        if not os.path.exists(directory_path):
            os.makedirs(directory_path, mode=0777)
            os.chmod(directory_path, 0777)
        if files:
            files.save(directory_path+'/'+filename)
        else:
            return json.dumps({"success": False})
    return json.dumps({"success": True})


