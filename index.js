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
button.onclick = function () {
  // console.log(input.value);
  submit("https://d3xufznng8.execute-api.ap-south-1.amazonaws.com/dev/subscribe", input.value);
};
async function submit(url, val) {
  const data = { email: val };
  if (ValidateEmail(input.value)) {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify(data),
    }).then((res) => {
      // console.log(res);
        form.classList.add("d-none");
        msg.classList.remove("d-none");
    }).catch(err=>{
      form.classList.add("d-none");
      msg.classList.remove("d-none");
  });
  }
}
