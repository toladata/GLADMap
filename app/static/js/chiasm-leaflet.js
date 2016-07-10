// This is an example Chaism plugin that uses Leaflet.js.
function ChiasmLeaflet() {

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

  // Instantiate the Leaflet map, see docs at
  // http://leafletjs.com/reference.html#map-constructor


  // Add the black & white style map layer.
  // Found by browsing http://leaflet-extras.github.io/leaflet-providers/preview/
  // TODO move this to configuration.
  L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png").addTo(my.map);

  // Also try this http://{s}.tiles.earthatlas.info/natural-earth/{z}/{x}/{y}.png

  // Returns the current Leaflet map center
  // in a format that D3 understands: [longitude, latitude]
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
      .style("width", box.width + "px")
      .style("height", box.height + "px");

    // Tell Leaflet that the size has changed so it updates.
    my.map.invalidateSize();
  });

  return my;
}
