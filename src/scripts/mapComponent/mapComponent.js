export const generateMap = function (parentElement,pubsub) {
    let map;
    let data = [];
    let zoom;
    let markers;
    let startCoords;
    
    const mapObject = {
        build: function(inputStartCoords) {
            startCoords = inputStartCoords;
            zoom = 4;
            map = L.map(parentElement).setView(startCoords, zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            markers = L.layerGroup().addTo(map);

            pubsub.subscribe("cancel",()=>{this.resetZoom()})
            pubsub.subscribe("zoomToPlace",(dat)=>{
                let filterDataKeys = Object.keys(dat);
                this.zoomToPlace(dat[filterDataKeys[0]].place.coords, 12);
            })
            pubsub.subscribe("get-remote-data",(remoteData)=>{
                this.setData(remoteData);
                this.render();
            })
            pubsub.subscribe("row-clicked",(coords) => {
                this.zoomToPlace(coords, 15);
            });
        },
        render: function() {
            let dataKeys = Object.keys(data);
            markers.clearLayers();

            dataKeys.forEach(e => {
                const marker = L.marker(data[e].place.coords).addTo(markers);
                marker.bindPopup("<b>" + data[e].place.name + "</b><br><b>Play:</b> " + e);
            });
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
    return mapObject;
};