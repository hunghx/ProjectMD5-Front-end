const defaultOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

// xây dựng hàm để đăng nhâp

const  handleLogin =  ()=>{
    //  lấy ra thông tin đăng nhập
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // call api để xác minh
    fetch(`http://localhost:9090/api.com/v2/auth/sign-in`, {
        method: "POST",
        ...defaultOptions,
        body: JSON.stringify({username, password})

    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else{
                throw new Error();
            }
            // return res.json();
        })
        .then(res => {
            console.log(res)
            // lưu thông tin đăng nhập lên localstorage/ sessionstorage
            localStorage.setItem("userLogin",JSON.stringify(res.data))
            location.href = "../index.html"
        })
        .catch(error => alert("Sai tên đăng nhập hoặc mật khẩu")
        )
}