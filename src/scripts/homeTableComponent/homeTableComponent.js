export const generateHomeTable = function(parentElement,pubsub)  {
    let header = [];
    let data = [];
    let articleContainer;

    const articleTemplate = `<div class="container">
        <div class="row d-flex justify-content-center">
            <div class="long-line"></div>
        </div>
        <div class="row">
            <p class="topic" id="title">%PLAYTITLE | POI - Shakespeare's Places</p>
        </div>
        <h1>%PLAYTITLE</h1>
        <div class="row">
            <h6 class="topic">Location: %PLACE</h6>
            <h6 class="topic">Year of pubblication: %YEAROFPUB</h6>
            <h6 class="topic">Era: %ERA</h6>
        </div>
        <div class="short-line"></div>
        <div class="article-content">
            <div class="row main-img-container">
                <img src="%IMGLINK1" alt="image A">
            </div>
            <div class="row">
                <h2>Resume</h2>
                <p>%RESUME</p>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <img class="vert-img" src="%IMGLINK2" alt="image B">
                </div>
                <div class="col d-flex justify-content-center">
                    <img class="vert-img" src="%IMGLINK3" alt="image C">
                </div>
            </div>
            <div class="row">
                <h2>Main characters</h2>
                <p>%CHARACTERS</p>
            </div>
        </div>
    </div>`;
    const dict ={
        
        build: function(inputHeader, inputData, inputArticleContainer) {
            header = inputHeader;
            data = inputData;
            articleContainer = inputArticleContainer;
            pubsub.subscribe("el-deleted",(remoteData)=>{
                this.setData(remoteData)
                this.render()
            })
            pubsub.subscribe("cancel",()=>{this.render()})
            pubsub.subscribe("search",(input)=>{
                console.log(input)
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
                html += '<tr><td><a href="#article" id="' + e + '" class="articleLink">' + e + ' <i class="bi bi-box-arrow-up-right"></i></a></td><td>' + data[e].place.name + '</td></tr>';
            });

            html += "</tbody></table>";
            parentElement.innerHTML = html;

            let articleLinks = document.querySelectorAll(".articleLink");

            for (let i = 0; i < articleLinks.length; i++) {
                let a = articleLinks[i];
                
                a.onclick = () => {
                    let currentArticleData = data[dataKeys[i]];
                    articleContainer.innerHTML = articleTemplate.replaceAll("%PLAYTITLE", a.id).replace("%PLACE", currentArticleData.place.name).replace("%YEAROFPUB", currentArticleData.yearofpub).replace("%ERA", currentArticleData.era).replace("%RESUME", currentArticleData.resume).replace("%CHARACTERS", currentArticleData.characters).replace("%IMGLINK1", currentArticleData.images[0]).replace("%IMGLINK2", currentArticleData.images[1]).replace("%IMGLINK3", currentArticleData.images[2]);
                };
            }
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
                html += '<tr><td><a href="#article" id="' + e + '" class="articleLink">' + e + ' <i class="bi bi-box-arrow-up-right"></i></a></td><td>' + data[e].place.name + '</td></tr>';
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
    return dict
};