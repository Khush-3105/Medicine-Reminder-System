const signUp = e => {
  let fname = document.getElementById('fname').value,
      lname = document.getElementById('lname').value,
      email = document.getElementById('email').value,
      pwd = document.getElementById('pwd').value;

  let doctorData = JSON.parse(localStorage.getItem('doctorData')) || [];

  let exist = doctorData.length && 
      JSON.parse(localStorage.getItem('doctorData')).some(data => 
          data.fname.toLowerCase() == fname.toLowerCase() && 
          data.lname.toLowerCase() == lname.toLowerCase()
      );

  if(!exist){
      doctorData.push({ fname, lname, email, pwd });
      localStorage.setItem('doctorData', JSON.stringify(doctorData));
      document.querySelector('form').reset();
      document.getElementById('fname').focus();
      alert("Account Created.\n\nPlease Sign In using the link below.");
  }
  else{
      alert("Ooopppssss... Duplicate found!!!\nYou have already signed up");
  }
  e.preventDefault();
}

function signIn(e) {
  let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
  let doctorData = JSON.parse(localStorage.getItem('doctorData')) || [];
  let exist = doctorData.length && 
  JSON.parse(localStorage.getItem('doctorData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
  if(!exist){
      alert("Incorrect login credentials");
  }
  else{
      doctorData.forEach((element,index) => {
        let el = element.email,
            pd = element.pwd;

        if(el===email && pd===pwd)
        {
            localStorage.setItem("currDoctorIndex",index);            
            location.href = "DoctorHomePage.html";
        }
      });
  }
  e.preventDefault();
}