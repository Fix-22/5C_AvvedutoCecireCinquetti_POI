export const generateMap = (parentElement) => {
    let map;
    let data = [];
    let zoom = 5;
    
    return {
        build: (startCoords) => {
            map = L.map(parentElement).setView(startCoords, zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        },
        render: () => {
            let dataKeys = Object.keys(data);

            dataKeys.forEach(e => {
                const marker = L.marker(data[e].place.coords).addTo(map);
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