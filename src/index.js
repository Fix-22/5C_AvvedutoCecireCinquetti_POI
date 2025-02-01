import { generateNavigator } from "./scripts/navigatorComponent/navigatorComponent.js";
import { generateFetchComponent } from "./scripts/fetchComponent/fetchComponent.js";
import { generateGeoencoder } from "./scripts/geoencoderComponent/geoencoderComponent.js";
import { generateMap } from "./scripts/mapComponent/mapComponent.js";
import { generateHomeTable } from "./scripts/homeTableComponent/homeTableComponent.js";
import { generateSearchbar } from "./scripts/searchBarComponent/searchBarComponent.js";
import { generateLoginComponent } from "./scripts/loginComponent/loginComponent.js";
import { generateAdminTable } from "./scripts/adminTableComponent/adminTableComponent.js";
import { generateNavBarComponent } from "./scripts/navbarComponent/navbarComponent.js";
import { generateForm } from "./scripts/formComponent/formComponent.js";
import { generatePubSub } from "./scripts/pubSubComponent/pubSubComponent.js";

const spinner = document.getElementById("spinner");
const pages = document.getElementById("pages");
const mapContainer = document.getElementById("mapContainer");
const homeTableContainer = document.getElementById("home-tab");
const searchbarContainer = document.getElementById("search-box");
const loginContainer = document.getElementById("loginContainer");
const adminTableContainer = document.getElementById("adm-tab");
const modalBody = document.getElementById("modalBody");
const articlesContainer = document.getElementById("articles");

const pubsub = generatePubSub();
const fetchComponent = generateFetchComponent();
const geoencoder = generateGeoencoder();
const map = generateMap(mapContainer, pubsub);
const homeTable = generateHomeTable(homeTableContainer, pubsub);
const searchbar = generateSearchbar(searchbarContainer, pubsub);
const loginComponent = generateLoginComponent(loginContainer, pubsub);
const adminTable = generateAdminTable(adminTableContainer, pubsub);
const navbar = generateNavBarComponent(
  document.querySelector(".navbarContainer"),
  pubsub
);
const adminForm = generateForm(modalBody, pubsub);

const articleTemplate = `
<div id="article-%HASH" class="page d-none">
     <div class="docs-wrapper">
	    <div id="docs-sidebar" class="docs-sidebar">
		    <nav id="docs-nav" class="docs-nav navbar">
			    <ul class="section-items list-unstyled nav flex-column pb-3">
				    <li class="nav-item section-title"><a class="nav-link scrollto active" href="#main"><span class="theme-icon-holder me-2"><i class="fa-solid fa-book"></i></span>%PLAYTITLE</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#mainImage">Main image</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#resume">Resume</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#otherImages">Other images</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#characters">Main characters</a></li>
			    </ul>
		    </nav><!--//docs-nav-->
	    </div>
	    <div class="docs-content">
		    <div class="container">
			    <article class="docs-article" id="main">
				    <header class="docs-header">
					    <h1 class="docs-heading">%PLAYTITLE</h1>
						<div class="callout-block callout-block-info">
                            <div class="content">
                                <p><strong><i class="fa-solid fa-location-dot"></i> Location:</strong> %PLACE</p>
								<p><strong><i class="fa-solid fa-calendar-days"></i> Year of pubblication:</strong> %YEAROFPUB</p>
								<p><strong><i class="fa-solid fa-hourglass"></i> Era:</strong> %ERA</p>
                            </div><!--//content-->
                        </div><!--//callout-block-->
				    </header>

					<section class="docs-section" id="mainImage">
						<div class="d-flex justify-content-center align-items-center">
							<a target="_blank" href="%IMGLINK1"><img class="figure-img img-fluid shadow rounded" src="%IMGLINK1" alt="Main image" title="Main image"/></a>
						</div>
					</section>

				    <section class="docs-section" id="resume">
						<h2 class="section-heading">Resume</h2>
						<p>%RESUME</p>
                       
					</section><!--//section-->
					
					<section class="docs-section" id="otherImages">
						<div class="row mb-3 align-items-center justify-content-center">
							<div class="col-md-6 mb-1">
								<a target="_blank" href="%IMGLINK2"><img class="figure-img img-fluid shadow rounded" src="%IMGLINK2" alt="Other image 1" title="Other image 1"/></a>
							</div>
							<div class="col-md-6 mb-1">
								<a target="_blank" href="%IMGLINK3"><img class="figure-img img-fluid shadow rounded" src="%IMGLINK3" alt="Other image 2" title="Other image 2"/></a>
							</div>
						</div>
					</section>
					
					<section class="docs-section" id="characters">
						<h2 class="section-heading">Main characters</h2>
						<p>%CHARACTERS</p>
					</section><!--//section-->
			    </article>
				

			    <section class="cta-section text-center py-5 theme-bg-dark position-relative">
					<div class="theme-bg-shapes-right"></div>
					<div class="theme-bg-shapes-left"></div>
					<div class="container text-center py-5">
						<small class="copyright" id="footerText"></small>
					</div>
				</section><!--//cta-section-->
		    </div> 
	    </div>
    </div>
</div>
`;

