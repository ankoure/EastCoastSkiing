window.addEventListener('DOMContentLoaded', function() {


    var map = L.map('map').setView([42.358870052172854, -71.05741872024754], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    fetch('ikonpassmountains.json')
    .then(response => response.json())
    .then(data => {
    // Do something with the JSON data
    console.log(data);
    data.forEach(element => {
        var marker = L.marker([element["latitude"], element["longitude"]]).addTo(map);
        marker.bindPopup("<b>"+element["name"]+"</b><br><a href="+element["trailmapurl"]+">Trail Map URL</a>")
        
        
    });
    
    })
    .catch(error => {
    // Handle errors
    console.error('Error:', error);
    });


    //L.geoJSON(geojsonFeature).addTo(map);

});
