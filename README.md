# GLADMap
Global Layered Administrative Distrcits Map
Create country boundary and administrative district maps for sharing via GEOJSON service.

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
