var bgpage = chrome.extension.getBackgroundPage();

// ====================================================================== EVENTS 

document.addEventListener("DOMContentLoaded", function() {
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
function refreshTimer(){
  seconds_left = bgpage.user_timer_seconds

  var min = Math.floor(seconds_left/60);
  var sec = seconds_left - (min*60);
  if (sec < 10) { sec = "0" + sec; }
  var msg = min.toString()+":"+sec;

  var timeDisplay = document.getElementById("time");
  timeDisplay.innerHTML = msg;

}

function refreshDisplay(){

  if(!bgpage.is_vibing){
    refreshTimer();

    if( (bgpage.is_vibing == true) ){
      check_in();
    }

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
}

function landtoform(){
  changePage("form")
}

function changePage(showID){
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
  bgpage.set_is_timing(false)
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
    bgpage.pause();
}

function resumeTimer(){
    // hide("time_resume");
    // show("time_pause");
    bgpage.resume();
    refreshDisplay();
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

  if(bgpage.vibe == "sad"){ 
    document.getElementById("help-meh-content").style.display = "none";
    document.getElementById("help-hap-content").style.display = "none";
    document.getElementById("help-sad-content").style.display = "inline";
    sad_help(); 
  }

  if(bgpage.vibe == "meh"){ 
    document.getElementById("help-sad-content").style.display = "none";
    document.getElementById("help-hap-content").style.display = "none";
    document.getElementById("help-meh-content").style.display = "inline";
    meh_help(); 
  }

  if(bgpage.vibe == "hap"){ 
    document.getElementById("help-sad-content").style.display = "none";
    document.getElementById("help-meh-content").style.display = "none";
    document.getElementById("help-hap-content").style.display = "inline";
    hap_page(); 
  }
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

function meh_help() {
  var mehHTML = '';

  mehText = "Sorry things aren't going as good as they could be. " +  
            "Hopefully this break gives you a chance to reset. " + 
            "In fact, a great way to reset is by doing some meditation. " +
            "<br><br>Let your mind clear and body relax. Focus on your breathing. " + 
            "In through your nose. Out through your mouth. " + 
            "Do that a couple times and you will feel refreshed and ready to take on whatever's next." + 
            "<br><br>Try listening to this Spotify playlist while on your break! <br><br>";

  mehTextStyle = "<div class='uk-text-center uk-text-default uk-text-secondary'>" + mehText + "</div>";
  iframeHTML = "<iframe src='https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u?utm_source=generator' width='100%' height='250' frameBorder='0' allowfullscreen='' allow= 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' style='border-radius: 10px;'></iframe>";
  
  mehHTML += mehTextStyle; 
  mehHTML += iframeHTML;

  help_div_id = document.getElementById('help-meh-content').innerHTML = mehHTML;
}

function sad_help(){
  var sadHTML = "";

  // document.getElementById("innerline").innerHTML = 
  sadText = 
    "When you have a negative study session, its important to remember that your mental " +
    "health comes first and foremost, even above school work."+ 
    "<br><br> Remember to stay hydrated and " +
    "well-fed, and to go outside often to feel the sun on your feathers! " + 
    "Since your having a bit of a rough time today, let me share my favorite " +
    "resources to help me stay focused and mentally healthy! " +
    "<br><br>" +
    "<a href='https://www.crisistextline.org/'>If you need someone to talk to</a>" +
    "<br><br>" +
    "<a href='https://www.google.com/drive/'>If you need help organizing</a>" +
    "<br><br>" +
    "<a href='https://www.santacruz.org/things-to-do/parks/'>If you want to get in some me-time outdoors</a>";

  sadTextStyle = "<div class='uk-text-center uk-text-default uk-text-secondary'> " + sadText + "</div>";

  sadHTML += sadTextStyle;
  document.getElementById("help-sad-content").innerHTML = sadHTML;
}

// need to make buttons and listeners for this
function return_time(){
  bgpage.set_is_vibing(false); 
  bgpage.set_is_study(false);
  bgpage.set_is_timing(true);
  changePage("time_page");
  bgpage.set_alarm(bgpage.is_study);
}

// need to make buttons and listeners for this
function return_land(){
  bgpage.set_is_vibing(false);
  bgpage.kill_alarm();
  changePage("land");
}
