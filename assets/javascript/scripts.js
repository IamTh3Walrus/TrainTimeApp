$(document).ready(function(){

var url = 'https://patheticspecimenapp.firebaseio.com/'
var dataRef = new Firebase(url);

var train = "";
var destination = "";
var trainTime = 0;
var frequency = "";

$("#addTrain").on("click", function() {
	
	train = $('#trainName').val().trim();
	destination = $('#destinationLoc').val().trim();
	trainTime = $('#firstTrain').val().trim();
	frequency = $('#frequency1').val().trim();
	
	dataRef.push({
		train: train,
		destination: destination,
		trainTime: trainTime,
		frequency: frequency,
		dateAdded: Firebase.ServerValue.TIMESTAMP
	})
	
	return false;
});

dataRef.on("child_added", function(childSnapshot) {
	$('#trainTable').append("<div class='well'><span id='train'> "
		+childSnapshot.val().train+" </span><span id='train'> "+
		childSnapshot.val().destination+" </span><span id='destination'> "+
		childSnapshot.val().trainTime+" </span><span id='trainTime'> "+
		childSnapshot.val().frequency+" </span><span id='frequency'>")

		console.log(childSnapshot.val().train);
		console.log(childSnapshot.val().destination);
		console.log(childSnapshot.val().trainTime);
		console.log(childSnapshot.val().frequency);
		
	
}, function(errorObject){
	
});
dataRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
	
	$("#traindisplay").html(snapshot.val().name);
	$("#destinationdisplay").html(snapshot.val().email);
	$("#trainTimedisplay").html(snapshot.val().age);
	$("#frequencydisplay").html(snapshot.val().comment);
})

});