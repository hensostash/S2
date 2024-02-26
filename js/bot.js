let input;
let transcript = "";
let fasterBotMessage = 1;
let currentUserID;
let newestPurchase = "";
let allPurchases = "";
let currentKnowledgeLevel;
let userPreference = "";
let recentPurchaseString = "";

function contactExperienceGPT() {
  let input = $("#userInput").val().trim();
  if (input !== "") {
    let messageWithTranscript = "";

    if (transcript !== "") {
      messageWithTranscript = transcript + "\n\n";
    }

    //if (iconElement.classList.contains("fa-toggle-on")) {

    // Status Icon Stuff
    let onlineTextElement = document.getElementById("onlineText");
    let isOnlineElement = document.getElementById("chatimage");

    // Change the text to "Ready"
    onlineTextElement.textContent = "hensoAI.thinking";
    // Remove the preparation animation
    isOnlineElement.style.animation = "none";

    // Apply the ready animation
    isOnlineElement.style.animation = "thinkingimg 2s linear infinite forwards";

    // Bot Query

    if (currentKnowledgeLevel === "1") {
      messageWithTranscript += "Now, a customer asked you: " + input;
      messageWithTranscript = cleanStringForSend(messageWithTranscript);

      $.ajax({
        type: "POST",
        url: "php/askgptmodel.php",
        data: { messageWithTranscript: messageWithTranscript }, // Send the updated message with transcript
        beforeSend: function () {
          console.log("GPT Call Context: " + messageWithTranscript);
          console.log("Token Limit " + messageWithTranscript.length + "/8.192");
          //Bar
          addMessage(input, "user-message");
          logMessage(input, "user-message");
          $("#userInput").val("");
          document.getElementById("userInput").disabled = true;
          document.getElementById("userInput").placeholder = "Thinking";
        },
        success: function (response) {
          if (response !== "No results found.") {
            //Send message to chat interface
            $(".typing-indicator").remove();
            transcript = messageWithTranscript + "\n " + response; // Update the transcript with user message and bot response
            addMessage(response, "bot-message");
            logMessage(response, "bot-message");
            //Change Status Icon
            onlineTextElement.textContent = "hensoAI.writing";
            isOnlineElement.style.animation = "none";
            isOnlineElement.style.animation =
              "writingimg 3s linear infinite forwards";
          } else {
            $(".typing-indicator").remove();
            onlineTextElement.textContent = "hensoAI.error";
            isOnlineElement.style.animation = "none";
            isOnlineElement.style.animation =
              "preparationimg 5s linear infinite forwards";
          }
        },
      });
    } else if (currentKnowledgeLevel === "2") {
      messageWithTranscript += recentPurchaseString;
      messageWithTranscript += "Now, a customer asked you: " + input;
      messageWithTranscript = cleanStringForSend(messageWithTranscript);
      $.ajax({
        type: "POST",
        url: "php/askgptmodel2.php",
        data: { messageWithTranscript: messageWithTranscript }, // Send the updated message with transcript
        beforeSend: function () {
          console.log("GPT Call Context: " + messageWithTranscript);
          console.log("Token Limit " + messageWithTranscript.length + "/8.192");
          //Bar
          addMessage(input, "user-message");
          logMessage(input, "user-message");
          $("#userInput").val("");
          document.getElementById("userInput").disabled = true;
          document.getElementById("userInput").placeholder = "Thinking";
        },
        success: function (response) {
          if (response !== "No results found.") {
            //Send message to chat interface
            $(".typing-indicator").remove();
            transcript = messageWithTranscript + "\n " + response; // Update the transcript with user message and bot response
            addMessage(response, "bot-message");
            logMessage(response, "bot-message");
            //Change Status Icon
            onlineTextElement.textContent = "hensoAI.writing";
            isOnlineElement.style.animation = "none";
            isOnlineElement.style.animation =
              "writingimg 3s linear infinite forwards";
          } else {
            $(".typing-indicator").remove();
            onlineTextElement.textContent = "hensoAI.error";
            isOnlineElement.style.animation = "none";
            isOnlineElement.style.animation =
              "preparationimg 5s linear infinite forwards";
          }
        },
      });
    } else if (currentKnowledgeLevel === "3") {
      messageWithTranscript += recentPurchaseString;
      messageWithTranscript += allPurchases;
      messageWithTranscript += userPreference;
      messageWithTranscript += "Now, a customer asked you: " + input;
      messageWithTranscript = cleanStringForSend(messageWithTranscript);
      $.ajax({
        type: "POST",
        url: "php/askgptmodel3.php",
        data: { messageWithTranscript: messageWithTranscript }, // Send the updated message with transcript
        beforeSend: function () {
          console.log("GPT Call Context: " + messageWithTranscript);
          console.log("Token Limit " + messageWithTranscript.length + "/8.192");
          //Bar
          addMessage(input, "user-message");
          logMessage(input, "user-message");
          $("#userInput").val("");
          document.getElementById("userInput").disabled = true;
          document.getElementById("userInput").placeholder = "Thinking";
        },
        success: function (response) {
          if (response !== "No results found.") {
            //Send message to chat interface
            $(".typing-indicator").remove();
            transcript = messageWithTranscript + "\n " + response; // Update the transcript with user message and bot response
            addMessage(response, "bot-message");
            logMessage(response, "bot-message");
            //Change Status Icon
            onlineTextElement.textContent = "hensoAI.writing";
            isOnlineElement.style.animation = "none";
            isOnlineElement.style.animation =
              "writingimg 3s linear infinite forwards";
          } else {
            $(".typing-indicator").remove();
            onlineTextElement.textContent = "hensoAI.error";
            isOnlineElement.style.animation = "none";
            isOnlineElement.style.animation =
              "preparationimg 5s linear infinite forwards";
          }
        },
      });
    }
  }
}

