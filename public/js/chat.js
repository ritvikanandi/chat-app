const socket = io();
//Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#location-send");

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //disable
  $messageFormButton.setAttribute("disabled", "disabled");
  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    //enable
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("The message was sent!");
  });
});

document.querySelector("#location-send").addEventListener("click", () => {
  //disable
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported in your browser");
  }
  $sendLocationButton.setAttribute("disabled", "disabled");
  //location event
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    //enable
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared excellent!");
        $sendLocationButton.removeAttribute("disabled");
      }
    );
  });
});
