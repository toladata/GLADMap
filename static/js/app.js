  var files,layer;
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
  var map = L.map('mapid').setView([36.99404, 39.75621], 2);
  // load a tile layer
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      minZoom: 1,
      continuousWorld: false,
      // this option disables loading tiles outside of the world bounds.
      noWrap: true
    }).addTo(map);
 
  
  
  
  d3.json("/data/file_locations.json", function(error, data) {
	 files=data.files;
	 addRegionalDetails(2);
  });
  
  function addRegionalDetails(zoomLevel){
	  if(layer)
		  layer.clearLayers();
	  var fileNo=parseInt(zoomLevel/6)+1;
	  for (var i=0;i<files.length;i++){
		  d3.json(files[i]+"_"+fileNo+".json",function(error, data) {
			  layer=L.geoJson(data).addTo(map);
			  layer.setStyle({weight :2}) 
			});
		  
	  }
  }
  
  map.on("zoomend", function (e) {addRegionalDetails(e.target['_animateToZoom']) });
 

