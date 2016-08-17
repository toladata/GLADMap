# GLADMap
Global Layered Administrative Distrcits Map
Create country boundary and administrative district maps for sharing via GEOJSON service.


# Inspiration

Mercy Corps is a global humanitarian aid agency engaged in transitional environments that have experienced some sort of shock: natural disaster, economic collapse, or conflict.

One of the problems Mercy Corps is facing right now is the insufficient systems for managing mapping data. The incomplete or incorrect maps, and admin layer data can be costly, even dangerous. The lack of timely data and information impacts decision making and coordination with other organizations.

As an example, in April 2015 when the intense earthquake hit Nepal the Mercy Corps emergency response team moved to the affected regions of the country, where they were coordinating with multiple local and international Organizations, to serve communities and beneficiaries.
The team members realized that some of their help actions were inefficient due to errors and discrepancies they found in their maps. In consequence, they had to meet with developers and local communities to update the maps, so that they could reach the beneficiaries as it was planned from the beginning. The whole process took weeks.

To seek the constant innovation Mercy Corps has proposed an open source collaborative mapping tool that allows users to share and update admin boundaries for each of the countries Mercy Corps works in. This tool is a central map service that contains a GEOJSON based data feed and transforms Shapefiles and KML and stores them in a central GIS database. It has a searchable map interface that allows users to coordinate with other organizations and donors where they are working and areas that are underserved.




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


### Using REST service to export GeoJson
/export-geojson/<iso_code>/<ADM_LEVEL_1>/<ADM_LEVEL_2>/<ADM_LEVEL_3>
Example - 

`http://localhost:5000/export-geojson/USA/California/`
`http://localhost:5000/export-geojson/IND/Uttar%20Pradesh/Bijnor/Dhampur`


Screenshot:
![alt tag](https://github.com/toladata/GLADMap/blob/master/screen_shot_2016-07-10_at_2.18.21_pm.png)


