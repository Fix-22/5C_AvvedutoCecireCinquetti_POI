export const generateMap = (parentElement) => {
    let map;
    let data = [];
    let zoom;
    let markers;
    
    return {
        build: (startCoords) => {
            zoom = 5;
            map = L.map(parentElement).setView(startCoords, zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            markers = L.layerGroup().addTo(map);
        },
        render: () => {
            let dataKeys = Object.keys(data);
            markers.clearLayers();

            dataKeys.forEach(e => {
                const marker = L.marker(data[e].place.coords).addTo(markers);
                marker.bindPopup("<b>" + data[e].place.name + "</b><br><b>Play:</b> " + e);
            });
        },
        addPlay: (title, inputData) => {
            if (!data[title]) {
                data[title] = inputData;
            }
        },
        getData: () => {
            return data;
        },
        setData: (inputData) => {
            data = inputData;
        },
        zoomToPlace: (coords, zoom) => {
            map.flyTo(coords, zoom);
        }
    };
};