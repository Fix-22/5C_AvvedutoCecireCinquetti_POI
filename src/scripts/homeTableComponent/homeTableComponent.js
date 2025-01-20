export const generateHomeTable = function(parentElement,pubsub)  {
    let header = [];
    let data = [];
    
    
    const tableObject = {
        build: function(inputHeader, inputData) {
            header = inputHeader;
            data = inputData;
            pubsub.subscribe("get-remote-data",(remoteData)=>{
                this.setData(remoteData)
                this.render()
            })
            pubsub.subscribe("cancel",()=>{this.render()})
            pubsub.subscribe("search",(input)=>{
                let filterData = this.search(input);
                let filterDataKeys = Object.keys(filterData);
                this.renderFilter(filterData);
                if (filterDataKeys.length === 1) {
                    pubsub.publish("zoomToPlace",filterData);
                }
            })
        },
        render: function() {
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top"><tr>';
            
            header.forEach(e => {
                html += '<th class="table-secondary">' + e + "</th>";
            });
            html += "</tr></thead><tbody>";

            let dataKeys = Object.keys(data);

            dataKeys.forEach(e => {
                html += '<tr class="table-row"><td><a href="#article-' + e.replaceAll(" ", "-") + '" id="' + e + '" class="articleLink">' + e + ' <i class="bi bi-box-arrow-up-right"></i></a></td><td>' + data[e].place.name + '</td></tr>';
            });

            html += "</tbody></table>";
            parentElement.innerHTML = html;

            document.querySelectorAll(".table-row").forEach((e) => {
                e.addEventListener("click", () => {
                    const title = e.querySelector("td > a").id;
                    pubsub.publish("row-clicked", data[title].place.coords);
                });
            });
        },
        search: function(input) { // cerca nei dati le righe che contengono l'input (che può essere il titolo o il luogo dell'opera)
            let searchResults = {};
            
            let dataKeys = Object.keys(data);

            dataKeys.forEach(e => {
                if (data[e].place.name.toLowerCase().includes(input.toLowerCase()) || e.toLowerCase().includes(input.toLowerCase())) {
                    searchResults[e] = data[e];
                }
            });
            return searchResults;
        },
        renderFilter: function(newData) { // metodo che fa la render di specifici dati, senza salvarli
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top"><tr>';
            
            header.forEach(e => {
                html += '<th class="table-secondary">' + e + "</th>";
            });
            html += "</tr></thead><tbody>";

            let dataKeys = Object.keys(newData);

            dataKeys.forEach(e => {
                html += '<tr><td><a href="#article-' + e.replaceAll(" ", "-") + '"id="' + e + '" class="articleLink">' + e + ' <i class="bi bi-box-arrow-up-right"></i></a></td><td>' + data[e].place.name + '</td></tr>';
            });

            html += "</tbody></table>";
            parentElement.innerHTML = html;
        },
        setData: function (inputData) {
            data = inputData;
        },
        getData: function () {
            return data;
        }
    }
    return tableObject;
};