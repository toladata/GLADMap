# GLADMap
Global Layered Administrative Distrcits Map
Create country boundary and administrative district maps for sharing via GEOJSON service.


### Using gdal/ogr to convert geodatabase to GeoJson
On mac -  
> brew install gdal    
Using `ogr2ogr` we can convert files to GeoJson    
> ogr2ogr -f "GeoJSON" {target_file}.json {source_file}.{gdbtable/shp/any geo format}    

More details (courtesy SARA SAFAVI) - [http://slides.sarasafavi.com/gdal/#/](http://slides.sarasafavi.com/gdal/#/)

### Visualize any geojson online    
[http://techslides.com/demos/d3/d3-geo-renderer.html](http://techslides.com/demos/d3/d3-geo-renderer.html)   

### Adding/Updating GeoJson for any one country
If GeoJson exists for your country, then you will have to delete it manually. This is not done by script to avoid delete horrors as update might turn in an empty file. GeoJson files are stored and present at `$PROJECT_HOME/data/*.json`. File format is `{country code}_adm{2/3}.json` example `AFG_adm2.json`. Country code is ISO ALPHA-3 Code. And adm2 and adm3 defines granularity level of map.

1. `cd $PROJECT_HOME/app/py`
2. `python download_and_convert_one.py <country code>`


Successful execution example- 
```
$ python download_and_convert_one.py 
	Usage -
	python download_and_convert_one.py <country code>
	EXAMPLE -
	python download_and_convert_one.py AFG
$ python download_and_convert_one.py AFG
Processing country AFG
Trying path - http://biogeo.ucdavis.edu/data/gadm2.8/shp/AFG_adm_shp.zip
Saved in - ../tmp/AFG_adm_shp.zip
Saved ../tmp/AFG_adm2.shp
ogr2ogr -f "GeoJSON" ../data/AFG_adm2.json ../tmp/AFG_adm2.shp
Finished execution
```

### Downloading all data and converting them to GeoJson

1. `cd $PROJECT_HOME/app/py`
2. `python download_shape.py` # Downloads and extracts all shape files
3. `python convert_to_geojson.py` # Uses ogr2ogr for converting files to geojson

### Querying geojson for an area using query_geojson.py
usage -   
  python query_geojson.py COUNTRY_ISO_CODE ADM_LEVEL_1 ADM_LEVEL_2 ADM_LEVEL_3   
  example for Afganistan and Ethopia -   
  python query_geojson.py AFG Badakhshan Ishkashim   
  python query_geojson.py ETH 'Afar' 'Afar Zone 1' Afambo   
      
Example -   
1. `cd $PROJECT_HOME/app/py`   
2. `python query_geojson.py IND 'Uttar Pradesh' Bijnor Dhampur`   

**We use git lfs to manage large sized json files. In future we can create a zipped folder for all files and use docker to deploy app**


### Instructions to Run/Deploy on server

- Navigate to the intended folder for deployment
- Run the following commands:

sudo apt-get install python-pip<br/>
git clone https://github.com/toladata/GLADMap.git<br/>
pip install -r requirements.txt<br/>
unzip app/static/data
python run.py<br/>

- The server starts running
- Navigate to http://0.0.0.0:5000/ to see the landing page
- Navigate to http://0.0.0.0:5000/globe to see the globe version 



The project is also hosted at 45.55.25.49:8000/globe(Web) or 45.55.25.49:8000(Mobile/Web) 

# Summary

The primary use case for this tool is to centralize map data, shape files and country and government administrative metadata into one central web based data service for Mercy Corps as well as other partner and donor organizations. This would allow us to greatly reduce the redundant map and data services throughout the agency and provide quick access to a standard set of location data that can be edited and shared during a crisis or surge response or just when collaborating with other organizations and the need to coordinate security incidents, distributions and general beneficiary need.

# Priority Deliverables

1. A central map service that contains a GEOJSON based data feed of all current Mercy Corps working countries and their top 4 level government administrative boundaries.  This service should initially be fed by the GADM http://www.gadm.org ESRI based shape file or generic shapefile repository for each of the current MC countries or a sub set to start:  Afghanistan, Central African Republic, China, Colombia ,DR Congo, Egypt, Ethiopia, Georgia, Guatemala, Haiti, Honduras, India, Indonesia, Iraq, Japan, Jordan, Kenya, Kosovo, Kyrgyzstan, Lebanon, Liberia, Libya, Mali, Mongolia, Morocco, Myanmar, Nepal, Niger, Nigeria, Pakistan, Somalia, South Sudan, Sri Lanka, Sudan, Syria, Tajikistan, Timor-Leste, Tunisia, Turkey, Uganda, Ukraine, United States, West Bank and Gaza, Yemen, Zimbabwe.

2. The ability to transform ESRI based shapefiles into GEOJSON format.  Using a service like QGis or PySHP.

3. Create a leaflet.js map visualizations that can display an import GEOJSON formatted map services as layers that can be toggled on and off.  

4. A simple search interface to find one of the available regions or countries on the leaflet map and view/toggle the available layers for that section of the map. 

5. Export of a selected combination of layers for current region/country in geojson format.

6. Discoverable RESTFul GEOJSON web service that can be queried by country down to admin level 4 and provide a geojson service for each available layer in that region.

# Nice to Haves
1. Import/export in KML for google earth.

2. Ability to manually draw a new layer with leaflet draw or similar service. http://leaflet.github.io/Leaflet.draw/

3. Build the rest service using Django Rest Framework http://www.django-rest-framework.org 

4. Open Street Maps integration as the base layers with Humanitarian Data services.

# References

- http://www.mercycorps.org

- https://pypi.python.org/pypi/pyshp/1.1.7 (Shapefile to GEOJSON)

- http://www.qgis.org/en/site/ (QGis Open Source desktop mapping tool)
