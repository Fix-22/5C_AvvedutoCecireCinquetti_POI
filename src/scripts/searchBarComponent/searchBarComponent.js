export const generateSearchbar = (parentElement, pubsub) => {

  return {
    render: () => {
      let HTML = `
                <form class="search-form w-100">
                    <input type="text" placeholder="Search..." name="search" class="form-control search-input" id="searchText">
                </form>`;
      parentElement.innerHTML = HTML;

      document.getElementById("searchText").oninput = () => {
        if (document.getElementById("searchText").value === "") {
          pubsub.publish("cancel");
        }
      };        

      parentElement.querySelector(".search-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let searchText = document.getElementById("searchText").value;
        if (searchText) {
          pubsub.publish("search", searchText);
        } else {
          pubsub.publish("cancel");
        }
      });
    },
  };
};
