import {generateNavigator} from "./scripts/navigatorComponent/navigatorComponent.js";
import {generateFetchComponent} from "./scripts/fetchComponent/fetchComponent.js";
import {generateGeoencoder} from "./scripts/geoencoderComponent/geoencoderComponent.js";
import {generateMap} from "./scripts/mapComponent/mapComponent.js";
import {generateAdminTable} from "./scripts/adminTableComponent/adminTableComponent.js";

const modalBody = document.getElementById("modalBody");
const searchbarContainer = document.getElementById("searchbarContainer");
const loginContainer = document.getElementById("loginContainer");

const spinner = document.getElementById("spinner");
const playsTableHomeBody = document.getElementById("playsTableHomeBody");
const pages = document.getElementById("pages");
const mapContainer = document.getElementById("mapContainer");
const adminTableContainer = document.getElementById("adm-tab");
const articleContainer = document.getElementById("article");

generateNavigator(pages);
const fetchComponent = generateFetchComponent();
const geoencoder = generateGeoencoder();
const map = generateMap(mapContainer);
const adminTable = generateAdminTable(adminTableContainer);

const playsTableRowHomeTemplate = '<tr><td><a href="#article" id="%PLAYTITLE" class="articleLink">%PLAYTITLE <i class="bi bi-box-arrow-up-right"></i></a></td><td>%PLACE</td></tr>';
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

fetch("./conf.json")
.then(r => r.json())    
.then(data => {
    let cacheToken = data["cacheToken"];
    let mapsToken = data["mapsToken"];

    fetchComponent.build(cacheToken);
    geoencoder.build(mapsToken);
    map.build([41.896705, 12.482183]);

    let remoteData;

    fetchComponent.getData("poi").then(data => {
        remoteData = data;

        let newHomeHTML = "";

        adminTable.build(["Play's title", "Manage"], remoteData);
        adminTable.onelementedit(playTitle => {
            // CODICE PER AGGIUNGERE TESTO AL FORM
        });
        adminTable.onelementdelete(newData => {
            spinner.classList.remove("d-none");
            fetchComponent.setData("poi", newData).then(msg => {
                fetchComponent.getData("poi").then(data => {
                    remoteData = data;
                    adminTable.setData(remoteData);
                    adminTable.render();
                    spinner.classList.add("d-none");
                });
            });
        });
        adminTable.render();

        remoteData.forEach(e => {
            newHomeHTML += playsTableRowHomeTemplate.replaceAll("%PLAYTITLE", e.title).replace("%PLACE", e.place.name);
        });
        playsTableHomeBody.innerHTML = newHomeHTML;

        map.setPlaces(remoteData);
        map.render();

        let articleLinks = document.querySelectorAll(".articleLink");

        for (let i = 0; i < articleLinks.length; i++) {
            let a = articleLinks[i];
            a.onclick = () => {
                let currentArticleData = remoteData[i];
                articleContainer.innerHTML = articleTemplate.replaceAll("%PLAYTITLE", a.id).replace("%PLACE", currentArticleData.place.name).replace("%YEAROFPUB", currentArticleData.yearofpub).replace("%ERA", currentArticleData.era).replace("%RESUME", currentArticleData.resume).replace("%CHARACTERS", currentArticleData.characters).replace("%IMGLINK1", currentArticleData.images[0]).replace("%IMGLINK2", currentArticleData.images[1]).replace("%IMGLINK3", currentArticleData.images[2]);
            };
        }

        spinner.classList.add("d-none");
    });
});