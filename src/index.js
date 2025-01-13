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

const navigator = generateNavigator(pages);
const fetchComponent = generateFetchComponent();
const geoencoder = generateGeoencoder();

const playsTableRowHomeTemplate = '<tr><td><a href="#article" id="%PLAYTITLE">%PLAYTITLE <i class="bi bi-box-arrow-up-right"></i></a></td><td>%PLACE</td></tr>';
const articleTemplate = '';

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
    });
});