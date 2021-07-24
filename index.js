function ValidateEmail(mail) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
var input = document.getElementById("email-input");
var button = document.getElementById("submit");
var form = document.getElementById("form");
var msg = document.getElementById("msg");
var play = document.getElementById("play-btn");
var pause = document.getElementById("pause-btn");
var video = document.getElementById("video");
video.onmouseenter = function () {
  if (video.paused) {
    play.style.display = "block";
  } else {
    pause.style.display = "block";
  }
};
video.onmouseleave = function () {
  if (!video.paused) {
    play.style.display = "none";
    pause.style.display = "none";
  }
};
video.addEventListener("play", function (param) {
  play.style.display = "none";
  pause.style.display = "block";
  submitAnalytics(
    "https://20ggvemxo1.execute-api.ap-south-1.amazonaws.com/dev/analytics",
    {eventName:'BetaVideoPlay'}
  );
  console.log('play triggered',param);
});
video.addEventListener("pause", function (param) {
  play.style.display = "block";
  pause.style.display = "none";
  console.log('pause triggered',param);
});
// video.addEventListener("playing", function (param) {
//   console.log('playing triggered',param);
// });
let videProgress=0;
// video.addEventListener("progress", function (param) {
//   const {currentTime, duration} =param.target;
//   videProgress= ((currentTime*100)/duration);
//   // console.log('videProgress',Math.floor(videProgress%25));
//   if((Math.floor(videProgress%25)===0)){
//     console.log('progress triggered',param.target.currentTime, param.target.duration, videProgress);
//   }
// });
video.addEventListener("ended", function (param) {
  // console.log('ended triggered',param);
  submitAnalytics(
    "https://20ggvemxo1.execute-api.ap-south-1.amazonaws.com/dev/analytics",
    {eventName:'BetaVideoEnded'}
  );
});
play.addEventListener("click", function () {
  video.play();
  play.style.display = "none";
});
pause.addEventListener("click", function () {
  video.pause();
});
button.onclick = function () {
  // console.log(input.value);
  submit(
    "https://20ggvemxo1.execute-api.ap-south-1.amazonaws.com/dev/subscribe",
    input.value
  );
};
async function submit(url, val) {
  const data = { email: val };
  if (ValidateEmail(input.value)) {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log(res);
        form.classList.add("d-none");
        msg.classList.remove("d-none");
      })
      .catch((err) => {
        form.classList.add("d-none");
        msg.classList.remove("d-none");
      });
  }
}
async function submitAnalytics(url, data){
  
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log(res);
        form.classList.add("d-none");
        msg.classList.remove("d-none");
      })
      .catch((err) => {
        form.classList.add("d-none");
        msg.classList.remove("d-none");
      });
}
