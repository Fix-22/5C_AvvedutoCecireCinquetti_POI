export function generateNavBarComponent(parentElement,pubsub) {
    let elements;
    
    const navbarObject = {
        build: function(list) {
          elements = list;
          console.log(elements)
          pubsub.subscribe("login",()=>{
            this.build([
                '<button type="button" class="btn btn-secondary me-1" data-bs-toggle="modal" data-bs-target="#modalForm"><i class="fa-solid fa-file-circle-plus"></i> Add an article</button>',
				'<a href="#home" class="btn btn-primary"><i class="fa-solid fa-house"></i>Home</a>'
            ]);
            this.render();
          })
        },
        render: function() {
            let newNavBar = `
            <header class="header fixed-top">	 
                <div class="branding docs-branding">
                    <div class="container-fluid position-relative py-2 inline">
                        <div class="docs-logo-wrapper">` +
                            (!(new URL(document.location.href).hash).includes("#article") ? 
                            `<div class="site-logo"><a class="navbar-brand" href="#home"><img class="logo-icon me-2" src="assets/images/coderdocs-logo.svg" alt="logo"><span class="logo-text d-none d-sm-inline">Shakespeare's<span class="text-alt"> places</span></span></a></div>` 
                            : `<div class="site-logo"><a class="navbar-brand" href="#home"><img class="logo-icon me-2" src="assets/images/coderdocs-logo.svg" alt="logo"><span class="logo-text d-none d-sm-inline">Shakespeare's<span class="text-alt"> places</span></span></a></div>`) + 
                        `</div>
                        <div class="docs-top-utilities d-flex justify-content-end align-items-center">` +
                            elements.join("") + 
                        `</div>
                    </div>
                </div>
            </header>`;

            parentElement.innerHTML = newNavBar;
        }
    };
    return navbarObject;
}