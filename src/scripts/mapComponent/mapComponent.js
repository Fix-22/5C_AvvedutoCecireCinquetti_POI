export const generateMap = (parentElement) => {
    let map;
    let places = [];
    let zoom = 20;
    return {
        build: (startCoords) => {
            map = L.map(parentElement).setView(startCoords, zoom);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        },
        render: () => {
            places.forEach((place) => {
                if (place) {
                    const marker = L.marker(place.coords).addTo(map);
                    marker.bindPopup("<b>" + place.place + "</b><br><b>Play:</b> " + place.play);
                }
            });
        },
        addPlace: (place) => {
            if (places.indexOf(place) === -1) {
                places.push(place);
            }
        },
        getPlaces: () => {
            return places;
        },
        setPlaces: (inputPlaces) => {
            places = inputPlaces;
        },
        zoomToPlace: (coords,zoom) => {
            map.flyTo(coords, zoom);
        }
    };
};