export function navBarComponent(parentElement) {
    let elements;
    let bool;
    let callback;
    return {
        build: (list) => {
          elements = list;
        },
        render: () => {
            let item = 
            ` <li class="nav-item">
                %item
            </li>`;

            let newNavBar = 
            `<nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav w-100 d-flex justify-content-between">`
                            + (elements.map((e)=> item.replace("%item",e))).join("") +
                        `</ul>
                    </div>
                </div>
            </nav>`;
            parentElement.innerHTML = newNavBar;
        }
            /*document.querySelector("#open").onclick = () => document.querySelector("#result").innerText = "";

            if (bool === false) {
                activeNavBar(config.tipologie[0], config.tipologie);
                bool = true;
                callback(config.tipologie[0]);
            }

            config.tipologie.forEach(element => document.getElementById(element).onclick = () => {
                activeNavBar(element, config);
                callback(element);
            })
        },
        callback(value){
            callback = value;
        }*/
    }
}