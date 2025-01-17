export const generateForm = (parentElement) => {
    let callback  ;

    return {
        onsubmit : function(inputCallback) {
            callback = inputCallback ;
        },
        
        render : function() {
            let html = 
            `<div class="modal fade" id="modalForm" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="d-block">
                                    <p class="topic">Home | POI - Shakespeare's Places</p> 
                                    <h2 class="modal-title" id="exampleModalLabel">Add/Edit article</h2>
                                </div>
                                <button type="button" class="btn-close clearForm" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="modalBody">
                                <form class="container-fluid">
                                    <div class="row md-row">
                                        <div class="col">
                                            <input type="text" class="form-control" placeholder="Title (precompiled if 'edit' is pressed)" id="workTitleInput">
                                        </div>
                                        <div class="col">
                                            <textarea class="form-control" rows="8"
                                                placeholder="Text (precompiled if 'edit' is pressed)" id="textInput"></textarea>
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control"
                                                placeholder="Main image link (precompiled if 'edit' is pressed)" id="playMainLink">
                                        </div>
                                    </div>
                                    <div class="row md-row">
                                        <div class="col">
                                            <input type="text" class="form-control"
                                                placeholder="Location (precompiled if 'edit' is pressed)" id="playLocation">
                                        </div>
                                        <div class="col">
                                            <textarea class="form-control" rows="4"
                                                placeholder="Main characters (precompiled if 'edit' is pressed)"
                                                id="playCharacters"></textarea>
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control"
                                                placeholder="Second image link (precompiled if 'edit' is pressed)"
                                                id="playSecondLink">
                                        </div>
                                    </div>
                                    <div class="row md-row">
                                        <div class="col">
                                            <input type="text" class="form-control"
                                                placeholder="Pubblication year (precompiled if 'edit' is pressed)"
                                                id="playPubblicationYear">
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control"
                                                placeholder="Era (precompiled if 'edit' is pressed)" id="playEra">
                                        </div>
                                        <div class="col">
                                            <input type="text" class="form-control"
                                                placeholder="Third image link (precompiled if 'edit' is pressed)"
                                                id="playThirdLink">
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                            <div id="resultLabel"><i class="bi bi-floppy"></i></div>
                                <button type="button" class="btn btn-danger clearForm" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i> Cancel</button>
                                <button type="button" class="btn btn-dark clearForm" id="submitButton"><i class="bi bi-floppy"></i> Save</button>
                            </div>
                        </div>
                    </div>
                </div>` ;
            parentElement.innerHTML = html ;

            let workTitleInput = document.getElementById("workTitleInput") ;
            let textInput = document.getElementById("textInput") ;
            let playMainLink = document.getElementById("playMainLink") ;
            let playLocation = document.getElementById("playLocation") ;
            let playCharacters = document.getElementById("playCharacters") ;
            let playSecondLink = document.getElementById("playSecondLink") ;
            let playPubblicationYear = document.getElementById("playPubblicationYear") ;
            let playEra = document.getElementById("playEra") ;
            let playThirdLink = document.getElementById("playThirdLink") ;
            let newImages = [] ;

            document.querySelectorAll(".clearForm").forEach(b => {
                b.onclick = () => {
                    if (b.id === "submitButton") {                        
                        if (playMainLink.value && newImages.indexOf(playMainLink.value) === -1) newImages.push(playMainLink.value)
                        if (playSecondLink.value && newImages.indexOf(playSecondLink.value) === -1) newImages.push(playSecondLink.value)
                        if (playThirdLink.value && newImages.indexOf(playThirdLink.value) === -1) newImages.push(playThirdLink.value)

                        let article = {} ;
                        article.title = workTitleInput.value ;
                        article.text = textInput.value ;
                        article.images = newImages ;
                        article.location = playLocation.value ;
                        article.characters = playCharacters.value ;
                        article.pubblicationYear = playPubblicationYear.value ;
                        article.era = playEra.value ;
                        newImages = [];
                        
                        callback(article);    
                    }
                    else {
                        workTitleInput.value = "" ;
                        textInput.value = "" ;
                        playMainLink.value = "" ;
                        playSecondLink.value = "" ;
                        playThirdLink.value = "" ;
                        playLocation.value = "" ;
                        playCharacters.value = "" ;
                        playPubblicationYear.value = "" ;
                        playEra.value = "" ;
                    }
                };
            })
        },
        setData : (articleDictionary) => {
            document.getElementById("workTitleInput").value = articleDictionary.title ;
            document.getElementById("textInput").value = articleDictionary.text ;
            document.getElementById("playMainLink").value = articleDictionary.images[0] ;
            document.getElementById("playSecondLink").value =  articleDictionary.images[1] ;
            document.getElementById("playThirdLink").value =  articleDictionary.images[2] ;
            document.getElementById("playLocation").value =  articleDictionary.location ;
            document.getElementById("playCharacters").value = articleDictionary.characters ;
            document.getElementById("playPubblicationYear").value = articleDictionary.pubblicationYear ;
            document.getElementById("playEra").value = articleDictionary.era ;
        },
        clear: () => {
            document.getElementById("workTitleInput").value = "" ;
            document.getElementById("textInput").value = "" ;
            document.getElementById("playMainLink").value = "" ;
            document.getElementById("playSecondLink").value = "" ;
            document.getElementById("playThirdLink").value = "" ;
            document.getElementById("playLocation").value = "" ;
            document.getElementById("playCharacters").value = "" ;
            document.getElementById("playPubblicationYear").value = "" ;
            document.getElementById("playEra").value = "" ;
            document.getElementById("resultLabel").innerText = "" ;
        },
        setError: (error) => {
            document.getElementById("resultLabel").innerText = error;
        }
    }
};




