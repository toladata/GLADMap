  var files,layer;
  var leaf_id =[];
var selectedPolygon;
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
	 files=data;
	 for (var i in files)
      $('#countryList').append($("<option>").attr('value',files[i].file_name).text(files[i].country_name));
  });


$("#countryList").on('change',function(){
      if(layer)
          layer.clearLayers();
      var zoomLevel=2;
      d3.json('/static/data/'+$(this).val(),function(error, data) {
          layer=L.geoJson(data, {
                onEachFeature: labelFeature
            }).addTo(map)

          layer.setStyle({weight :2,opacity:(zoomLevel)/18});

        });
})

  function label_click(e) {
	  //console.log(e.target._leaflet_id);
      $('#modalOpener').trigger('click')
	  //leaf_id.push(e.layer._leaflet_id);
	  //console.log(e);
	  selectedPolygon = e.target;
	}


    $("#done").on("click",function(){
    status= $("input[type='radio']:checked").val();
    console.log(status);
    var i;
     selectedPolygon.setStyle({
              weight: 2,
              color: '#000000',
              fillColor: status
          });
})


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

	function labelFeature(feature, layer) {
	    //bind click
	    //layer.bindPopup(layer.feature.properties.NAME_1);
	    layer.bindPopup(layer.feature.properties.NAME_1);
        layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });

	    layer.on({
	        click: label_click
	    });
	}


	function eventFeature(feature, layer) {
	    //bind click
	    layer.bindPopup(layer.feature.properties.NAME_1);
	    layer.on({
	        click: whenClicked

	    });
	}


  map.on("zoomend", function (e) {
	  var zoomLevel=e.target['_animateToZoom'];
//	  for (var i=0;i<layers.length;i++){
//		  layers[i].setStyle({opacity: (zoomLevel)/18});
//		  }
  });


 


  d3.json("static/data/afghanistan-data/afghanistan.geojson", function(error, data) {
//	  L.geoJson(data).addTo(map);
	  var information = L.geoJson(data, {
		    onEachFeature: eventFeature
		});
	  var markers = L.markerClusterGroup();
	  markers.addLayer(information);
	  map.addLayer(markers);
  });



