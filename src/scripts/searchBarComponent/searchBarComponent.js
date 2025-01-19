export const generateSearchbar = (parentElement,pubsub) => {
    let placeholder;
    
    return {
        build: (inputPlaceholder) => {
            placeholder = inputPlaceholder;
        },
        render: () => {
            let HTML = '<input type="search" class="form-control" placeholder="' + placeholder + '" id="searchText">'

            parentElement.innerHTML = HTML;

            document.getElementById("searchText").oninput = () => {
                if(document.getElementById("searchText").value === ""){
                    pubsub.publish("cancel")
                }
            }

            parentElement.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    let searchText = document.getElementById("searchText").value;
                
                    if (searchText) {
                        pubsub.publish("search",searchText)
                    }
                    else {
                        pubsub.publish("cancel")
                    }
                }
              });

        }
    };
};