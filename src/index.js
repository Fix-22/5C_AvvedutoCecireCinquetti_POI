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
				    <li class="nav-item section-title"><a class="nav-link scrollto active" href="#main-%PLAYTITLE"><span class="theme-icon-holder me-2"><i class="fa-solid fa-book"></i></span>%PLAYTITLE</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#mainImage-%PLAYTITLE">Main image</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#resume-%PLAYTITLE">Resume</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#otherImages-%PLAYTITLE">Other images</a></li>
				    <li class="nav-item"><a class="nav-link scrollto" href="#characters-%PLAYTITLE">Main characters</a></li>
			    </ul>
		    </nav><!--//docs-nav-->
	    </div>
	    <div class="docs-content">
		    <div class="container">
			    <article class="docs-article" id="main-%PLAYTITLE">
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

					<section class="docs-section" id="mainImage-%PLAYTITLE">
						<div class="d-flex justify-content-center align-items-center">
							<a target="_blank" href="%IMGLINK1"><img class="figure-img img-fluid shadow rounded" src="%IMGLINK1" alt="Main image" title="Main image"/></a>
						</div>
					</section>

				    <section class="docs-section" id="resume-%PLAYTITLE">
						<h2 class="section-heading">Resume</h2>
						<p>%RESUME</p>
                       
					</section><!--//section-->
					
					<section class="docs-section" id="otherImages-%PLAYTITLE">
						<div class="row mb-3 align-items-center justify-content-center">
							<div class="col-md-6 mb-1">
								<a target="_blank" href="%IMGLINK2"><img class="figure-img img-fluid shadow rounded" src="%IMGLINK2" alt="Other image 1" title="Other image 1"/></a>
							</div>
							<div class="col-md-6 mb-1">
								<a target="_blank" href="%IMGLINK3"><img class="figure-img img-fluid shadow rounded" src="%IMGLINK3" alt="Other image 2" title="Other image 2"/></a>
							</div>
						</div>
					</section>
					
					<section class="docs-section" id="characters-%PLAYTITLE">
						<h2 class="section-heading">Main characters</h2>
						<p>%CHARACTERS</p>
					</section><!--//section-->
			    </article>
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
      .replaceAll("%PLACE", currentArticleData.place.name)
      .replaceAll("%YEAROFPUB", currentArticleData.yearofpub)
      .replaceAll("%ERA", currentArticleData.era)
      .replaceAll("%RESUME", currentArticleData.resume)
      .replaceAll("%CHARACTERS", currentArticleData.characters)
      .replaceAll("%IMGLINK1", currentArticleData.images[0])
      .replaceAll("%IMGLINK2", currentArticleData.images[1])
      .replaceAll("%IMGLINK3", currentArticleData.images[2]);
  }
  articlesContainer.innerHTML = div;
};

const checkElements = () => {
  const sidebarToggler = document.querySelector("#docs-sidebar-toggler");
  const sidebars = document.querySelectorAll("#docs-sidebar");
  const sidebarLinks = document.querySelectorAll("#docs-sidebar .scrollto");

  if (sidebarToggler && sidebars.length > 0 && sidebarLinks) {
    clearInterval(checkElements);
    responsiveSidebar();

    window.onresize = function () {
      responsiveSidebar();
    };

    function responsiveSidebar() {
      let w = window.innerWidth;
      if (w >= 1200) {
        // if larger
        console.log("larger");
        sidebars.forEach(e => {
          e.classList.remove("sidebar-hidden");
          e.classList.add("sidebar-visible");
        });
      } else {
        // if smaller
        console.log("smaller");
        sidebars.forEach(e => {
          e.classList.add("sidebar-hidden");
          e.classList.remove("sidebar-visible");
        });
      }
    }

    sidebarToggler.addEventListener("click", () => {
        sidebars.forEach(e => {
          if (e.classList.contains("sidebar-visible")) {
            console.log("visible");
            e.classList.remove("sidebar-visible");
            e.classList.add("sidebar-hidden");
          } else {
            console.log("hidden");
            e.classList.remove("sidebar-hidden");
            e.classList.add("sidebar-visible");
          }
        });
    });

    /* ===== Smooth scrolling ====== */
    /*  Note: You need to include smoothscroll.min.js (smooth scroll behavior polyfill) on the page to cover some browsers */
    /* Ref: https://github.com/iamdustan/smoothscroll */

    sidebarLinks.forEach((sidebarLink) => {
      sidebarLink.addEventListener("click", (e) => {
        e.preventDefault();

        var target = sidebarLink.getAttribute("href").replace("#", "");

        //console.log(target);

        document.getElementById(target).scrollIntoView({ behavior: "smooth" });

        //Collapse sidebar after clicking
        sidebars.forEach(e => {
          if (
            e.classList.contains("sidebar-visible") &&
            window.innerWidth < 1200
          ) {
            e.classList.remove("sidebar-visible");
            e.classList.add("sidebar-hidden");
          }
        });
      });
    });

    /* ===== Gumshoe SrollSpy ===== */
    /* Ref: https://github.com/cferdinandi/gumshoe  */
    // Initialize Gumshoe
    var spy = new Gumshoe("#docs-nav a", {
      offset: 69, //sticky header height
    });

    /* ====== SimpleLightbox Plugin ======= */
    /*  Ref: https://github.com/andreknieriem/simplelightbox */

    var lightbox = new SimpleLightbox(".simplelightbox-gallery a", {
      /* options */
    });
  }
}; // Controlla ogni 100 ms

fetch("conf.json")
  .then((r) => r.json())
  .then((data) => {
    const navbarEl = [
      [
        '<a href="#admin" class="btn btn-primary"><i class="fa-solid fa-gear"></i> Admin</a>',
      ],
      [
        '<a href="#admin" class="btn btn-primary"><i class="fa-solid fa-gear"></i> Admin</a>',
        '<a href="#home" class="btn btn-primary"><i class="fa-solid fa-house"></i> Home</a>',
        '<button id="docs-sidebar-toggler" class="btn btn-info docs-sidebar-visible me-2 d-xl-none" type="button"><i class="fa-solid fa-bars"></i></button>',
      ],
      ['<a href="#home" class="btn btn-primary"><i class="fa-solid fa-house"></i> Home</a>'],
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

      checkElements();

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
        checkElements();
        if (new URL(document.location.href).hash === "#home") {
          map.resetZoom();
        }
      });
    });
  });
