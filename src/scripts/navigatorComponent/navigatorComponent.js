const hide = (element) => {
   element.classList.add("d-none");
}

const show = (element) => {
   element.classList.remove("d-none");
}

export const generateNavigator = (parentElement) => {
   const pages = Array.from(parentElement.querySelectorAll(".page"));
   
   const render = () => {
      const url = new URL(document.location.href);
      const pageName = url.hash.replace("#", "");
      const selectedPage = pages.filter((page) => page.id === pageName)[0] || pages[0];
      document.title = selectedPage.id.replace("article-", "").replaceAll("-", " ") + " | POI - Shakespeare's Places";
      document.title = document.title[0].toUpperCase() + document.title.substring(1);

      pages.forEach(p => hide(p));
      show(selectedPage);
   }
   
   window.addEventListener('popstate', render); 
   render();   
 }