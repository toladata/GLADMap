from flask import Blueprint,  render_template,request
from flask_cache import Cache
import os
from app import app
import json
from py.query_geojson import search_and_create_json, create_json_from_features


mod_data = Blueprint('data', __name__)
cache = Cache(app,config={'CACHE_TYPE': 'simple'})


@mod_data.route("/")
def visualize():
    return render_template('leaftlet.html')


@mod_data.route("/globe")
def visualize():
	return render_template('globe.html')



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


@mod_data.route("/export-geojson/<iso_code>/<name_1>/<name_2>/<name_3>")
def export_geojson(iso_code, name_1, name_2, name_3):
    '''
    	export-geojson/IND/Uttar Pradesh/Bijnor/Dhampur
    '''
    return search_and_create_json(iso_code, name_1, name_2, name_3,"app/static/data/")

def search_location_in_all_files(list_file, iso_code, name_1, name_2, name_3, color):
	feature_result = []
	
	for file in list_file:
		if (file.split("/")[-1][0:3]) != iso_code :
			continue
		adm_data = json.load(open("app"+file,"r"))["features"]
		for feature in adm_data:
			feature["properties"]["color"]=color
			feature_prop = feature["properties"]
			if feature_prop["NAME_1"] == name_1:
				if name_2 == "":
					feature_result.append(feature)
				elif feature_prop["NAME_2"] == name_2:
					if name_3 == "":
						feature_result.append(feature)
					elif "NAME_3" in feature_prop and feature_prop["NAME_3"] == name_3:
						feature_result.append(feature)

	return feature_result

@mod_data.route("/save-state", methods=['POST'])
def save_state():
	

	request_values = request.json
	
	print request_values
	print "\n"
	list_file = request_values['files']
	color_info = request_values['colorInfo']
	saved_file_name = request_values['fileName']

	feature_result = []
	for file in list_file:
		feature_result += json.load(open("app"+file,"r"))["features"]

	print "Added features for all files"
	for color in color_info:
		color_code = color["color"]
		iso_code = color["properties"]["ISO"]
		name_1 = color["properties"]["NAME_1"]
		name_2 = color["properties"]["NAME_2"]
		name_3 = ""
		if "NAME_3" in color["properties"] :
			name_3 = color["properties"]["NAME_3"]

		features = search_location_in_all_files(list_file, iso_code, name_1, name_2, name_3,color_code)
		
		feature_result += features

	print "Added results for all color features"

	geojson = create_json_from_features(feature_result)

	print "created geojson file"

	
	directory_path =  os.path.join('app/static/upload')
	if not os.path.exists(directory_path):
		os.makedirs(directory_path, mode=0777)
		os.chmod(directory_path, 0777)
    
	with open(directory_path+'/'+saved_file_name, "w") as f:
		f.write(geojson)
		f.close()

	print "Saved in " + directory_path+'/'+saved_file_name
	return json.dumps({"success": True})




