  var files,layers=[];

  // initialize the map
  var map = L.map('mapid').setView([36.99404, 39.75621], 2);
  // load a tile layer
     L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
//    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      minZoom: 1,
      continuousWorld: false,
      // this option disables loading tiles outside of the world bounds.
      noWrap: true
    }).addTo(map);


  d3.json("/static/data/file_locations.json", function(error, data) {
	 files=data.files;
	 addRegionalDetails(2);
  });


//  d3.json("/data/afghanistan-data/afghanistan.geojson", function(error, data) {
////	  L.geoJson(data).addTo(map);
//	  var information = L.geoJson(data, {
//		    onEachFeature: onEachFeature
//		});
//	  var markers = L.markerClusterGroup();
//	  markers.addLayer(information);
//	  map.addLayer(markers);
//  });

  function whenClicked(e) {

	  d3.select(".tooltip")
	  .style("left",  e.originalEvent.clientX + "px")
	  .style("top", e.originalEvent.clientY + "px")
	  .html(e.target.feature.properties.type)
	  .style('opacity',1);

	  setTimeout(function(){ d3.select(".tooltip") .style('opacity',0); }, 2000);


	  // e = event
	  console.log(e.target.feature.properties.type);
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
//	  if(layer)
//		  layer.clearLayers();
//	  var fileNo=parseInt(zoomLevel/6)+1;
//	  if (fileNo>3)
//		  fileNo=3;
//	  for (var i=0;i<files.length;i++){
//		  d3.json('/static/data/'+files[i],function(error, data) {
//			  layers.push(L.geoJson(data, {
//				    onEachFeature: onEachFeature
//				}).addTo(map));
//
//			  layers[i].setStyle({weight :2,opacity:(zoomLevel)/18});
//
//			});
//
//	  }
  }





  map.on("zoomend", function (e) {
	  var zoomLevel=e.target['_animateToZoom'];
	  for (var i=0;i<layers.length;i++){
		  layers[i].setStyle({opacity: (zoomLevel)/18});
		  }
  });
 

