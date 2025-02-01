window.addEventListener('DOMContentLoaded', function() {


    var map = L.map('map').setView([42.358870052172854, -71.05741872024754], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Define styles for different layer groups
    const styles = {
        "Ikon": { color: "blue", weight: 2 },
        "Indy": { color: "red", weight: 2 },
        "Epic": { color: "green", weight: 2 }
    };

    // Layer groups
    const layerGroups = {
        "Ikon": L.layerGroup().addTo(map),
        "Indy": L.layerGroup().addTo(map),
        "Epic": L.layerGroup().addTo(map)
    };
    const layerControl = L.control.layers(null, layerGroups).addTo(map);

    // Load GeoJSON data
    const geojsonUrl = "AllResorts.geojson"; 

    fetch(geojsonUrl)
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, {
                    pointToLayer: (feature, latlng) => {
                        // Style points as circle markers
                        const group = feature.properties.passaffiliation;
                        const style = styles[group] || { color: "gray", radius: 8, fillOpacity: 0.6 };
                        return L.circleMarker(latlng, style);
                    },
                    onEachFeature: (feature, layer) => {
                        const group = feature.properties.passaffiliation; 
                        if (layerGroups[group]) {
                            layer.addTo(layerGroups[group]);
                        }

                        // Add a pop-up for each feature
                        if (feature.properties && feature.properties.passaffiliation) {
                            layer.bindPopup(() => {
                                let popupContent = `<b>${feature.properties.name}</b><br>`;
                            
                                // Add website link if it exists
                                if (feature.properties.websiteurl) {
                                    popupContent += `<a href="${feature.properties.websiteurl}" target="_blank">Ski Resort Website</a><br>`;
                                }
                            
                                // Add trail map link if it exists
                                if (feature.properties.trailmapurl) {
                                    popupContent += `<a href="${feature.properties.trailmapurl}" target="_blank">Trail Map</a>`;
                                }
                            
                                return popupContent;
                            });
                            
                        }
                    }
                }).addTo(map);

            
            })
            .catch(error => console.error("Error loading GeoJSON:", error));

            // Add a legend to the map
        const legend = L.control({ position: "bottomright" });

        legend.onAdd = function () {
            const div = L.DomUtil.create("div", "legend");
            div.innerHTML += `<h4>Legend</h4>`;
            div.innerHTML += `<i style="background: blue"></i> Ikon <br>`;
            div.innerHTML += `<i style="background: red"></i> Indy<br>`;
            div.innerHTML += `<i style="background: green"></i> Epic<br>`;
            div.innerHTML += `<i style="background: gray"></i> Unaffilated<br>`;
            return div;
        };

        legend.addTo(map);


 

    

});
