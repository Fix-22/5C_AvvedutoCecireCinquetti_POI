"use strict";

let sidebarToggler, sidebars, sidebarLinks;

const checkElements = setInterval(() => {
  sidebarToggler = document.getElementById("docs-sidebar-toggler");
  sidebars = document.querySelectorAll("#docs-sidebar");
  sidebarLinks = document.querySelectorAll("#docs-sidebar .scrollto");

  if (sidebarToggler && sidebars && sidebarLinks) {
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
}, 100); // Controlla ogni 100 ms
