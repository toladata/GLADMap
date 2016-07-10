function ChiasmLeaflet() {

    $.ajax({
       url: "/get-uploaded-data",
       type: "GET"
     }).done(function( data ) {
        var files=JSON.parse(data).files;
        for(var i in files){
             $('#uploadedList').append($("<option>").attr('value',files[i]).text(files[i]));
        }
     });





    function style(feature) {
        return {
            fillColor: feature.properties.color?feature.properties.color:'green',
            weight: 1,
            color:'gray'
        };
    }



  var files,layers=[],features,featuresInformation,zoomLevel,colorInfo=[];
  var leaf_id =[];
  var selectedPolygon;

  // initialize the map
  var my = ChiasmComponent({
      center: [0, 0],
      zoom: 2
    });

    // This line of code lets you see what the center value is when you pan in the map.
    //my.when("center", console.log, console);

    // Expose a div element that will be added to the Chiasm container.
    // This is a special property that Chiasm looks for after components are constructed.
    my.el = document.createElement("div");

    // When you zoom out all the way, this line makes the background black
    // (by default it is gray).
    d3.select(my.el).style("background-color", "black");

  var markers = new L.FeatureGroup();

   my.map = L.map(my.el, {

      // Turn off the "Leaflet" link in the lower right corner.
      // Leaflet is properly attributed in the README.
      attributionControl: false

    }).setView(my.center, my.zoom);


  // load a tile layer
//     L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
   L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
// L.tileLayer('http://a.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      minZoom: 1,
//      continuousWorld: false,
      // this option disables loading tiles outside of the world bounds.
//      noWrap: true
    }).addTo(my.map);


      function getCenter(){
        var center = my.map.getCenter();
        return [center.lng, center.lat];
      }

      // Sets the Leaflet map center to be the given center.
      // Note that Leaflet will immediately trigger a "move"
      // event
      function setCenter(center){
        my.map.off("move", onMove);
        my.map.panTo(L.latLng(center[1], center[0]), {
          animate: false
        });
        my.map.on("move", onMove);
      }

      my.map.on("move", onMove);

      function onMove(){
        my.center = getCenter();
        my.zoom = my.map.getZoom();
      }

      // If the center or zoom was set externally, update the map accordingly.
      my.when("center", setCenter);
      my.when("zoom", my.map.setZoom, my.map);

      my.when("box", function (box) {

        // Move to chiasm-layout?
        d3.select(my.el)
          .style("width",  "900px")
          .style("height", box.height + "px");

        // Tell Leaflet that the size has changed so it updates.
        my.map.invalidateSize();
      });


  d3.json("/static/data/file_locations.json", function(error, data) {
	 files=data;
	 for (var i in files)
        $('#countryList').append($("<option>").attr('value',files[i].file_name).text(files[i].country_name));
     $("#countryList").multiselect();
  });


$("#countryList").on('change',function(){
      if(layers){
        for(var i=0;i<layers.length;i++){
            layers[i].clearLayers();
        }
      }
      layers=[];

      zoomLevel=2;
      my.map.setZoom(zoomLevel);
      var countries=$(this).val();
      if(!countries)
        return;
      for (var val=0;val<countries.length;val++){
          d3.json('/static/data/'+countries[val],function(error, data,val) {

                layers.push(L.geoJson(data, {
                      onEachFeature: labelFeature
                  }).addTo(my.map));

                layers[layers.length-1].setStyle({weight:1,opacity:(zoomLevel)/18});

              });
      }

});

