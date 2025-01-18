import {generateNavigator} from "./scripts/navigatorComponent/navigatorComponent.js";
import {generateFetchComponent} from "./scripts/fetchComponent/fetchComponent.js";
import {generateGeoencoder} from "./scripts/geoencoderComponent/geoencoderComponent.js";
import {generateMap} from "./scripts/mapComponent/mapComponent.js";
import {generateHomeTable} from "./scripts/homeTableComponent/homeTableComponent.js";
import {generateSearchbar} from "./scripts/searchBarComponent/searchBarComponent.js";
import {generateLoginComponent} from "./scripts/loginComponent/loginComponent.js";
import {generateAdminTable} from "./scripts/adminTableComponent/adminTableComponent.js";
import {generateNavBarComponent} from "./scripts/navbarComponent/navbarComponent.js";
import {generateForm} from "./scripts/formComponent/formComponent.js";
import {generatePubSub} from "./scripts/pubSubComponent/pubSubComponent.js";

const spinner = document.getElementById("spinner");
const pages = document.getElementById("pages");
const mapContainer = document.getElementById("mapContainer");
const homeTableContainer = document.getElementById("home-tab");
const searchbarContainer = document.getElementById("searchbarContainer");
const loginContainer = document.getElementById("loginContainer");
const adminTableContainer = document.getElementById("adm-tab");
const modalBody = document.getElementById("modalBody");
const articleContainer = document.getElementById("article");

generateNavigator(pages);
const pubsub = generatePubSub();
const fetchComponent = generateFetchComponent();
const geoencoder = generateGeoencoder();
const map = generateMap(mapContainer,pubsub);
const homeTable = generateHomeTable(homeTableContainer,pubsub);
const searchbar = generateSearchbar(searchbarContainer,pubsub);
const loginComponent = generateLoginComponent(loginContainer,pubsub);
const adminTable = generateAdminTable(adminTableContainer,pubsub);
const navbar = generateNavBarComponent(document.querySelector(".navbarContainer"),pubsub);
const adminForm = generateForm(modalBody,pubsub);

fetch("./conf.json").then(r => r.json()).then(data => {
    const navbarEl = [
        [
            '<button type="button" class="btn btn-light" id="searchButton"><i class="bi bi-search"></i> Search</button>',
            '<a href="#home"><img src="/src/assets/logo.png" class="logo navbar-brand"></a>',
            '<a href="#admin"><button type="button" class="btn btn-dark"><i class="bi bi-gear"></i> Administration</button></a>'
        ],
        [
            '<a href="#home"><img src="/src/assets/home.png" alt="home"></a>',
            '<a href="#home"><img src="/src/assets/logo.png" class="logo navbar-brand"></a>',
            '<a href="#admin"><button type="button" class="btn btn-dark"><i class="bi bi-gear"></i> Administration</button></a>'
        ],
        [
            '<a href="#home"><img src="/src/assets/home.png" alt="home"></a>',
            '<a href="#home"><img src="/src/assets/logo.png" class="logo navbar-brand"></a>',
        ],
        [
            '<a href="#home"><img src="/src/assets/home.png" alt="home"></a>',
            '<a href="#home"><img src="/src/assets/logo.png" class="logo navbar-brand"></a>',
            '<button type="button" class="btn btn-dark" id="addArticleButton" data-bs-toggle="modal" data-bs-target="#modalForm"><i class="bi bi-file-earmark-plus"></i> Add an article</button>'
        ]
    ];

    const modal = new bootstrap.Modal(document.getElementById("modalForm")); // per gestire modal via js

    let cacheToken = data["cacheToken"];
    let mapsToken = data["mapsToken"];

    fetchComponent.build(cacheToken);
    geoencoder.build(mapsToken);

    navbar.build([
        '<button type="button" class="btn btn-light" id="searchButton"><i class="bi bi-search"></i> Search</button>',
        '<img src="/src/assets/logo.png" class="logo navbar-brand">',
        '<a href="#admin"><button type="button" class="btn btn-dark"><i class="bi bi-gear"></i> Administration</button></a>'
    ]);
    navbar.render();

    let remoteData;

    fetchComponent.getData("poi").then(data => {
        remoteData = data;

        homeTable.build(["Play's title", "Place"], remoteData, articleContainer);
        homeTable.render();

        map.build([41.896705, 12.482183]);
        map.setData(remoteData);
        map.render();

        searchbar.build("Insert play's title or place");

        searchbar.render();

        loginComponent.build(cacheToken, "private");

        loginComponent.renderForm();
        let focused;
        adminTable.build(["Play's title", "Manage"], remoteData);
        adminTable.onelementedit(playTitle => {
            focused = playTitle;
            adminForm.setInputsValue(playTitle, remoteData[playTitle]);
        });
        adminTable.onelementdelete(newData => {
            spinner.classList.remove("d-none");
            fetchComponent.setData("poi", newData).then(msg => {
                fetchComponent.getData("poi").then(data => {
                    remoteData = data;
                    pubsub.publish("el-deleted",remoteData)
                    spinner.classList.add("d-none");
                });
            });
        });
        adminTable.render();

        adminForm.onsubmit((title, article) => {
            geoencoder.encode(article.place.name).then(data => {
                article.place.coords = data.coords;
                if (!remoteData[title]) delete remoteData[focused];
                remoteData[title] = article;
                modal.hide();
                adminForm.clear();
                
                spinner.classList.remove("d-none");
                fetchComponent.setData("poi", remoteData).then(msg => {
                    fetchComponent.getData("poi").then(data => {
                        remoteData = data;
                        homeTable.setData(remoteData);
                        homeTable.render();
                        map.setData(remoteData);
                        map.render();
                        adminTable.setData(remoteData);
                        adminTable.render();
                        spinner.classList.add("d-none");
                    });
                });
            })
            .catch(err => {
                console.log(err)
                adminForm.setError("Invalid location")
            });
        });
        adminForm.render();

        spinner.classList.add("d-none");
        window.addEventListener("popstate", () => {
            const url = new URL(document.location.href);
            let nav;
            if(!url.hash || url.hash === "#home") nav = navbarEl[0];
            else if (url.hash === "#article") nav = navbarEl[1];
            else if(url.hash === "#admin" && !loginComponent.isLogged()) nav = navbarEl[2];
            else if(url.hash === "#admin" && loginComponent.isLogged()) nav = navbarEl[3];
            navbar.build(nav);
            navbar.render();
        });
    });
});