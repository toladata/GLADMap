$(function(){

    $.ajax({
       url: "/get-uploaded-data",
       type: "GET"
     }).done(function( data ) {
        var files=JSON.parse(data).files;
        for(var i in files){
             $('#uploadedList').append($("<option>").attr('value',files[i]).text(files[i]));
        }
     });

  var files,layers=[],features,featuresInformation,zoomLevel;
  var leaf_id =[];
  var selectedPolygon;

  // initialize the map
  var map = L.map('mapid').setView([36.99404, 39.75621], 2);
  var markers = new L.FeatureGroup();
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
      map.setZoom(zoomLevel);
      var countries=$(this).val();
      if(!countries)
        return;
      for (var val=0;val<countries.length;val++){
          d3.json('/static/data/'+countries[val],function(error, data,val) {

                layers.push(L.geoJson(data, {
                      onEachFeature: labelFeature
                  }).addTo(map));

                layers[layers.length-1].setStyle({weight:2,opacity:(zoomLevel)/18});

              });
      }

});

$("#uploadedList").on('change',function(){
      $("#getNearest").hide();

      if(features){
       features.clearLayers();
      }
       $(".loader").show();
      d3.json('/static/upload/'+$(this).val(),function(error, data,val) {
        	  featuresInformation = L.geoJson(data, {
        		    onEachFeature: eventFeature
        		});
        		try{
        		    var markers = L.markerClusterGroup();
                      features=markers.addLayer(featuresInformation);
                      map.addLayer(markers);
        		}
        		catch(err){
        		    features = featuresInformation.addTo(map);
        		}

        		 $(".loader").hide();

        		$("#getNearest").show();


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
     })


    function labelFeature(feature, layer) {
    //bind click
    //layer.bindPopup(layer.feature.properties.NAME_1);
    layer.bindPopup(layer.feature.properties.NAME_1);
    console.log(layer.feature);
    layer.on('mouseover', function (e) {
        $(this).openPopup();
    });
    layer.on('mouseout', function (e) {
        $(this).closePopup();
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


  map.on("zoomend", function (e) {
	  var zoomLevel=e.target['_animateToZoom'];
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
           var marker=L.marker([nearest[i].lat, nearest[i].lon]).bindPopup("Here");
            markers.addLayer(marker);
         }
         console.log(nearest)
         map.addLayer(markers);

         $(".loader").hide();
})


})

});