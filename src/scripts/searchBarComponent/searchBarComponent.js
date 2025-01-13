export const generateSearchbar = (parentElement) => {
    let placeholder;
    let searchCallback, cancelCallback;

    return {
        build: (inputPlaceholder) => {
            placeholder = inputPlaceholder;
        },
        onsearch: (inputSearchCallback) => {
            searchCallback = inputSearchCallback;
        },
        oncancel: (inputCancelCallback) => {
            cancelCallback = inputCancelCallback;
        },
        render: () => {
            let HTML = '<div id="searchDiv" class="sticky-on-top"> <input type="search" class="form-control" placeholder="' +placeholder + '" id="searchText"></div>'

            parentElement.innerHTML = HTML;

            parentElement.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    let searchText = document.getElementById("searchText").value;
                
                if (searchText) {
                    searchCallback(searchText);
                }
                else {
                    cancelCallback();
                }
                }
              });

        }
    };
};