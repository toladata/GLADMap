from flask import Blueprint,  render_template


mod_data = Blueprint('view', __name__)

@mod_data.route("/visualize")
def visualize():
    return render_template('viz.html')