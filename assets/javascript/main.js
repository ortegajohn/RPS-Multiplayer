
var config = {
  apiKey: "AIzaSyAQuMQAGB_x2L8OgJbxnoFAn9OpNraiCrg",
  authDomain: "rps-multiplayer-4d3ea.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-4d3ea.firebaseio.com",
  projectId: "rps-multiplayer-4d3ea",
  storageBucket: "rps-multiplayer-4d3ea.appspot.com",
  messagingSenderId: "105722903600"
};


//start firebase
firebase.initializeApp(config);

var p1_selected = false
var p2_selected = false

var database = firebase.database();
// var initialValue = 100;
// var clickCounter = initialValue;

var p1wins = 0;
var ties = 0;
var p2wins = 0;

var playername;
var p_num;
var p1_val
var p2_val


// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");
var turn_db = firebase.database().ref();
var p_ref = firebase.database().ref("player");
var p1_db = firebase.database().ref("player/1");
var p2_db = firebase.database().ref("player/2");
var p1db = firebase.database().ref("player1");
var p2db = firebase.database().ref("player2");
var tiesdb = firebase.database().ref("ties");
var game = firebase.database().ref("game");


// Firebase connection listener
connectedRef.on("value", function(snap) {
	if(snap.val()) {
		var user = connectionsRef.push(true);
		userKey = user.getKey();
		user.onDisconnect().remove();
	}
});


$(document).on("click", "#select_p1", function (e) {
  p2db.update({
    wins: 0
  });
  p1db.update({
    wins: 0
  });
  database.ref("ties").update({
    ties: 0
  });
  game.update({
    p1:"yes",
    p2:"yes"
  })

});


$(document).on("click", "#select_p2", function (e) {
  p2db.update({
    wins: 0
  });
  p1db.update({
    wins: 0
  });
  database.ref("ties").update({
    ties: 0
  });
  game.update({
    p1:"yes",
    p2:"yes"
  })

});

function display_ops(num){
  var a = $('<div>')
  a.append(`<div class="option" id="p${num}_rps_rock">rock</div>
  <div class="option" id="p${num}_rps_paper">paper</div>
  <div class="option" id="p${num}_rps_scissors">scissors</div>`)
  $(".p"+num+"_rps_options").append(a)
}





$(document).on("click", "#p1_rps_rock", function (e) {
  // e.preventDefault(); 
  var x1 = $(this).text()
  // console.log("e: ", x1)
  database.ref("player1").update({
    player1_pick: x1,
    pick: true
  });
  $(".player1_selection").text("Player 1 Selected: " + x1)
  hide_p1()
});

$(document).on("click", "#p1_rps_paper", function (e) {
  // e.preventDefault(); 
  var x1 = $(this).text()
  // console.log("e: ", x1)
  database.ref("player1").update({
    player1_pick: x1,
    pick: true
  });
  $(".player1_selection").text("Player 1 Selected: " + x1)
  hide_p1()
});


$(document).on("click", "#p1_rps_scissors", function (e) {
  // e.preventDefault(); 
  var x1 = $(this).text()
  // console.log("e: ", x1)

  database.ref("player1").update({
    player1_pick: x1,
    pick: true
  });
  $(".player1_selection").text("Player 1 Selected: " + x1)
  hide_p1()
});


$(document).on("click", "#p2_rps_rock", function (e) {
  // e.preventDefault(); 
  var x1 = $(this).text()
  // console.log("e: ", x1)
  database.ref("player2").update({
    player2_pick: x1,
    pick: true
  });
  $(".player2_selection").text("Player 2 Selected: " + x1)
  hide_p2()
});

$(document).on("click", "#p2_rps_paper", function (e) {
  // e.preventDefault(); 
  var x1 = $(this).text()
  // console.log("e: ", x1)
  database.ref("player2").update({
    player2_pick: x1,
    pick: true
  });
  $(".player2_selection").text("Player 2 Selected: " + x1)
  hide_p2()
});


$(document).on("click", "#p2_rps_scissors", function (e) {
  // e.preventDefault(); 
  var x1 = $(this).text()
  // console.log("e: ", x1)
  database.ref("player2").update({
    player2_pick: x1,
    pick: true
  });
  $(".player2_selection").text("Player 2 Selected: " + x1)
  hide_p2()
});

function hide_p1() {
  // $(".p1_rps_options").hide()
  $(".p1_rps_options").text("")
  p1_selected = true;
  check_ready()
  game.update({
    p1:"no"    
  })
}
function hide_p2() {
  // $(".p2_rps_options").hide()
  $(".p2_rps_options").text("")
  p2_selected = true;
  check_ready()
  game.update({
    p2:"no"
  })
}
function show_p1() {
  // $(".p1_rps_options").show()
  display_ops(1)
  // p1_selected = true;
  check_ready()

}
function show_p2() {
  // $(".p2_rps_options").show()
  display_ops(2)
  // p2_selected = true;
  check_ready()
}

function check_firebase(){

  p2db.child("pick").on("value", function(snap) {
    p2_val = snap.val()

  });
  // console.log("p2_val: ",p2_val)
  p1db.child("pick").on("value", function(snap) {
    p1_val = snap.val()

  });
  // console.log("p1_val: ",p1_val)

}

