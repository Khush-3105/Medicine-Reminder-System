const signUp = e => {
  let fname = document.getElementById('fname').value,
      lname = document.getElementById('lname').value,
      email = document.getElementById('email').value,
      pwd = document.getElementById('pwd').value;

  let userData = JSON.parse(localStorage.getItem('userData')) || [];

  let exist = userData.length && 
      JSON.parse(localStorage.getItem('userData')).some(data => 
          data.fname.toLowerCase() == fname.toLowerCase() && 
          data.lname.toLowerCase() == lname.toLowerCase()
      );

  if(!exist){
      userData.push({ fname, lname, email, pwd });
      localStorage.setItem('userData', JSON.stringify(userData));
      document.querySelector('form').reset();
      document.getElementById('fname').focus();
      alert("Account Created.\n\nPlease Sign In using the link below.");
  }
  else{
      alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
  }
  e.preventDefault();
}

function signIn(e) 
{
  let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
  let userData = JSON.parse(localStorage.getItem('userData')) || [];
  let exist = userData.length && JSON.parse(localStorage.getItem('userData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
  if(!exist){
      alert("Incorrect login credentials");
  }
  else
  {
      userData.forEach((element,index) => {
        let el = element.email,
            pd = element.pwd;

        if(el===email && pd===pwd)
        {
            // console.log(element.fname+" "+index)
            localStorage.setItem("currUserIndex",index);            
            location.href = "UserHomePage.html";
        }
      });
  }
  e.preventDefault();
}