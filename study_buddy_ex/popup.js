var bgpage = chrome.extension.getBackgroundPage();

var started = false;
is_working = true;
work_tim = 5;
break_min = 10;

vibe = null;


// document.getElementById("bad").addEventListener("click", vibe_check);
document.addEventListener("DOMContentLoaded", function() {
  // var port = chrome.runtime.connect();

  // document.getElementById("bad").onclick    = function(){vibe_check(1)};
  // document.getElementById("poor").onclick   = function(){vibe_check(2)};
  // document.getElementById("decent").onclick = function(){vibe_check(3)};
  // document.getElementById("okay").onclick   = function(){vibe_check(4)};
  // document.getElementById("great").onclick  = function(){vibe_check(5)};

  const ev = document.getElementById("time_start");
  ev.addEventListener("click", init_timers, false);

  refreshDisplay();
});

function vibe_check(v){
  // get form from html
  // pass into function
  // if statements
  // 1 -- bad
  // 5 -- great
  vibe = v;
  console.log(vibe)
}

function init_timers(){
  bgpage.set_work_duration(20)
  bgpage.set_break_duration(10)
  start_timer();
}

function start_timer(){
  bgpage.set_alarm(is_working);
  // if(is_working){ bgpage.set_alarm(bgpage.work_duration  * 1000);}
  // else          { bgpage.set_alarm(bgpage.break_duration * 1000);}
  refreshDisplay();
}

// function hide(section){
//     document.getElementById(section).style.display = "none";
// }

function refresh_timer(){
  seconds_left = bgpage.user_timer_seconds

  var min = Math.floor(seconds_left/60);
  var sec = seconds_left - (min*60);
  if (sec < 10) { sec = "0" + sec; }
  var msg = min.toString()+":"+sec;

  var timeDisplay = document.getElementById("time");
  timeDisplay.innerHTML = msg;

  refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);

  if(bgpage.is_working == true){        document.getElementById("iswork").innerHTML = "Study Time"; }
  else if(bgpage.is_working == false) { document.getElementById("iswork").innerHTML = "Break Time"; }

}

function refreshDisplay(){
  refresh_timer();

}
