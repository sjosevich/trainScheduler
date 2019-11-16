$(document).ready(function(){


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC6ALXsZOvHxmL-AOt-CvN9L8XLZc3tCmY",
    authDomain: "train-schedule-294e0.firebaseapp.com",
    databaseURL: "https://train-schedule-294e0.firebaseio.com",
    projectId: "train-schedule-294e0",
    storageBucket: "train-schedule-294e0.appspot.com",
    messagingSenderId: "900306990609",
    appId: "1:900306990609:web:90fd4ccecb090ee4aee3b0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

    $("#form").submit(function(event){
        event.preventDefault();
        
        var trainName = $("#trainName").val().trim()
        var destination = $("#destination").val().trim()
        var firstTrainTime = $("#firstTrainTime").val().trim()
        var frequency = $("#frequency").val().trim()

        validateTrainNameField(trainName, event)


    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });



      database.ref().on('child_added', function(childSnapshot){
        // console.log(childSnapshot.val().trainName);
        // console.log(childSnapshot.val().destination);
        // console.log(childSnapshot.val().firstTrainTime);
        // console.log(childSnapshot.val().dateAdded);
        var newTrainName = childSnapshot.val().trainName
        var newDestination = childSnapshot.val().destination
        var newFirstTrainTime = childSnapshot.val().firstTrainTime
        var newFrequency = childSnapshot.val().frequency
       // var newDateAdded = (childSnapshot.val().dateAdded * 1000)
        
        
        var startTImeChangeFormat = moment(newFirstTrainTime, "hh:mm:ss")
        //console.log(moment(startTImeChangeFormat))
        var calcuateTimeDifference = moment().diff(moment(startTImeChangeFormat), "minutes" )
        //console.log(calcuateTimeDifference)
        var diffTime = calcuateTimeDifference  % newFrequency;
        //console.log(diffTime)
        var minLeft = newFrequency - diffTime
        //console.log(newFrequency+ "-" + diffTime + "=" + minLeft)
        nextTrain = moment().add(minLeft, "minutes")
        //console.log(nextTrain)
        var timeFormat = moment(nextTrain).format("HH:mm")

        $("#display-data").append(
            '<tr><td>' + newTrainName +
            '</td><td>' + newDestination +
            '</td><td>' + newFrequency +
            '</td><td>' + timeFormat + 
            '</td><td>' + calcuateTimeDifference * (-1) + '</td></tr>' 
        );
      }) 

    })
})


function validateTrainNameField(trainName, event){
        if (!isValidName(trainName)){
            //console.log(trainName)
            //$("#nameTraine-feedback").text("Please ente at leats two characters");
            event.preventDefault();
        }else{
            $("#nameTraine-feedback").text("");
        }
    }


function isValidName(trainName){
    //console.log(trainName)
    //var a = trainName.lenght
   // console.log(a)
    return trainName.lenght >= 2;
}    