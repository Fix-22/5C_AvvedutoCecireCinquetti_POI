export const generateGeoencoder = () => {
    let data;
    let token;
    const URL = "https://us1.locationiq.com/v1/search?key=%TOKEN&q=%NAME&format=json&";
    return {
        build: (key) => {
            data = {}
            token = key;
        },
        encode: (name) => {
            return new Promise((resolve, reject) => {
                fetch(URL.replace("%NAME", name).replace("%TOKEN", token))
                .then((r) => r.json())
                .then((json) => {
                    if (!json.hasOwnProperty("error")) {
                        data.name = json[0].display_name;
                        data.coords = [json[0].lat, json[0].lon];
                        resolve(data)
                    } else {
                        reject(json.error);
                    }
                })
                .catch(err => reject(err));
            })
        }

    }
};