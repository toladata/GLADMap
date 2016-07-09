'''
Downlaods shape file for all intrested countries and place it in tmp folder of parent directory
Example path - http://biogeo.ucdavis.edu/data/gadm2.8/shp/AFG_adm_shp.zip
'''
import urllib

template_str = "http://biogeo.ucdavis.edu/data/gadm2.8/shp/{0}_adm_shp.zip"
file_dir = "../tmp/"

list_country = ['AFG','CHN']

for country in list_country:
	path = template_str.format(country)
	print "Trying path - " + path
	file_name = file_dir + path.split("/")[-1]
	urllib.urlretrieve (path, file_name)
	print "Saved in - " + file_name