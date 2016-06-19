// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed
*/
// 1. Link to Firebase
var trainData = new Firebase("https://patheticspecimenapp.firebaseio.com/");

// 2. Button for adding Employees
$("#addTrainBtn").on("click", function() {

    // Grabs user input
    var trnName = $("#trainNameInput").val().trim();
    var trnDes = $("#destinationInput").val().trim();
    var trnTime = moment($("#timeInput").val().trim(), "HH/MM/SS").format("X");
    var trnfreq = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrn = {
        train: trnName,
        destination: trnDes,
        firstTrain: trnTime,
        trainFrequency: trnfreq
    }

    // Uploads employee data to the database
    trainData.push(newTrn);

    // Logs everything to console
    console.log(newTrn.train);
    console.log(newTrn.destination);
    console.log(newTrn.firstTrain);
    console.log(newTrn.trainFrequency)

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

    // Prevents moving to new page
    return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDes = childSnapshot.val().destination;
    var trnTime = childSnapshot.val().time;
    var trnfreq = childSnapshot.val().frequency;

    // Employee Info
    console.log(trnName);
    console.log(trnDes);
    console.log(trnTime);
    console.log(trnfreq);

    // Prettify the employee start
    var trnStartPretty = moment.unix(trnTime).format("HH/MM/SS");
    // Calculate the months worked using hardconre math
    // To calculate the months worked
    var nxtArrival = moment().diff(moment.unix(trnTime, 'X'), "arrival");
    console.log(nxtArrival);

    // Calculate the total billed rate
    var milesAway = nxtArrival * trnfreq;
    console.log(milesAway);

    // Add each train's data into the table
    $("#employeeTable > tbody").append("<tr><td>" + trnName + 
    	"</td><td>" + trnDes + "</td><td>" 
    	+ trnStartPretty + "</td><td>" + nxtArrival + 
    	"</td><td>" + trnfreq + "</td><td>" + milesAway + 
    	"</td></tr>");

    var tableRow = $("<tr>");
    var tableData1 = $("<td>");
    tableData1.html(trnName);
    var tableData2 = $("<td>");
    tableData2.html(trnDes);
    var tableData3 = $("<td>");
    var tableData4 = $("<td>");
    tableRow.append(tableData1);
    tableRow.append(tableData2);
    tableRow.append(tableData3);
    tableRow.append(tableData4);
    $("#trainTable > tbody").append(tableRow);

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
