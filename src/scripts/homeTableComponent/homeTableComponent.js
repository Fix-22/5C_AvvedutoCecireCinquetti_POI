export const generateHomeTable = (parentElement) => {
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

    return {
        build: (inputHeader, inputData, inputArticleContainer) => {
            header = inputHeader;
            data = inputData;
            articleContainer = inputArticleContainer;
        },
        render: () => {
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top"><tr>';
            
            header.forEach(e => {
                html += '<th class="table-secondary">' + e + "</th>";
            });
            html += "</tr></thead><tbody>";

            data.forEach(e => {
                html += '<tr><td><a href="#article" id="' + e.title + '" class="articleLink">' + e.title + ' <i class="bi bi-box-arrow-up-right"></i></a></td><td>' + e.place.name + '</td></tr>';
            });

            html += "</tbody></table>";
            parentElement.innerHTML = html;

            let articleLinks = document.querySelectorAll(".articleLink");

            for (let i = 0; i < articleLinks.length; i++) {
                let a = articleLinks[i];
                a.onclick = () => {
                    let currentArticleData = data[i];
                    articleContainer.innerHTML = articleTemplate.replaceAll("%PLAYTITLE", a.id).replace("%PLACE", currentArticleData.place.name).replace("%YEAROFPUB", currentArticleData.yearofpub).replace("%ERA", currentArticleData.era).replace("%RESUME", currentArticleData.resume).replace("%CHARACTERS", currentArticleData.characters).replace("%IMGLINK1", currentArticleData.images[0]).replace("%IMGLINK2", currentArticleData.images[1]).replace("%IMGLINK3", currentArticleData.images[2]);
                };
            }
        },
        search: (input) => { // cerca nei dati le righe che contengono l'input (che può essere il titolo o il luogo dell'opera)
            let searchResults = []
            
            data.forEach(e => {
                if (e.place.name.toLowerCase().includes(input.toLowerCase()) || e.title.toLowerCase().includes(input.toLowerCase())) {
                    searchResults.push(e)
                }
            });
            return searchResults;
        },
        renderFilter: (newData) => { // metodo che fa la render di specifici dati, senza salvarli
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top"><tr>';
            
            header.forEach(e => {
                html += '<th class="table-secondary">' + e + "</th>";
            });
            html += "</tr></thead><tbody>";

            newData.forEach(e => {
                html += '<tr><td><a href="#article" id="' + e.title + '" class="articleLink">' + e.title + ' <i class="bi bi-box-arrow-up-right"></i></a></td><td>' + e.place.name + '</td></tr>';
            });

            html += "</tbody></table>";
            parentElement.innerHTML = html;
        },
        setData: (inputData) => {
            data = inputData;
        },
        getData: () => {
            return data;
        }
    }
};