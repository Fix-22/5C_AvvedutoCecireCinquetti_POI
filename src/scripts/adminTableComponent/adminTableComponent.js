export const generateAdminTable = (parentElement,pubsub) => {
    let header = [];
    let data = [];
    let elementDeleteCallback, elementEditCallback;

    const dict ={
        build: function(inputHeader, inputData) {
            header = inputHeader;
            data = inputData;
            pubsub.subscribe("el-deleted",(remoteData)=>{
                this.setData(remoteData);
                this.render();
            })
        },
        onelementedit: (inputElementEditCallback) => {
            elementEditCallback = inputElementEditCallback;
        },
        onelementdelete: (inputElementDeleteCallback) => {
            elementDeleteCallback = inputElementDeleteCallback;
        },
        render: function() {
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top"><tr>';
            
            header.forEach(e => {
                html += '<th class="table-secondary">' + e + "</th>";
            });
            html += "</tr></thead><tbody>";

            let dataKeys = Object.keys(data);

            dataKeys.forEach(e => {
                html += "<tr><td>" + e + '</td><td><button type="button" id="edit-' + e + '" class="btn btn-warning editButton" data-bs-toggle="modal" data-bs-target="#modalForm"><i class="bi bi-pencil-square"></i> Edit</button> <button type="button" id="delete-' + e + '" class="btn btn-danger deleteButton"><i class="bi bi-trash"></i> Delete</button></td></tr>';
            });

            html += "</tbody></table>";
            parentElement.innerHTML = html;

            document.querySelectorAll(".editButton").forEach(b => {
                b.onclick = () => {
                    const playTitle = b.id.replace("edit-", "");
                    elementEditCallback(playTitle);
                };
            });

            document.querySelectorAll(".deleteButton").forEach(b => {
                b.onclick = () => {
                    const playTitle = b.id.replace("delete-", "");
                    
                    delete data[playTitle];
                    
                    elementDeleteCallback(data);
                };
            });
        },
        setData: function(inputData) {
            data = inputData;
        },
        getData: function() {
            return data;
        }
    }
    return dict
};