$("#uploadedList").on('change',function(){
      $(".nearest").hide();

      if(features){
       features.clearLayers();
      }
       $(".loader").show();
      d3.json('/static/upload/'+$(this).val(),function(error, data,val) {
        	  featuresInformation = L.geoJson(data, {
        		    onEachFeature: eventFeature
        		});
        		featuresInformation.setStyle(style);
        		try{
        		    var markers = L.markerClusterGroup();
                      features=markers.addLayer(featuresInformation);
                      my.map.addLayer(markers);
        		}
        		catch(err){
        		    features = featuresInformation.addTo(my.map);
        		}
        		features.setStyle(style);

        		 $(".loader").hide();

        		$(".nearest").show();


          });
});

    function label_click(e) {
	  //console.log(e.target._leaflet_id);
      $('#modalOpener').trigger('click')
	  //leaf_id.push(e.layer._leaflet_id);
	  //console.log(e);
	  selectedPolygon = e.target;
	}


    $("#done").on("click",function(){
        status= $("input[type='radio']:checked").val();
   // console.log(status);
        var i;
        selectedPolygon.setStyle({
              weight: 2,
              color: '#000000',
              fillColor: status
          });
        colorInfo.push({'color':selectedPolygon.options.fillColor,
                        'properties': selectedPolygon.feature.properties});
     })


     $('#saveGeoJSON').on('click',function(){

        $.ajax({
               url: "/export-geojson/"+selectedPolygon.feature.properties.ISO+"/"+selectedPolygon.feature.properties.NAME_1+"/"+selectedPolygon.feature.properties.NAME_2+"/"+selectedPolygon.feature.properties.NAME_3,
               type: "GET"
             }).done(function( data ) {
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
                var dlAnchorElem = document.getElementById('downloadAnchorElem');
                dlAnchorElem.setAttribute("href",     dataStr     );
                dlAnchorElem.setAttribute("download", "geojson.json");
                dlAnchorElem.click();
             });



     })


    function labelFeature(feature, layer) {
    //bind click
    //layer.bindPopup(layer.feature.properties.NAME_1);
//    var tooltip=layer.feature.properties["NAME_"+parseInt((zoomLevel/6)+1)];
//    if(!tooltip)
//        tooltip=layer.feature.properties.NAME_1;
//    layer.bindPopup(tooltip);

    console.log(layer.feature);
    layer.on('mouseover', function (e) {


        var tooltip=layer.feature.properties["NAME_"+parseInt((zoomLevel/6)+1)];
        if(!tooltip)
            tooltip=layer.feature.properties.NAME_1;
        d3.select(".tooltip")
                	  .style("left",  e.originalEvent.clientX + "px")
                	  .style("top", e.originalEvent.clientY + "px")
                	  .html(tooltip)
                	  .style('opacity',1);
                	  setTimeout(function(){ d3.select(".tooltip") .style('opacity',0); }, 2000);
//        this._popup.setContent(tooltip);
//        this.openPopup();
    });
    layer.on('mouseout', function (e) {
        d3.select(".tooltip").style('opacity',0);
    });

    layer.on({
        click: label_click
    });
}

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

	function eventFeature(feature, layer) {
	    //bind click
	    layer.on({
	        click: whenClicked
	    });
	}


  my.map.on("zoomend", function (e) {
	  zoomLevel=e.target['_animateToZoom'];
	  for (var i=0;i<layers.length;i++){
		  layers[i].setStyle({opacity: (zoomLevel)/18});
		  }
  });


 $("#showUploader").on('click',function(){
    $(".file-upload-holder").show();

 })

 $("#uploadFile").on("click",function(){
     console.log("submit event");
     var fd = new FormData($('form')[0]);
     $.ajax({
       url: "/upload-file",
       type: "POST",
       data: fd,
       processData: false,  // tell jQuery not to process the data
       contentType: false   // tell jQuery not to set contentType
     }).done(function( data ) {
         location.reload();
     });
     return false;
 })

$("#getNearest").on('click',function(){
    markers.clearLayers();
    $(".loader").show();
    $.getJSON('http://ipinfo.io', function(data){
         var lat=data.loc.split(",")[0];
         var lon=data.loc.split(",")[1];

         var nearest = leafletKnn(featuresInformation).nearest(L.latLng(lat, lon), 3);
         for (var i=0;i<nearest.length;i++){
           var marker=L.marker([nearest[i].lat, nearest[i].lon]).bindPopup("Nearest Point"+(i+1));
            markers.addLayer(marker);
         }
         console.log(nearest)
         my.map.addLayer(markers);

         $(".loader").hide();
        })
    })


    $("#hideNearest").on('click',function(){
        markers.clearLayers();

    })
$("#saveState").on('click',function(){
    $(".save-utility-holder").show();
});

$("#saveFile").on('click',function(){
    var countries=$("#countryList").val()
    var uploaded=$('#uploadedList').val();
    var files=[]
    for (var i=0;i<countries.length;i++){
       files.push('/static/data/'+$("#countryList").val());
    }
    for (var i=0;i<uploaded.length;i++){
           files.push('/static/upload/'+$('#uploadedList').val());
        }
    var params={'files':files,'colorInfo':colorInfo,'fileName':$('.save-file-utility').val()}
     $.ajax({
               url: "/save-state",
               type: "POST",
               data: JSON.stringify(params),
               processData: false,  // tell jQuery not to process the data
               contentType: 'application/json'   // tell jQuery not to set contentType
             }).done(function( data ) {
                 $(".save-utility-holder").hide();
                   location.reload();
             });

})

return my;


}