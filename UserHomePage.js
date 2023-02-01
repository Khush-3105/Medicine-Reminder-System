const contentArray = localStorage.getItem('meds') ? JSON.parse(localStorage.getItem('meds')) : [];
let userData = JSON.parse(localStorage.getItem('userData')) || [];
let currUserIndex=localStorage.getItem("currUserIndex")
if(userData.length!=0)
{
let name=`${userData[currUserIndex].fname} ${userData[currUserIndex].lname}`
document.getElementById("userName").innerHTML=`Welcome, ${name}`
}

let btn=document.querySelector(".submit")
btn.addEventListener("click",()=>{
    let desc=document.querySelector("#problem").value
    let severity=document.querySelector("#severity").value
    let data=JSON.parse(localStorage.getItem('patientData')) || [];
    data.push({ currUserIndex, desc,severity })
    localStorage.setItem("patientData",JSON.stringify(data));
    document.querySelector("#problem").value=""
    document.querySelector("#severity").value="MILD"
    alert("Thank You For Choosing MedBuddy, A Doctor will get Back to you Soon")
})


var showReminderbtn=document.querySelector(".showReminderbtn")
showReminderbtn.addEventListener("click",toggleReminders)

function toggleReminders(e) {
    var reminderBox=document.querySelector(".reminderBox")
    if(reminderBox.style.display==='flex'){
        reminderBox.style.display='none'
        showReminderbtn.innerHTML="Show Prescription"
    }
    else{
        reminderBox.style.display='flex'
        showReminderbtn.innerHTML="Hide Prescription"
    }
}


for(var i=0;i<contentArray.length;i++){
    let currPatient=contentArray[i].currPatient
    if(currPatient===currUserIndex){
        divMaker(contentArray[i])
    }
}

function divMaker(contents) {
    var div = document.createElement("div");
    var h2_medication_name = document.createElement("h2");
    var p_due_time = document.createElement("p");
    div.className = 'reminders'
    div.setAttribute('style',"height: 7rem ; width:15rem;")
    h2_medication_name.setAttribute('style', "font-weight: bold;")
    h2_medication_name.innerHTML = contents.medName
    p_due_time.setAttribute('style', 'margin-top:10px')
    p_due_time.innerHTML = `Your medicine is due at <strong>${contents.firstIntake.substr(0,contents.firstIntake.lastIndexOf(':'))}</strong>`
    div.appendChild(h2_medication_name)
    div.appendChild(p_due_time)
    const reminderBox = document.querySelector(".reminderBox")
    reminderBox.appendChild(div);
    var index = contentArray.indexOf(contents)
    if (Notification.permission !== "denied") {
        Notification.requestPermission();
    }
    var timeGap=contents.reminderTime/60
    var originalhour=parseInt(contents.firstIntake.split(':')[0])
    var originalMinute=parseInt(contents.firstIntake.split(":")[1])
    // console.log(originalhour+" "+originalMinute)
    var frequency = contents.frequency;
    var variable = setInterval(() => {
        console.log("AHSAJKDA")
        if (frequency != 0) {
            const notification = new Notification("New Notification From MedBuddy!", {
                body: `Its Time to Take ${contents.medName}`
            })
            frequency--;
            originalhour+=parseInt(timeGap/60)
            originalMinute+=parseInt(timeGap%60)
            const d = new Date();
            d.setMinutes(originalMinute);
            d.setHours(originalhour);
            var help=d.toLocaleTimeString();
            help=help.substr(0,help.lastIndexOf(":"))
            p_due_time.innerHTML = `Your ${contents.medName} is due at <strong>${help}</strong>`
        }
        else 
        {
            contentArray.splice(index,1)
            localStorage.setItem("meds",JSON.stringify(contentArray))
            reminderBox.removeChild(div)
            clearInterval(variable);
        }
    }, contents.reminderTime * 1000);
}

document.querySelector("#SearchBox").addEventListener("input", () => {
    let inputValue = document.querySelector("#SearchBox").value
    let remindersArray = document.getElementsByClassName('reminders');
    Array.from(remindersArray).forEach((element) => {
        let medName = element.getElementsByTagName("h2")[0].innerText;
        if (medName.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


