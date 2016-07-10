from dircache import listdir
from convert_to_geojson import geo_data_dir

list_country = ['AFG',
'CAF', 'CHN', 'COL', 'COD', 'EGY', 'ETH', 'GEO', 'GTM', 'HTI', 'HND', 'IND', 'IDN', 'IRQ', 'JPN', 'JOR', 'KEN', 'XKX', 'KGZ', 'LBN', 'LBR', 'LBY', 'MLI', 'MNG', 'MAR', 'MMR', 'NPL',
'NER','NGA','PAK','SOM','SSD','LKA','SDN','SYR','TJK','TLS','TUN','TUR','UGA','UKR','USA','XWB','YEM','ZWE']

list_country_name = ["Afganistan",
"Central African Republic","China","Colombia ","DR Congo","Egypt","Ethiopia","Georgia","Guatemala","Haiti","Honduras","India","Indonesia","Iraq","Japan","Jordan","Kenya","Kosovo","Kyrgyzstan","Lebanon","Liberia","Libya","Mali","Mongolia","Morocco","Myanmar","Nepal",
"Niger","Nigeria","Pakistan","Somalia","South Sudan","Sri Lanka","Sudan","Syria","Tajikistan","Timor-Leste","Tunisia","Turkey","Uganda","Ukraine","United States","West Bank and Gaza","Yemen","Zimbabwe"]

code_to_name = {}
for idx,country in enumerate(list_country):
	code_to_name [list_country[idx]] = list_country_name[idx]

meta_data = []

if __name__ == "__main__":
	# convert_shp_json("../tmp/AFG_adm2.shp")
	for file in listdir(geo_data_dir):
		if file.endswith(".json") and file != "file_locations.json":
			meta_data_obj = {}
			meta_data_obj['country_name'] = code_to_name[file[0:3]]
			meta_data_obj['file_name'] = file
			meta_data.append(meta_data_obj)

print meta_data