function cleanStringForSend(inputString) {
  return inputString.replace(/['"]/g, '');
}

//}
// JavaScript
function addMessage(message, className) {
  // Add Message to Database with timestamp addtime
  let chatbox = document.getElementById("chatbox");

  // Create a container div for the icon and message
  let container = document.createElement("div");
  container.className = "message-container " + className;

  if (className.includes("typing-indicator")) {
  } else {
    // Create and add the bot or user icon element
    let iconElement = document.createElement("img");
    if (className === "bot-message") {
      iconElement.className = "icon icon-bot";
      iconElement.src = "media/nikebot.png";
    } else if (className === "user-message") {
      iconElement.className = "icon icon-user";
      iconElement.src = "media/user.png";
    } else if (className === "change-message") {
    }
    container.appendChild(iconElement);
  }

  // Check if it's a typing indicator or bot-message
  if (className.includes("change-message")) {
    let changeMessageDiv = document.createElement("div");
    changeMessageDiv.className = "message " + className;
    changeMessageDiv.textContent = message; // Use the provided date and time here
    container.appendChild(changeMessageDiv);
  } else if (className === "bot-message") {
    // Create the message element with each letter animated
    let messageElement = document.createElement("p");
    messageElement.className = "message " + className;
    container.appendChild(messageElement);
    animateBotMessage(message, messageElement);
  } else {
    // Create the regular message element
    let messageElement = document.createElement("p");
    messageElement.className = "message " + className;
    messageElement.textContent = message;
    container.appendChild(messageElement);
  }

  chatbox.appendChild(container);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Helper function to animate bot message one letter at a time
function animateBotMessage(message, messageElement) {
  let index = 0;
  let speed = 0;
  if (fasterBotMessage === 1) {
    speed = 0;
  } else {
    speed = 50; // Adjust the speed of animation (milliseconds per letter)
  }
  document.getElementById("userInput").placeholder = "Writing";
  function displayLetter() {
    messageElement.textContent += message[index];
    index++;
    if (index < message.length) {
      setTimeout(displayLetter, speed);
      document.getElementById("chatbox").scrollTop = chatbox.scrollHeight;
    } else {
      document.getElementById("userInput").disabled = false;
      document.getElementById("userInput").placeholder =
        "Ask me a question here";
      document.getElementById("userInput").select();
      document.getElementById("onlineText").textContent = "hensoAI.ready";
      document.getElementById("chatimage").style.animation =
        "readyimg 5s linear infinite forwards";
    }
  }

  displayLetter();
}

$(document).ready(function () {
  $("#userInput").keypress(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      var input = $(this).val();
      if (input.trim() !== "") {
        contactExperienceGPT();
      }
    }
  });
});

window.onload = function () {
  animateAll();
  loadServerChat();
};



function setKnowledgeButtons() {
  currentKnowledgeLevel = "1";
  console.log("Knowledge " + currentKnowledgeLevel);
  document.getElementById("chatKnowledge1").style.color = "green";
  document.getElementById("userInput").disabled = true;
}

function animateAll() {
  setTimeout(function () {
    document.getElementById("chatimage").style.animation =
      "containerimageload 1.5s ease-in 1 forwards";
    document.getElementById("chathead").style.animation =
      "chatheadertextanimate 1s ease-in-out 1 forwards";
    testConnection();
  }, 1000);
  setTimeout(function () {
    document.getElementById("chatimage").style.animation = "none";
    document.getElementById("chatimage").style.opacity = 1;
  }, 2600);
  setTimeout(function () {
    document.getElementById("chatimage").style.animation =
      "preparationimg 5s linear infinite forwards";
  }, 2800);
}

function toChat(index) {
  const indexString = index.toString();
  if (indexString === currentKnowledgeLevel) {
    return;
  } else if (index === 1) {
    currentKnowledgeLevel = "1";
    document.getElementById("chatKnowledge1").style.color = "green";
    document.getElementById("chatKnowledge2").style.color = "black";
    document.getElementById("chatKnowledge3").style.color = "black";
    addMessage("Knowledge Level 1", "change-message");
    transcript = "";
  } else if (index === 2) {
    currentKnowledgeLevel = "2";
    document.getElementById("chatKnowledge1").style.color = "black";
    document.getElementById("chatKnowledge2").style.color = "green";
    document.getElementById("chatKnowledge3").style.color = "black";
    addMessage("Knowledge Level 2", "change-message");
    fetchData();
    transcript = "";
  } else if (index === 3) {
    currentKnowledgeLevel = "3";
    document.getElementById("chatKnowledge1").style.color = "black";
    document.getElementById("chatKnowledge2").style.color = "black";
    document.getElementById("chatKnowledge3").style.color = "green";
    addMessage("Knowledge Level 3", "change-message");
    fetchData();
    transcript = "";
  }
}

function testConnection() {
  let messageWithTranscript = "Hi!";
  $.ajax({
    type: "POST",
    url: "php/askgptmodel.php",
    data: { messageWithTranscript: messageWithTranscript }, // Send the updated message with transcript
    beforeSend: function () {
      console.log("Called LLM with: " + messageWithTranscript);
    },
    success: function (response) {
      connectionGood(response);
      document.getElementById("chatimage").style.animation = "none";
      setKnowledgeButtons();
    },
  });
}

function connectionGood(response) {
  console.log("LLM answered with: " + response);
  document.getElementById("onlineText").textContent = "hensoAI.ready";
  setTimeout(function () {
    document.getElementById("container").style.animation =
      "container 1.5s ease-in 1 forwards";
    document.getElementById("chatimage").style.animation =
      "chatimagefinish 0.7s ease-in-out 1 forwards";
    document.getElementById("chathead").style.animation =
      "chatheadfinish 1s ease-in-out 1 forwards";
  }, 1000);
  setTimeout(function () {
    document.getElementById("breaker").style.animation =
      "opacity1 1s ease-in-out 1 forwards";
    document.getElementById("chatimage").style.animation = "none";
    document.getElementById("chatimage").style.top = "5%";
  }, 3000);
  setTimeout(function () {
    document.getElementById("chatbox").style.animation =
      "opacity1 1s 0.5s ease-in-out 1 forwards";
    document.getElementById("chatimage").style.animation =
      "readyimg 5s linear infinite forwards";
    document.getElementById("chatKnowledge1").style.animation =
      "opacity1 1s 0.5s ease-in-out 1 forwards";
    document.getElementById("v-line1").style.animation =
      "opacity1 1s 0.75s ease-in-out 1 forwards";
    document.getElementById("chatKnowledge2").style.animation =
      "opacity1 1s 1s ease-in-out 1 forwards";
    document.getElementById("v-line2").style.animation =
      "opacity1 1s 1.25s ease-in-out 1 forwards";
    document.getElementById("chatKnowledge3").style.animation =
      "opacity1 1s 1.5s ease-in-out 1 forwards";
  }, 4000);
  setTimeout(function () {
    document.getElementById("chatcontainer").style.animation =
      "opacity1 1s ease-in-out 1 forwards";

    document.getElementById("userIDText").style.animation =
      "opacity1 1s ease-in-out 1 forwards";
    document.getElementById("userInput").placeholder = "Ask me a question here";
    document.getElementById("userInput").disabled = false;
    document.getElementById("userInput").select();
  }, 5000);
  setTimeout(function () {
    addMessage(response, "bot-message");
  }, 6000);
}

function loadServerChat() {
  currentUserID = sessionStorage.getItem("hensoAI.SessionStorage.UserID");

  if (currentUserID) {
    addMessage("Loaded Chat from User " + currentUserID, "change-message");
    fetch(`php/get_messages.php?userid=${currentUserID}`)
      .then((response) => response.json())
      .then((data) => {
        const groupedMessages = {}; // Group messages by timestamp

        data.forEach((messageData) => {
          const { message, sender, timestamp } = messageData;
          if (!groupedMessages.hasOwnProperty(timestamp)) {
            groupedMessages[timestamp] = [];
          }
          groupedMessages[timestamp].push({ message, sender });
        });

        // Use Object.entries to loop through grouped messages
        Object.entries(groupedMessages).forEach(([timestamp, messages]) => {
          addMessage(timestamp, "change-message"); // Add timestamp
          messages.forEach((messageObj) => {
            const { message, sender } = messageObj;
            addMessage(
              message,
              sender === "user" ? "user-message" : "bot-message"
            );
          });
        });
        fasterBotMessage = 0;
        console.log("Loaded Chat History from Database");
        // Execute other code after messages are loaded
        addTime(1);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  } else {
    currentUserID = Math.floor(Math.random() * 1001);
    console.log("Added UserID "+currentUserID+" to Database");
    sessionStorage.setItem("hensoAI.SessionStorage.UserID", currentUserID);
    addMessage("Chatting as new User " + currentUserID, "change-message");
    setUserID;
    console.log("No old Chat available!");
    addTime(1);
    setTimeout(() => {
      fasterBotMessage = 0;
    }, 500);
  }
}
function logMessage(message, messageClass) {
  currentUserID = sessionStorage.getItem("hensoAI.SessionStorage.UserID");
  if (currentUserID) {
    let sender = "";

    if (messageClass === "bot-message") {
      sender = "bot";
    } else if (messageClass === "user-message") {
      sender = "user";
    } else {
      console.error("Invalid messageClass");
      return;
    }

    let timestamp = "";

    if (messageClass === "bot-message" || messageClass === "user-message") {
      // Assuming you have a function addTime that returns a formatted timestamp string
      timestamp = addTime(2); // You can adjust the parameter as needed
    }

    // Escape the message content to prevent SQL injection
    const escapedMessage = message.replace(/'/g, "\\'");

    // Create the message object to be sent to the server
    const messageObj = {
      message: escapedMessage,
      sender: sender,
      userid: currentUserID,
      timestamp: timestamp,
    };

    fetch("php/insert_message.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    })
      .then((response) => response.json())
      .then((data) => {
        // Log success or handle response data as needed
        console.log("Message logged successfully:", data);
      })
      .catch((error) => {
        console.error("Error logging message:", error);
      });
  } else {
    console.log("No Chat logging. No User ID!");
  }
}

let timeLocker = 0;
let cachedTime = "";

function addTime(index) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the current date and time
  const currentDate = new Date();

  // Get the day of the week (0 - 6)
  const dayOfWeek = currentDate.getDay();

  // Get the hours (0 - 23) and minutes (0 - 59)
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12

  // Format the time
  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  // Combine weekday and time
  if (index === 2) {
    if (timeLocker === 0) {
      cachedTime = `${weekdays[dayOfWeek]} - ${formattedTime}`;
      timeLocker = 1;
      return cachedTime;
    } else {
      return cachedTime;
    }
  } else {
    const formattedDate = `${weekdays[dayOfWeek]} - Now`;
    addMessage(formattedDate, "change-message");
  }
}

function fetchData() {
  const url = "php/fetchUserInfo.php"; // Replace with the actual URL of your PHP script
  console.log("Fetching User Data for User " + currentUserID);
  const formData = new FormData();
  formData.append("currentUserID", currentUserID);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.recentPurchase) {
        recentPurchaseString = `Customers most recent purchase: "${data.recentPurchase.product_name}" at "${data.recentPurchase.purchase_date}". The package status is: "${data.recentPurchase.shipping_status}".`;
        newestPurchase = recentPurchaseString;
      } else {
        newestPurchase = "No recent purchase found.";
      }

      // Construct the allPurchases string
      if (data.productNames && data.productNames.length > 0) {
        allPurchases += data.productNames
          .map(
            (product) =>
              `Customer has already purchased "${product.product_name}".`
          )
          .join("\n ");
      } else {
        allPurchases += "No purchases found.";
      }

      // Construct the userPreference string
      if (data.preferences && data.preferences.length > 0) {
        userPreference += data.preferences
          .map(
            (preference) =>
              `Customers preferences: ${preference.preference_key} - ${preference.preference_value}`
          )
          .join("\n ");
      } else {
        userPreference += "No preferences found.";
      }
      console.log("Fetched User Product Data");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
