is_working = false;
work_min = 60;
break_min = 10;
vibe = null;

// document.getElementById("bad").addEventListener("click", vibe_check);
window.onload = function () {

  // vibe check buttons
  document.getElementById("bad").onclick    = function(){vibe_check(1)};
  document.getElementById("poor").onclick   = function(){vibe_check(2)};
  document.getElementById("decent").onclick = function(){vibe_check(3)};
  document.getElementById("okay").onclick   = function(){vibe_check(4)};
  document.getElementById("great").onclick  = function(){vibe_check(5)};
}

function vibe_check(v){
  // get form from html
  // pass into function
  // if statements
  // 1 -- bad
  // 5 -- great
  vibe = v;
  console.log(vibe)
}

function timer_handler(){
  // take form inputs and store them into cache varibles
  // work_min = form.work
  // break_min = form.break 
}

function work_timer(){
  // start visible timer based off of user-set work timer saved in cache
  // update the timer in real time
  // when the timer ends, call vibe_check
  // when vibe_check ends, start break_timer 
}

function break_timer(){
  // start visible timer based off of user-set break timer saved in cache
  // update the timer in real time
  // when timer ends, call work timer
}