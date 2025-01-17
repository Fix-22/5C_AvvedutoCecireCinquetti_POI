export const generateForm = (parentElement) => {
    let callback  ;

    return {
        onsubmit : function(inputCallback) {
            callback = inputCallback ;
        },
        
        render : function() {
            let html = 
            `<form class="container-fluid">
                <div class="row md-row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Title" id="workTitleInput">
                    </div>
                    <div class="col">
                        <textarea class="form-control" rows="8"
                            placeholder="Text" id="textInput"></textarea>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control"
                            placeholder="Main image link" id="playMainLink">
                    </div>
                </div>
                <div class="row md-row">
                    <div class="col">
                        <input type="text" class="form-control"
                            placeholder="Location" id="playLocation">
                    </div>
                    <div class="col">
                        <textarea class="form-control" rows="4"
                            placeholder="Main characters"
                            id="playCharacters"></textarea>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control"
                            placeholder="Second image link"
                            id="playSecondLink">
                    </div>
                </div>
                <div class="row md-row">
                    <div class="col">
                        <input type="text" class="form-control"
                            placeholder="Pubblication year"
                            id="playPubblicationYear">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control"
                            placeholder="Era" id="playEra">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control"
                            placeholder="Third image link"
                            id="playThirdLink">
                    </div>
                    <div id="resultLabel" class="form-text text-danger text-center"></div>
                </div>
            </form>
                            ` ;
            parentElement.innerHTML = html ;
            document.getElementById("adminFormTitle").innerText = "Add article";

            let workTitleInput = document.getElementById("workTitleInput") ;
            let textInput = document.getElementById("textInput") ;
            let playMainLink = document.getElementById("playMainLink") ;
            let playLocation = document.getElementById("playLocation") ;
            let playCharacters = document.getElementById("playCharacters") ;
            let playSecondLink = document.getElementById("playSecondLink") ;
            let playPubblicationYear = document.getElementById("playPubblicationYear") ;
            let playEra = document.getElementById("playEra") ;
            let playThirdLink = document.getElementById("playThirdLink") ;
            let resultLabel = document.getElementById("resultLabel");
            let newImages = [] ;

            document.querySelectorAll(".clearForm").forEach(b => {
                b.onclick = () => {
                    if (b.id === "submitButton") {
                        if (workTitleInput.value && textInput.value && playMainLink.value && playSecondLink.value && playThirdLink.value && playLocation.value && playCharacters.value && playPubblicationYear.value && playEra.value) {
                            document.getElementById("adminFormTitle").innerText = "Add article";

                            if (playMainLink.value && newImages.indexOf(playMainLink.value) === -1) newImages.push(playMainLink.value)
                            if (playSecondLink.value && newImages.indexOf(playSecondLink.value) === -1) newImages.push(playSecondLink.value)
                            if (playThirdLink.value && newImages.indexOf(playThirdLink.value) === -1) newImages.push(playThirdLink.value)
    
                            let article = {} ;
                            let title = workTitleInput.value ;
                            article.place = {
                                "name": playLocation.value,
                                "coords": []
                            } ;
                            article.yearofpub = playPubblicationYear.value ;
                            article.era = playEra.value ;
                            article.resume = textInput.value ;
                            article.images = newImages ;
                            article.characters = playCharacters.value ;
                            newImages = [];
                            
                            callback(title, article);
                        }
                        else {
                            resultLabel.innerText = "Not all forms compiled";
                        }
                    }
                    else {
                        document.getElementById("adminFormTitle").innerText = "Add article";
                        workTitleInput.value = "" ;
                        textInput.value = "" ;
                        playMainLink.value = "" ;
                        playSecondLink.value = "" ;
                        playThirdLink.value = "" ;
                        playLocation.value = "" ;
                        playCharacters.value = "" ;
                        playPubblicationYear.value = "" ;
                        playEra.value = "" ;
                        resultLabel.innerText = "";
                    }
                };
            })
        },
        setInputsValue : (title, articleDictionary) => {
            document.getElementById("adminFormTitle").innerText = "Edit article (" + title + ")";
            if (title) document.getElementById("workTitleInput").value = title ;
            if (articleDictionary.resume) document.getElementById("textInput").value = articleDictionary.resume ;
            if (articleDictionary.images[0]) document.getElementById("playMainLink").value = articleDictionary.images[0] ;
            if (articleDictionary.images[1]) document.getElementById("playSecondLink").value =  articleDictionary.images[1] ;
            if (articleDictionary.images[2]) document.getElementById("playThirdLink").value =  articleDictionary.images[2] ;
            if (articleDictionary.place.name) document.getElementById("playLocation").value =  articleDictionary.place.name ;
            if (articleDictionary.characters) document.getElementById("playCharacters").value = articleDictionary.characters ;
            if (articleDictionary.yearofpub) document.getElementById("playPubblicationYear").value = articleDictionary.yearofpub ;
            if (articleDictionary.era) document.getElementById("playEra").value = articleDictionary.era ;
        },
        clear: () => {
            document.getElementById("adminFormTitle").innerText = "Add article";
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




