export const generateAdminTable = (parentElement) => {
    let header = [];
    let data = [];
    let elementDeleteCallback, elementEditCallback;

    return {
        build: (inputHeader, inputData) => {
            header = inputHeader;
            data = inputData;
        },
        onelementedit: (inputElementEditCallback) => {
            elementEditCallback = inputElementEditCallback;
        },
        onelementdelete: (inputElementDeleteCallback) => {
            elementDeleteCallback = inputElementDeleteCallback;
        },
        render: () => {
            let html = '<table class="table table-focus table-striped"><thead class="sticky-on-top"><tr>';
            
            header.forEach(e => {
                html += '<th class="table-secondary">' + e + "</th>";
            });
            html += "</tr></thead><tbody>";

            data.forEach(e => {
                html += "<tr><td>" + e.title + '</td><td><button type="button" id="edit-' + e.title + '" class="btn btn-warning editButton" data-bs-toggle="modal" data-bs-target="#modalForm"><i class="bi bi-pencil-square"></i> Edit</button> <button type="button" id="delete-' + e.title + '" class="btn btn-danger deleteButton"><i class="bi bi-trash"></i> Delete</button></td></tr>';
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
                    
                    let idx = 0;
    
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].title === playTitle) {
                            idx = i;                        
                            break;
                        }
                    }
                    data.splice(idx, 1);
                    
                    elementDeleteCallback(data);
                };
            });
        },
        setData: (inputData) => {
            data = inputData;
        },
        getData: () => {
            return data;
        }
    }
};