const generateArticles = (data) => {
  let dataKeys = Object.keys(data);

  let div = "";
  for (let i = 0; i < dataKeys.length; i++) {
    let currentArticleData = data[dataKeys[i]];
    div += articleTemplate
      .replace("%HASH", dataKeys[i].replaceAll(" ", "-"))
      .replaceAll("%PLAYTITLE", dataKeys[i])
      .replace("%PLACE", currentArticleData.place.name)
      .replace("%YEAROFPUB", currentArticleData.yearofpub)
      .replace("%ERA", currentArticleData.era)
      .replace("%RESUME", currentArticleData.resume)
      .replace("%CHARACTERS", currentArticleData.characters)
      .replaceAll("%IMGLINK1", currentArticleData.images[0])
      .replaceAll("%IMGLINK2", currentArticleData.images[1])
      .replaceAll("%IMGLINK3", currentArticleData.images[2]);
  }
  articlesContainer.innerHTML = div;
};

fetch("/src/conf.json")
  .then((r) => r.json())
  .then((data) => {
    const navbarEl = [
      [
        '<a href="#admin" class="btn btn-primary"><i class="fa-solid fa-gear"></i> Administration</a>',
      ],
      [
        '<a href="#admin" class="btn btn-primary"><i class="fa-solid fa-gear"></i>Administration</a>',
        '<a href="#home" class="btn btn-primary"><i class="fa-solid fa-house"></i>Home</a>',
        `<button id="docs-sidebar-toggler" class="docs-sidebar-toggler docs-sidebar-visible me-2 d-xl-none" type="button">
			<span></span>
			<span></span>
			<span></span>
		</button>`
      ],
      ['<a href="#home"><img src="/src/assets/home.png" alt="home"></a>'],
      [
        '<button type="button" class="btn btn-secondary me-1" data-bs-toggle="modal" data-bs-target="#modalForm"><i class="fa-solid fa-file-circle-plus"></i> Add an article</button>',
        '<a href="#home" class="btn btn-primary"><i class="fa-solid fa-house"></i> Home</a>',
      ],
    ];

    const modal = new bootstrap.Modal(document.getElementById("modalForm")); // per gestire modal via js

    let cacheToken = data["cacheToken"];
    let mapsToken = data["mapsToken"];

    fetchComponent.build(cacheToken);
    geoencoder.build(mapsToken);

    let remoteData;

    fetchComponent.getData("poi").then((data) => {
      remoteData = data;

      const setNavbar = (inputData) => {
        const keys = Object.keys(inputData);

        const url = new URL(document.location.href);
        let nav;
        if (!url.hash || url.hash === "#home") nav = navbarEl[0];
        else if (
          keys.indexOf(
            url.hash.replace("#article-", "").replaceAll("-", " ")
          ) !== -1
        )
          nav = navbarEl[1];
        else if (url.hash === "#admin" && !loginComponent.isLogged())
          nav = navbarEl[2];
        else if (url.hash === "#admin" && loginComponent.isLogged())
          nav = navbarEl[3];
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

      searchbar.render();

      loginComponent.build(cacheToken, "private");
      loginComponent.renderForm();
      setNavbar(remoteData);

      adminTable.build(["Play's title", "Manage"], remoteData);
      document
        .querySelectorAll(".copyright")
        .forEach(
          (e) =>
            (e.innerHTML =
              "<p>© " +
              new Date().getFullYear() +
              ' - Luca Avveduto, Simone Cecire, Simone Cinquetti - All rights reserved.</p> <p>Designed with <span class="sr-only">love</span><i class="fas fa-heart" style="color: #fb866a;"></i> by <a class="theme-link" href="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</a> for developers</p>')
        );

      let focused;

      pubsub.subscribe("el-edited", (playTitle) => {
        focused = playTitle;
        adminForm.setInputsValue(playTitle, remoteData[playTitle]);
      });
      pubsub.subscribe("el-deleted", (newData) => {
        spinner.classList.remove("d-none");
        fetchComponent.setData("poi", newData).then((msg) => {
          fetchComponent.getData("poi").then((data) => {
            remoteData = data;
            pubsub.publish("get-remote-data", remoteData);
            spinner.classList.add("d-none");
          });
        });
      });
      adminTable.render();

      pubsub.subscribe("form-submit", (fullArticle) => {
        geoencoder
          .encode(fullArticle.article.place.name)
          .then((data) => {
            fullArticle.article.place.coords = data.coords;
            if (!remoteData[fullArticle.title] && adminForm.getEdit())
              delete remoteData[focused];
            else focused = undefined;
            remoteData[fullArticle.title] = fullArticle.article;
            modal.hide();
            adminForm.clear();

            spinner.classList.remove("d-none");
            fetchComponent.setData("poi", remoteData).then((msg) => {
              fetchComponent.getData("poi").then((data) => {
                remoteData = data;
                pubsub.publish("get-remote-data", remoteData);
                spinner.classList.add("d-none");
              });
            });
          })
          .catch((err) => {
            console.log(err);
            adminForm.setError("Invalid location");
          });
      });
      adminForm.render();

      pubsub.subscribe("get-remote-data", () => {
        generateArticles(remoteData);
        generateNavigator(pages);
      });

      spinner.classList.add("d-none");
      window.addEventListener("popstate", () => {
        document
          .querySelectorAll(".copyright")
          .forEach(
            (e) =>
              (e.innerHTML =
                "<p>© " +
                new Date().getFullYear() +
                ' - Luca Avveduto, Simone Cecire, Simone Cinquetti - All rights reserved.</p> <p>Designed with <span class="sr-only">love</span><i class="fas fa-heart" style="color: #fb866a;"></i> by <a class="theme-link" href="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</a> for developers</p>')
          );
        setNavbar(remoteData);
        if (new URL(document.location.href).hash === "#home") {
          map.resetZoom();
          map.render();
        }
      });
    });
  });
