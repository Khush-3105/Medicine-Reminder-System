let patientData=JSON.parse(localStorage.getItem('patientData')) || [];
// patientData.forEach(requestListMaker(element,index))
// console.log(patientData)
if(patientData.length===0){

}
let doctorData = JSON.parse(localStorage.getItem('doctorData')) || [];
let currDoctorIndex=localStorage.getItem("currDoctorIndex")
if(doctorData.length!=0)
{
let name=`Dr. ${doctorData[currDoctorIndex].fname} ${doctorData[currDoctorIndex].lname}`
document.getElementById("doctorName").innerHTML=`Welcome, ${name}`
}

patientData.forEach(function(contents,index){
    let userData=JSON.parse(localStorage.getItem('userData')) || [];
    let fname=userData[contents.currUserIndex].fname
    let lname=userData[contents.currUserIndex].lname
    let desc=contents.desc
    let severity=contents.severity

    // console.log(fname+" "+lname+" "+desc+" "+severity)
    var div1= document.createElement("div");
    var div2= document.createElement("div");
    var h3= document.createElement("h3");
    var span=document.createElement('span')
    var button=document.createElement("button");
    div1.className ='innerCont'
    div2.className='requestBox'
    button.className="givePrescription"
    button.id=`${index}`
    button.addEventListener("click",hello,false)
    h3.innerHTML = `${fname} ${lname}`
    span.innerHTML = ` <strong>Problem:</strong> ${desc} <strong>Severity:</strong> ${severity}`
    button.innerHTML="Give Prescription"
    div2.appendChild(h3)
    div2.appendChild(span)
    div1.appendChild(div2)
    div1.appendChild(button)
    const cont= document.querySelector(".cont")
    cont.appendChild(div1);
})

function hello(event){
    var id=this.id;
    var currPatient=patientData[id]
    localStorage.setItem("currPatient",currPatient.currUserIndex)
    patientData.splice(id,1)
    localStorage.setItem("patientData",JSON.stringify(patientData))
    window.location.href="Prescriptions.html"
}
