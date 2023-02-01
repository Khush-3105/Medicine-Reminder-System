const contentArray = localStorage.getItem('meds') ? JSON.parse(localStorage.getItem('meds')) : [];
// let patientData=JSON.parse(localStorage.getItem('patientData')) || [];
// let userData = JSON.parse(localStorage.getItem('userData')) || [];
// contentArray.forEach(divMaker)
const addReminderButton = document.querySelector(".addReminderButton").addEventListener("click", () => {
    const medName = document.querySelector("#medicationName").value
    const xDays = document.querySelector("#xDays").value
    const frequency = document.querySelector("#frequency").value
    const firstIntake = document.querySelector("#firstIntake").value
    const lastIntake = document.querySelector("#lastIntake").value
    const splittedArray1 = firstIntake.split(":")
    const splittedArray2 = lastIntake.split(":")
    const time2 = splittedArray2[0] * 60 * 60 + splittedArray2[1] * 60
    const time1 = splittedArray1[0] * 60 * 60 + splittedArray1[1] * 60
    const timeDiffinSec = Math.abs((time2 - time1))
    const reminderTime = timeDiffinSec / frequency
    createReminder(medName, xDays, frequency, reminderTime, firstIntake, lastIntake)
})
function createReminder(medName, xDays, frequency, reminderTime, firstIntake, lastIntake) {
    var currPatient=localStorage.getItem("currPatient")
    var medicationInfo = 
    {
        'currPatient':currPatient,
        'medName': medName,
        'xDays': xDays,
        'frequency': frequency,
        'reminderTime': reminderTime,
        'firstIntake': firstIntake,
        'lastIntake': lastIntake
    }
    contentArray.push(medicationInfo);
    localStorage.setItem('meds', JSON.stringify(contentArray))
    // divMaker(contentArray[contentArray.length - 1])
    document.querySelector("#medicationName").value = ''
}

// function divMaker(contents) {
//     var div = document.createElement("div");
//     var h2_medication_name = document.createElement("h2");
//     var h2_due_time = document.createElement("p");
//     div.className = 'reminders'
//     h2_medication_name.setAttribute('style', "font-weight: bold")
//     h2_medication_name.innerHTML = contents.medName
//     h2_due_time.setAttribute('style', 'margin-top:10px')
//     h2_due_time.innerHTML = `Your ${contents.medName} is due at <strong>${contents.firstIntake.substr(0,contents.firstIntake.lastIndexOf(':'))}</strong>`
//     div.appendChild(h2_medication_name)
//     div.appendChild(h2_due_time)
//     const reminderBox = document.querySelector(".reminderBox")
//     reminderBox.appendChild(div);
//     var index = contentArray.indexOf(contents)
//     if (Notification.permission !== "denied") {
//         Notification.requestPermission();
//     }
//     var timeGap=contents.reminderTime/60
//     var originalhour=parseInt(contents.firstIntake.split(':')[0])
//     var originalMinute=parseInt(contents.firstIntake.split(":")[1])
//     // console.log(originalhour+" "+originalMinute)
//     var frequency = contents.frequency;
//     var variable = setInterval(() => {
//         if (frequency != 0) {
//             const notification = new Notification("New Notification From MedBuddy!", {
//                 body: `Its Time to Take ${contents.medName}`
//             })
//             frequency--;
//             originalhour+=parseInt(timeGap/60)
//             originalMinute+=parseInt(timeGap%60)
//             const d = new Date();
//             d.setMinutes(originalMinute);
//             d.setHours(originalhour);
//             var help=d.toLocaleTimeString();
//             help=help.substr(0,help.lastIndexOf(":"))
//             h2_due_time.innerHTML = `Your ${contents.medName} is due at <strong>${help}</strong>`
//         }
//         else {
//             clearInterval(variable);
//         }
//     }, contents.reminderTime * 1000);
// }

// document.querySelector("#SearchBox").addEventListener("input", () => {
//     let inputValue = document.querySelector("#SearchBox").value
//     let remindersArray = document.getElementsByClassName('reminders');
//     Array.from(remindersArray).forEach((element) => {
//         let medName = element.getElementsByTagName("h2")[0].innerText;
//         if (medName.includes(inputValue)) {
//             element.style.display = "block";
//         }
//         else {
//             element.style.display = "none";
//         }
//     })
// })
