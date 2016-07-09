  
  var geojsonFeature = {
		    "type": "Feature",
		    "properties": {
		        "name": "Coors Field",
		        "amenity": "Baseball Stadium",
		        "popupContent": "This is where the Rockies play!"
		    },
		    "geometry": {
		        "type": "Point",
		        "coordinates": [-104.99404, 39.75621]
		    }
		};


  // initialize the map
  var map = L.map('mapid').setView([36.99404, 39.75621], 3);


  // load a tile layer
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    {
      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
      maxZoom: 18,
      minZoom: 2
    }).addTo(map);
  
  
  d3.json("/data/AFG/afg_2.json", function(error, data) {
	  
	  L.geoJson(data).addTo(map);
	});
  
 

