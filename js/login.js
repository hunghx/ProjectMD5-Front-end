

function handleLogin(){
    //  lấy thông tin từ in put
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    fetch("http://localhost:8080/api.com/v1/auth/sign-in", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
         username,
         password
        })
      }).then(res  =>res.json())
      .then((data)=>{
        console.log(data);
      })
      .catch(err => console.log(err))
}