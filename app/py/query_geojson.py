from dircache import listdir
import sys
from convert_to_geojson import geo_data_dir
import json

def search_feature(iso_code, name_1="", name_2="", name_3=""):
	'''
	Finds data file for a ISO code and looks in below json path
	features.[i].properties.NAME_1
	features.[i].properties.NAME_2
	features.[i].properties.NAME_3
	'''
	print "Searching for - \n\t {0} \n\t {1} \n\t {2} \n\t {3}".format( iso_code, name_1, name_2, name_3 )
	iso_to_file = {}
	feature_result = [] # declaration to store results
	for file in listdir(geo_data_dir):
		if file.endswith(".json") and file != "file_locations.json":
			iso_to_file[file[0:3]] = geo_data_dir + file

	print "Looking in " + iso_to_file[iso_code]

	adm_data = json.load(open(iso_to_file[iso_code],"r"))["features"]
	if name_1 == "":
		return adm_data

	for feature in adm_data:
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

def create_json_from_features(features):
	geo_json = {}		
	geo_json["type"] = "FeatureCollection"                                                                            
	geo_json["features"] = features
	return json.dumps(geo_json)


def search_and_create_json(iso_code, name_1="", name_2="", name_3=""):
	features = search_feature(iso_code, name_1, name_2, name_3)
	print create_json_from_features(features)
	

if __name__ == "__main__":
	if not 2 < len(sys.argv) < 6  :
		print "usage -"
		print "python query_geojson.py COUNTRY_ISO_CODE ADM_LEVEL_1 ADM_LEVEL_2 ADM_LEVEL_3"
		print "example for Afganistan and Ethopia -"
		print "python query_geojson.py AFG Badakhshan Ishkashim"
		print "python query_geojson.py ETH 'Afar' 'Afar Zone 1' Afambo"

	input = ["","","","",""] # file_name ISO NAME_1 NAME_2 NAME_3
	for idx, inp in enumerate(sys.argv):
		input[idx] = inp

	iso_code = input[1]
	name_1 = input[2]
	name_2 = input[3]
	name_3 = input[4]

	search_and_create_json(iso_code, name_1, name_2, name_3)