database.ref().on('child_changed',function(childSnapshot){
  // console.log("child_added childSnapshot: ",childSnapshot)
  // console.log('child_changed: ',childSnapshot )
  check_firebase()

  update_score()

  var a 
  var b
  game.child("p1").on("value", function(snap) {
    a = snap.val()
  });
  game.child("p2").on("value", function(snap) {
    b = snap.val()
  });
  if(a==="no" && b==="no"){
    game.update({
      p1:"yes",
      p2:"yes"

    });


    var p1wins 
    var p2wins
    var t
    p1db.child("wins").on("value", function(snap) {
      p1wins = snap.val()
    });
    p2db.child("wins").on("value", function(snap) {
      p2wins = snap.val()
    });+
    tiesdb.child("ties").on("value", function(snap) {
      t = snap.val()
    });

    var sum = parseInt(p1wins)+parseInt(p2wins)+parseInt(t)



  var c 
  var d
  p1db.child("player1_pick").on("value", function(snap) {
    c = snap.val()
  });
  p2db.child("player2_pick").on("value", function(snap) {
    d = snap.val()
  });
  console.log("c d ",c ,d)
$(".selection").text("")

$(".turn_update").text("Turn: "+sum+" | Player 1 Selected "+c+" Player 2 Selected "+d+" | "+get_winner_return(c, d))


    show_p1()
    show_p2()
    clear_picks()
  }  

});

function check_ready() {


  if (p1_val && p2_val) {
    p1_val = false
    p2_val = false
    // console.log("p1 and p2 ready")
    p2db.update({
      pick: false
    });
    p1db.update({
      pick: false
    });
    check_firebase()

    // //incase of multiple children use forEach
    // var p2 = database.ref("player2");
    // p2.on('value', function (snapshot) {
    //   snapshot.forEach(function (childSnapshot) {
    //     p2_val = childSnapshot.val();
    //     // console.log("player2: ", p2_val)
    //   });
    // });

    p2db.child("player2_pick").on("value", function(snap) {
      p2_val = snap.val()
    });
 
    //dot noation example to get the value
    var p1 = database.ref("player1");
    p1.on('value', function (snapshot) {
      // console.log("snapshot.node_.children_.root_.value.value_: ", snapshot.node_.children_.root_.value.value_)
      // snapshot.forEach(function (childSnapshot) {
      p1_val = snapshot.node_.children_.root_.value.value_;
      // var childData = childSnapshot.val();        
      // console.log("player1: ", p1_val)
      // console.log("childSnapshot.node_.value_: ",childSnapshot.node_.value_)
      // });
    });
    // console.log("pick p1_val: ",p1_val)
    // console.log("pick p2_val: ",p2_val)
    get_winner(p1_val, p2_val)
    
    // show_p1()
    // show_p2()
  }
}

function clear_picks(){
  p2db.update({
    player2_pick: ""
  });
  p1db.update({
    player1_pick: ""
  });
}


function update_score(){
var p1
var p2
var gameties
  p1db.child("wins").on("value", function(snap) {
    p1 = snap.val()
  });
  $("#p1_wins").text(p1)
  $("#p2_loses").text(p1)
  // console.log("p1: ",p1)

  p2db.child("wins").on("value", function(snap) {
    p2 = snap.val()
  });
  $("#p2_wins").text(p2)
  $("#p1_loses").text(p2)
  // console.log("p2: ",p2)

  tiesdb.child("ties").on("value", function(snap) {
    // console.log("snapties: ",snap)
    gameties = snap.val()
    // console.log("gameties: ",gameties)
  });

  $("#p1_ties").text(gameties)
  $("#p2_ties").text(gameties)
  // p1db.update({
  //   player1_pick: ""
  // });
  // p2db.update({
  //   player2_pick: ""
  // });
  
}

function get_winner(p1, p2) {



  if ((p1 === "rock") || (p1 === "paper") || (p1 === "scissors")) {

    if ((p1 === "rock" && p2 === "scissors") ||
      (p1 === "scissors" && p2 === "paper") ||
      (p1 === "paper" && p2 === "rock")) {
      p1wins++;
      p1db.update({
        wins: p1wins
      });
      
    } else if (p1 === p2) {
      ties++;
      tiesdb.update({
        ties: ties
      });
    } else {
      p2wins++;
      p2db.update({
        wins: p2wins
      });
    }
  }

// console.log("p1wins: ",p1wins)
// console.log("ties: ",ties)
// console.log("p2wins: ",p2wins)
}
function get_winner_return(p1, p2) {



  if ((p1 === "rock") || (p1 === "paper") || (p1 === "scissors")) {

    if ((p1 === "rock" && p2 === "scissors") ||
      (p1 === "scissors" && p2 === "paper") ||
      (p1 === "paper" && p2 === "rock")) {
        return "Player 1 WINS!"
    } else if (p1 === p2) {
      return "It's a TIE"
    } else {
      return "Player 2 WINS!"
    }
  }

}


$(document).on("click", "#select_p2", function (e) {
  
$("#select_p2").hide()

});

// $(document).on("click", "#select_p1", function (e) {
//   e.preventDefault();
//    $("#select_p1").hide()

// });
