export const generateMap = function (parentElement,pubsub) {
    let map;
    let data = [];
    let zoom;
    let markers;
    let startCoords;
    const dict={
        build: function(inputStartCoords) {
            startCoords = inputStartCoords;
            zoom = 5;
            map = L.map(parentElement).setView(startCoords, zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            markers = L.layerGroup().addTo(map);
            pubsub.subscribe("cancel",()=>{this.resetZoom()})
        },
        render: function() {
            let dataKeys = Object.keys(data);
            markers.clearLayers();

            dataKeys.forEach(e => {
                const marker = L.marker(data[e].place.coords).addTo(markers);
                marker.bindPopup("<b>" + data[e].place.name + "</b><br><b>Play:</b> " + e);
            });
        },
        addPlay: function(title, inputData) {
            if (!data[title]) {
                data[title] = inputData;
            }
        },
        getData: function() {
            return data;
        },
        setData: function(inputData) {
            data = inputData;
        },
        zoomToPlace: function(coords, zoom) {
            map.flyTo(coords, zoom);
        },
        resetZoom: function() {
            map.setView(startCoords, zoom);
        }
    };
    return dict
};