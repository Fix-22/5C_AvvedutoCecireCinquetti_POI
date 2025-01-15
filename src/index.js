import {generateNavigator} from "./scripts/navigatorComponent/navigatorComponent.js";
import {generateFetchComponent} from "./scripts/fetchComponent/fetchComponent.js";
import {generateGeoencoder} from "./scripts/geoencoderComponent/geoencoderComponent.js";
import {generateMap} from "./scripts/mapComponent/mapComponent.js";
import {generateHomeTable} from "./scripts/homeTableComponent/homeTableComponent.js";
import {generateSearchbar} from "./scripts/searchBarComponent/searchBarComponent.js";
import {generateAdminTable} from "./scripts/adminTableComponent/adminTableComponent.js";

const modalBody = document.getElementById("modalBody");
const loginContainer = document.getElementById("loginContainer");

const spinner = document.getElementById("spinner");
const pages = document.getElementById("pages");
const mapContainer = document.getElementById("mapContainer");
const homeTableContainer = document.getElementById("home-tab");
const searchbarContainer = document.getElementById("searchbarContainer");
const adminTableContainer = document.getElementById("adm-tab");
const articleContainer = document.getElementById("article");

generateNavigator(pages);
const fetchComponent = generateFetchComponent();
const geoencoder = generateGeoencoder();
const map = generateMap(mapContainer);
const homeTable = generateHomeTable(homeTableContainer);
const searchbar = generateSearchbar(searchbarContainer);
const adminTable = generateAdminTable(adminTableContainer);

fetch("./conf.json")
.then(r => r.json())    
.then(data => {
    let cacheToken = data["cacheToken"];
    let mapsToken = data["mapsToken"];

    fetchComponent.build(cacheToken);
    geoencoder.build(mapsToken);

    let remoteData;

    fetchComponent.getData("poi").then(data => {
        remoteData = data;

        homeTable.build(["Play's title", "Place"], remoteData, articleContainer);
        homeTable.render();

        map.build([41.896705, 12.482183]);
        map.setPlaces(remoteData);
        map.render();

        searchbar.build("Insert play's title or place");
        searchbar.onsearch(data => console.log(data))
        searchbar.oncancel(console.log("aiut"))
        searchbar.render();

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

        spinner.classList.add("d-none");
    });
});