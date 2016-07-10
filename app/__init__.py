from flask import Flask, render_template
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
mongo = PyMongo(app)


   
@app.errorhandler(404)
def not_found(error):
    return "TODO: 404 page", 404
   
   
from app.views import mod_data as viewModule
from app.models import mod_data as dataModule
app.register_blueprint(viewModule)
app.register_blueprint(dataModule)
