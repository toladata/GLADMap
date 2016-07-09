'''
Downlaods shape file for all intrested countries and place it in tmp folder of parent directory
Example path - http://biogeo.ucdavis.edu/data/gadm2.8/shp/AFG_adm_shp.zip
'''
import urllib
import zipfile

template_str = "http://biogeo.ucdavis.edu/data/gadm2.8/shp/{0}_adm_shp.zip"
shp_file_dir = "../tmp/"

list_country = ['AFG','CHN']

def download_country(country):
	path = template_str.format(country)
	print "Trying path - " + path
	file_name = path.split("/")[-1]
	file_path = shp_file_dir + file_name
	urllib.urlretrieve (path, file_path)
	print "Saved in - " + file_path
	zip_ref = zipfile.ZipFile(file_path, 'r')
	try:
		zip_ref.extract(country+"_adm3.shp",shp_file_dir)
		zip_ref.extract(country+"_adm3.shx",shp_file_dir)
		print "Saved " + country + "_adm3.shp"
	except Exception, e:
		try:
			zip_ref.extract(country+"_adm2.shp",shp_file_dir)
			zip_ref.extract(country+"_adm2.shx",shp_file_dir)
			print "Saved " + country + "_adm2.shp"
		except Exception, e:
			print "Cant find shape file for " + file_name

	zip_ref.close()

if __name__ == "__main__":
	for country in list_country:
		download_country(country)

