export function generateNavBarComponent(parentElement,pubsub) {
    let elements;
    
    const navbarObject = {
        build: function(list) {
          elements = list;
          pubsub.subscribe("login",()=>{
            this.build([
                '<a href="#home"><img src="/src/assets/home.png" alt="home"></a>',
                '<a href="#home"><img src="/src/assets/logo.png" class="logo navbar-brand"></a>',
                '<button type="button" class="btn btn-dark" id="addArticleButton" data-bs-toggle="modal" data-bs-target="#modalForm"><i class="bi bi-file-earmark-plus"></i> Add an article</button>'
            ]);
            this.render();
          })
        },
        render: function() {
            let item = 
            ` <li class="nav-item">
                %item
            </li>`;

            let newNavBar = 
            `<nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
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
            const btn = document.querySelector("#searchButton");
            if (btn)  
                btn.onclick = () => {
                const container = document.querySelector("#searchbarContainer");
                if (container.classList.contains("d-none")) container.classList.remove("d-none");
                else  container.classList.add("d-none");
            }
        }
    };
    return navbarObject;
}