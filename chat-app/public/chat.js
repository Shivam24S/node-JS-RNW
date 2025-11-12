const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  // Ensure there are messages
  const $newMessage = $messages.lastElementChild;
  if (!$newMessage) return;

  // Get height of the new message
  const newMessageStyle = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of message container
  const containerHeight = $messages.scrollHeight;

  // How far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  // Auto-scroll if we're at the bottom
  if (containerHeight - newMessageHeight <= scrollOffset + 1) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.emit("join", { username, room }, (err) => {
  if (err) {
    alert(err);
    location.href = "/";
  }
});

console.log("room", username, room);

const messageTemplate = document.querySelector("#msg-template").innerHTML;

const messages = document.querySelector("#messages");

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm:a"),
  });

  messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

const locationTemplate = document.querySelector("#location-template").innerHTML;

const locationMessage = document.querySelector("#location-msg");

socket.on("location", (url) => {
  const html = Mustache.render(locationTemplate, {
    username: url.username,
    url: url.url,
    createdAt: moment(url.createdAt).format("h:mm:a"),
  });

  locationMessage.insertAdjacentHTML("beforeend", html);
  autoScroll();
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

const $sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render($sidebarTemplate, { room, users });

  console.log("roooom", room, users);

  document.querySelector("#sidebar").innerHTML = html;
});
