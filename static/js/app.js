  var files,layer;

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
  
 
  
  d3.json("/data/afghanistan-data/afghanistan-data.geojson", function(error, data) {
//	  L.geoJson(data).addTo(map);
	  var information = L.geoJson(data, {
		    onEachFeature: onEachFeature
		})
	  
	  
	  var markers = L.markerClusterGroup();
	  markers.addLayer(information);
	  map.addLayer(markers);
  });
  
  function whenClicked(e) {
	  // e = event
	  console.log(e);
	  // You can make your ajax call declaration here
	  //$.ajax(... 
	}

	function onEachFeature(feature, layer) {
	    //bind click
	    layer.on({
	        click: whenClicked
	    });
	}
  
  
  function addRegionalDetails(zoomLevel){
	  if(layer)
		  layer.clearLayers();
	  var fileNo=parseInt(zoomLevel/6)+1;
	  if (fileNo>3)
		  fileNo=3;
	  for (var i=0;i<files.length;i++){
		  d3.json(files[i]+"_"+fileNo+".json",function(error, data) {
			  layer = L.geoJson(data, {
				    onEachFeature: onEachFeature
				}).addTo(map);
			  
			  layer.setStyle({weight :2});
			  
			});
		  
	  }
  }
  
  
  
  map.on("zoomend", function (e) {
	  addRegionalDetails(e.target['_animateToZoom']) 
	  });
 

