// const data = [
//     {id: 1, catalogName: "Trang suc", description: "mo ta 1"}, {
//         id: 2,
//         catalogName: "Do choi trer em",
//         description: "mo ta 2"
//     }]
// data có được thông qua call Api
// sử dụng fetch() để call api
// câu hình header
// Laàm lại 2 cức năng :
// + lấy dữ liệu từ api và đổ ra html
// + xóa dữ lệu thông qua api và hiển thị lại giao diện sau khi xóa
// + nghiên cưu về fetch api / axios


let data = [];
const defaultOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImlhdCI6MTcxMDE2MzkzNiwiZXhwIjoxNzEwMjUwMzM2fQ.sumO4myJo59aYSIUkzu-M_igFVmhfjVk1zp1BZjNAeRi4Kr7gUsAXHXIZMwvW3Tr5BwsodIEkaU4x_uTdMAIDA",
    }
};
const getAllCatalogs = async () => {
    fetch("http://localhost:9090/api.com/v5/admin/catalogs", defaultOptions)
        .then(res => res.json())
        .then(res => {
                data = res.data;
                console.log("data", data);
                // Sử dụng DOM để đổ dữ liệu ra
                let tbody = document.getElementById("categories");
                let html = "";
                for (let i = 0; i < data.length; i++) {
                    html += `<tr>
                                <td>${data[i].id}</td>
                                <td>${data[i].catalogName}</td>
                                <td>${data[i].description}</td>
                                <td>
                                    <button type="button" class="btn btn-warning">Edit</button>
                                </td>
                                <td>
                                    <button onclick="handleDeleteCatalog(${data[i].id})" type="button" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>`
                }

                tbody.innerHTML = html;
            }
        )
        .catch(err => console.log(err))
}

getAllCatalogs();

const handleDeleteCatalog = (id) => {
    if (!confirm("Bạn cos chac chan muon xoa khong")) {
        return;
    }
    // call api
    fetch(`http://localhost:9090/api.com/v5/admin/catalogs/${id}`, {
        method: "DELETE",
        contentType: "application/json", ...defaultOptions
    })
        .then(res => {
            if (res.status === 204) {
                getAllCatalogs();
            } else {
                throw new Error("somthing wrong")
            }
        })
        .catch(err => alert("Danh mục này có sản phẩm neen không thể xóa"))
}


const addNewCategory = () => {
    // lay thong tin tu o input
    let catalogName = document.getElementById("category_name").value;
    let description = document.getElementById("description").value;
    console.log(JSON.stringify({catalogName, description}))
    fetch(`http://localhost:9090/api.com/v5/admin/catalogs`, {
        method: "POST",
        ...defaultOptions,
        body: JSON.stringify({catalogName, description})

    })
        .then(res => {
            if (res.status === 201) {
                return res.json();
            } else if(res.status === 400) {
                throw res.json()
            }
            // return res.json();
        })
        .then(res => {
                let data = res.data;
                let tbody = document.getElementById("categories");
                let child = `<tr>
                                <td>${data.id}</td>
                                <td>${data.catalogName}</td>
                                <td>${data.description}</td>
                                <td>
                                    <button type="button" class="btn btn-warning">Edit</button>
                                </td>
                                <td>
                                    <button onclick="handleDeleteCatalog(${data.id})" type="button" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>`

                tbody.insertAdjacentHTML('beforeend', child);


        })
        .catch(error => {

            error.then((body) => {
                console.log(body)
                //Here is already the payload from API
                let mess = "";
                for (const key in body.message) {
                    mess+= key+" : "+body.message[key] + ","
                }
                alert(mess)
                });
            }
        )
}
