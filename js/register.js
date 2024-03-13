
const defaultOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
const handleRegister = ()=>{
    //  lấy ra thông tin đăng nhập
    let username = document.getElementById("username").value;
    let fullName = document.getElementById("fullName").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let birthday = document.getElementById("birthday").value;
    console.log({username,fullName,password,email,birthday});
    // call api để xác minh
    fetch(`http://localhost:9090/api.com/v2/auth/sign-up`, {
        method: "POST",
        ...defaultOptions,
        body: JSON.stringify({username,fullName,password,email,birthDay:birthday})

    })
        .then(res => {
            if (res.status === 201) {
                return res.json();
            } else{
                throw new Error();
            }
            // return res.json();
        })
        .then(res => {
            alert("Đăng kí thành công");
            location.href = "../login.html";
        })
        .catch(error => 
            alert("thông tin không hợp lệ")
        )
}