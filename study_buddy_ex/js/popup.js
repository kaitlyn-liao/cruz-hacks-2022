var bgpage = chrome.extension.getBackgroundPage();

// ====================================================================== EVENTS 

document.addEventListener("DOMContentLoaded", function() {
  // alert("init");
  ev = document.getElementById("time_start");  ev.addEventListener("click", initTimer, false);
  ev = document.getElementById("time_end");    ev.addEventListener("click", handle_kill, false);
  ev = document.getElementById("time_resume"); ev.addEventListener("click", resumeTimer, false);
  ev = document.getElementById("time_pause");  ev.addEventListener("click", pauseTimer, false);
  ev = document.getElementById("land-start");  ev.addEventListener("click", landtoform, false);

  ev = document.getElementById("vibe-sad");   ev.addEventListener("click", vibe_answer_sad, false);
  ev = document.getElementById("vibe-meh");   ev.addEventListener("click", vibe_answer_meh, false);
  ev = document.getElementById("vibe-hap");   ev.addEventListener("click", vibe_answer_hap, false);

  ev = document.getElementById("time_land");  ev.addEventListener("click", return_land, false);
  ev = document.getElementById("time_break"); ev.addEventListener("click", return_time, false);

  // refreshDisplay();
  if(bgpage.showpageID != ""){
    changePage(bgpage.showpageID);
  }
});

// ====================================================================== DISPLAY 

function refreshDisplay(){

  if(!bgpage.is_vibing){
    refreshTimer();

    if( (document.getElementById("time").innerHTML == "0:00") && (bgpage.is_vibing == true) ){
      check_in();
    }
    // var timeDisplay = document.getElementById("time");
    // timeDisplay.innerHTML = msg;

    if(bgpage.is_study == true)       { document.getElementById("is_work").innerHTML = "Study Time"; }
    else if(bgpage.is_study == false) { document.getElementById("is_work").innerHTML = "Break Time"; }
    if(bgpage.is_timing == false)     { document.getElementById("is_work").innerHTML = "No Timer Set";}

    refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);
  }
  // any other common displays we need to update
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
  document.getElementById(id).style.display = "inline";
  if(id == "help"){
    vibe_answer(bgpage.vibe);
  }
}

function landtoform(){
  changePage("form")
}

function changePage(showID){
  // alert("in change page " + showID);
  hide("land");
  hide("form");
  hide("time_page");
  hide("vibe");
  hide("help")

  bgpage.set_showpageID(showID);
  show(showID);
  refreshDisplay();
}

// ====================================================================== TIMERS
is_working = true;
var work_sec;
var break_sec;
var curr_page;

function initTimer(){
  // work_sec = 10;
  // break_sec = 5;
  work_sec = document.getElementById('study-intv').value * 60;
  break_sec = document.getElementById('break-intv').value * 60;

  bgpage.set_work_duration(work_sec);
  bgpage.set_break_duration(break_sec);

  changePage("time_page");
  startTimer();
}

function startTimer(){
  bgpage.set_alarm(true);
  refreshDisplay();
}

function handle_kill(){
  changePage("vibe");
}

function killTimer(){
  bgpage.kill_alarm();
  bgpage.set_is_vibing(true);
  refreshDisplay();
}

function pauseTimer(){
    clearTimeout(refreshDisplayTimeout);
    // hide("time_pause");
    // show("time_resume");
    bgpage.pause();
}

function resumeTimer(){
    // hide("time_resume");
    // show("time_pause");
    bgpage.resume();
    refreshDisplay();
}

function refreshTimer(){
  seconds_left = bgpage.user_timer_seconds

  var min = Math.floor(seconds_left/60);
  var sec = seconds_left - (min*60);
  if (sec < 10) { sec = "0" + sec; }
  var msg = min.toString()+":"+sec;

  var timeDisplay = document.getElementById("time");
  timeDisplay.innerHTML = msg;

}

// =================================== VIBE CHECK
vibe = null;

function check_in(){
  bgpage.set_is_vibing(true);
  changePage("vibe");
}

function vibe_answer_sad(){ changePage("help"); vibe_answer("sad"); }
function vibe_answer_meh(){ changePage("help"); vibe_answer("meh"); }
function vibe_answer_hap(){ changePage("help"); vibe_answer("hap"); }

function vibe_answer(v){
  bgpage.set_vibe(v);

  if(bgpage.vibe == "sad"){ alert("sad"); }
  if(bgpage.vibe == "meh"){ alert("meh"); }
  if(bgpage.vibe == "hap"){ hap_page(); }
  
  // display next page and associated buttons to move on
}

function hap_page(){
  var hapHTML = "";

  // document.getElementById("innerline").innerHTML = 
  corgiIMG = "<img id='corgi' style='border-radius: 10px;' src='./img/corgi.png'/>"
  hapText = 
    "I'm so glad your study session is going well! " +
    "Remember that productivity isn't whats important, mentally HEALTHY productivity is! <br><br>" +
    "Take this break to grab a snack, refill your water bottle, and take a lap around the house. " +
    "All of these tasks are a great way to keep your energy and your mood up, and avoid getting bogged down. " +
    "<br><br>To congratulate your positive work, here's a corgi!<br><br>" +
    corgiIMG + 
    "<br><br>You're doing so well! Don't cluck up now!";
  hapTextStyle = "<div class='uk-text-center uk-text-default uk-text-secondary'> " + hapText + "</div>";

  hapHTML += hapTextStyle;
  document.getElementById("help-hap-content").innerHTML = hapHTML;


}

// need to make buttons and listeners for this
function return_time(){
  changePage("time_page");
  bgpage.set_is_vibing(false);
  bgpage.set_is_study(false);
  bgpage.set_alarm(bgpage.is_study);
}

// need to make buttons and listeners for this
function return_land(){
  bgpage.set_is_vibing(false);
  bgpage.kill_alarm();
  changePage("land");
}