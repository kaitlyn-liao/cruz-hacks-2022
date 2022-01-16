var bgpage = chrome.extension.getBackgroundPage();

// ====================================================================== EVENTS 

document.addEventListener("DOMContentLoaded", function() {
  ev = document.getElementById("time_start");  ev.addEventListener("click", initTimer, false);
  ev = document.getElementById("time_end");    ev.addEventListener("click", killTimer, false);
  ev = document.getElementById("time_resume"); ev.addEventListener("click", resumeTimer, false);
  ev = document.getElementById("time_pause");  ev.addEventListener("click", pauseTimer, false);

  refreshDisplay();
});

// ====================================================================== DISPLAY 

function refreshDisplay(){
  refreshTimer();
  // any other common displays we need to update
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
  document.getElementById(id).style.display = "inline";
}

// ====================================================================== TIMERS
is_working = true;
work_sec = 20;
break_sec = 10;

function initTimer(){
  bgpage.set_work_duration(work_sec)
  bgpage.set_break_duration(break_sec)
  startTimer();
}

function startTimer(){
  bgpage.set_alarm(is_working);
  refreshDisplay();
}

function killTimer(){
  bgpage.kill_alarm();
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

  refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);

  if(bgpage.is_working == true){ document.getElementById("iswork").innerHTML = "Study Time"; }
  else if(bgpage.is_working == false) { document.getElementById("iswork").innerHTML = "Break Time"; }

}

// =================================== VIBE CHECK
vibe = null;

function vibe_check(v){
  // get form from html
  // pass into function
  // if statements
  // 1 -- bad
  // 5 -- great
  vibe = v;
  console.log(vibe)
}

