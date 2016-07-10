'''
converts all .shp in ./tmp/ to geojson and places it in data directory
Example command - ogr2ogr -f "GeoJSON" ../../AFG_adm2.json AFG_adm2.shp
'''
import os
from dircache import listdir
from download_shape import shp_file_dir

geo_data_dir = "../static/data/"
## {0} -> destination geojson {1} - source shape
cmd_template = 'ogr2ogr -f "GeoJSON" {0} {1}'

def convert_shp_json(path_shp):
	path_geo_file = geo_data_dir + path_shp.split("/")[-1].split(".")[0] + ".json"
	command = cmd_template.format(path_geo_file,path_shp)
	print command
	os.system(command)

if __name__ == "__main__":
	# convert_shp_json("../tmp/AFG_adm2.shp")
	for file in listdir(shp_file_dir):
		if file.endswith(".shp"):
			convert_shp_json(shp_file_dir + file)

