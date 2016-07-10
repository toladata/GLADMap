'''
Updates/Download shape file from GADM and converts it to geojson. converted geojson is stored in ./data/ directory
'''
from convert_to_geojson import convert_shp_json
from download_shape import shp_file_dir, download_country
import sys


if __name__ == "__main__":
	
	if len(sys.argv) != 2:
		print "\tUsage -"
		print "\tpython download_and_convert_one.py <country code>"
		print "\tEXAMPLE -"
		print "\tpython download_and_convert_one.py AFG"
	else:
		country = sys.argv[1]
		print "Processing country " + country
		shape_file_path = download_country(country)
		convert_shp_json(shape_file_path)
		print "Finished execution"


