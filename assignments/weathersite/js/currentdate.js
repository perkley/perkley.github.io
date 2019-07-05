// Get the current date and display
document.getElementById("curr-date").innerHTML = getCurrDate();

function getCurrDate() {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var today  = new Date();
    //Example Output Format: Monday, 6 April 2020
    var dateOutput = daysOfWeek[today.getDay()] + ', ' + today.getDate() + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear();

    return dateOutput;
}
