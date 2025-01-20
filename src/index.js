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
const articlesContainer = document.getElementById("articles");

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

const articleTemplate = `<div id="article-%HASH" class="page d-none"><div class="container">
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
    </div></div>`;

const generateArticles = (data) => {
    let dataKeys = Object.keys(data);

    let div = "";
    for (let i = 0; i < dataKeys.length; i++) {
        let currentArticleData = data[dataKeys[i]];
        div += articleTemplate.replace("%HASH", dataKeys[i].replaceAll(" ", "-")).replaceAll("%PLAYTITLE", dataKeys[i]).replace("%PLACE", currentArticleData.place.name).replace("%YEAROFPUB", currentArticleData.yearofpub).replace("%ERA", currentArticleData.era).replace("%RESUME", currentArticleData.resume).replace("%CHARACTERS", currentArticleData.characters).replace("%IMGLINK1", currentArticleData.images[0]).replace("%IMGLINK2", currentArticleData.images[1]).replace("%IMGLINK3", currentArticleData.images[2]);
    }
    articlesContainer.innerHTML = div;
}

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
    
    let remoteData;

    fetchComponent.getData("poi").then(data => {
        remoteData = data;

        const setNavbar = (inputData) => {
            const keys = Object.keys(inputData);

            const url = new URL(document.location.href);
            let nav;
            if(!url.hash || url.hash === "#home") nav = navbarEl[0];
            else if (keys.indexOf(url.hash.replace("#article-")) !== -1) nav = navbarEl[1];
            else if(url.hash === "#admin" && !loginComponent.isLogged()) nav = navbarEl[2];
            else if(url.hash === "#admin" && loginComponent.isLogged()) nav = navbarEl[3];
            else nav = navbarEl[0];
            navbar.build(nav);
            navbar.render();
        };

        generateArticles(remoteData);
        generateNavigator(pages);

        homeTable.build(["Play's title", "Place"], remoteData);
        homeTable.render();

        map.build([46.064811, 16.767506]);
        map.setData(remoteData);
        map.render();

        searchbar.build("Insert play's title or place");
        searchbar.render();

        loginComponent.build(cacheToken, "private");
        loginComponent.renderForm();
        setNavbar(remoteData);

        adminTable.build(["Play's title", "Manage"], remoteData);

        let focused;
        
        pubsub.subscribe("el-edited", playTitle => {
            focused = playTitle;
            adminForm.setInputsValue(playTitle, remoteData[playTitle]);
        });
        pubsub.subscribe("el-deleted", newData => {
            spinner.classList.remove("d-none");
            fetchComponent.setData("poi", newData).then(msg => {
                fetchComponent.getData("poi").then(data => {
                    remoteData = data;
                    pubsub.publish("get-remote-data",remoteData)
                    spinner.classList.add("d-none");
                });
            });
        });
        adminTable.render();

        pubsub.subscribe("form-submit", fullArticle => {
            geoencoder.encode(fullArticle.article.place.name).then(data => {
                fullArticle.article.place.coords = data.coords;
                if (!remoteData[fullArticle.title] && adminForm.getEdit()) delete remoteData[focused];
                else focused = undefined;
                remoteData[fullArticle.title] = fullArticle.article;
                modal.hide();
                adminForm.clear();
                
                spinner.classList.remove("d-none");
                fetchComponent.setData("poi", remoteData).then(msg => {
                    fetchComponent.getData("poi").then(data => {
                        remoteData = data;
                        pubsub.publish("get-remote-data",remoteData)
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

        pubsub.subscribe("get-remote-data", () => {
            generateArticles(remoteData);
            generateNavigator(pages);
        });

        spinner.classList.add("d-none");
        window.addEventListener("popstate", () => {
            setNavbar(remoteData);
        });
    });
});