const socket = io();

const messageTemplate = document.querySelector("#msg-template").innerHTML;

const messages = document.querySelector("#messages");

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, { message });

  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("newConnection", (msg) => {
  console.log(msg);
});

const $messageForm = document.querySelector("#msg-form");

const $messageInput = $messageForm.querySelector("input");

const $messageButton = $messageForm.querySelector("button");

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageButton.setAttribute("disabled", "disabled");

  let message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (ack, error) => {
    if (error) {
      return console.log(error.message);
    }

    console.log(ack);
  });

  $messageButton.removeAttribute("disabled");

  e.target.elements.message.value = "";

  $messageInput.focus();
});

const $locationButton = document.querySelector("#location");

$locationButton.addEventListener("click", () => {
  $locationButton.setAttribute("disabled", "disabled");

  if (!navigator.geolocation) {
    return alert("your browser does not supported geo location");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;

    const lon = position.coords.longitude;

    socket.emit("location", lat, lon, (ack, error) => {
      if (error) {
        return console.log(error.message);
      }

      console.log(ack);
    });

    $locationButton.removeAttribute("disabled");
  });
});
