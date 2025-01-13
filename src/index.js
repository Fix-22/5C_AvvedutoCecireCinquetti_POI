import {generateNavigator} from "./scripts/navigatorComponent/navigatorComponent.js";
import {generateFetchComponent} from "./scripts/fetchComponent/fetchComponent.js";
import {generateGeoencoder} from "./scripts/geoencoderComponent/geoencoderComponent.js";

const modalBody = document.getElementById("modalBody");
const tableContainer = document.getElementById("tableContainer");
const spinner = document.getElementById("spinner");
const searchbarContainer = document.getElementById("searchbarContainer");
const mapContainer = document.getElementById("map");
const loginContainer = document.getElementById("loginContainer");

const playsTableHomeBody = document.getElementById("playsTableHomeBody");
const pages = document.getElementById("pages");
const articleContainer = document.getElementById("article");

generateNavigator(pages);
const fetchComponent = generateFetchComponent();
const geoencoder = generateGeoencoder();

const playsTableRowHomeTemplate = '<tr><td><a href="#article" id="%PLAYTITLE" class="articleLink">%PLAYTITLE <i class="bi bi-box-arrow-up-right"></i></a></td><td>%PLACE</td></tr>';
const articleTemplate = `<div class="container">
        <div class="row d-flex justify-content-center">
            <div class="long-line"></div>
        </div>
        <div class="row">
            <p class="topic">%PLAYTITLE | POI - Shakespeare's Places</p>
        </div>
        <h1>%PLAYTITLE</h1>
        <div class="row">
            <h6>Location: %PLACE</h6>
            <h6>Year of pubblication: %YEAROFPUB</h6>
            <h6>Era: %ERA</h6>
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

    let remoteData = {};

    fetchComponent.getData("poi").then(data => {
        remoteData = data;
        let newHTML = "";

        let keys = Object.keys(remoteData);
        let values = Object.values(remoteData);

        for (let i = 0; i < keys.length; i++) {
            newHTML += playsTableRowHomeTemplate.replaceAll("%PLAYTITLE", keys[i]).replace("%PLACE", values[i].place);
        }
        playsTableHomeBody.innerHTML = newHTML;

        document.querySelectorAll(".articleLink").forEach(a => {
            a.onclick = () => {
                let currentArticleData = remoteData[a.id];
                // FIXME
                articleContainer.innerHTML = articleTemplate.replaceAll("%PLAYTITLE", a.id).replace("%PLACE", currentArticleData.place).replace("%YEAROFPUB", currentArticleData.yearofpub).replace("%ERA", currentArticleData.era)
            };
        })
    });
});