let transcript = "";

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function contactExperienceGPT() {
    const input = $('#userInput').val().trim();
    if (input !== "") {
        let messageWithTranscript = "";

        if (transcript !== "") {
            messageWithTranscript = transcript + "\n\n";
        }

        messageWithTranscript += "A User now asked: " + input;

        const onlineTextElement = document.getElementById('onlineText');
        const isOnlineElement = document.getElementById('chatimage');

        onlineTextElement.textContent = 'ExperienceGPT.thinking';
        isOnlineElement.style.animation = 'none';
        isOnlineElement.style.animation = 'thinkingimg 2s linear infinite forwards';

        const iconElement = document.getElementById("iconElement");
        const url = iconElement.classList.contains("fa-toggle-on") ? 'php/process.php' : 'php/processnocontext.php';

        $.ajax({
            type: 'POST',
            url: url,
            data: { messageWithTranscript: messageWithTranscript },
            beforeSend: function () {
                console.log("GPT Call Context: " + messageWithTranscript);
                console.log("Token Limit " + messageWithTranscript.length + "/8.192");
                addMessage(input, 'user-message' + (isIOS() ? ' ios' : ''));
                addMessage('Thinking...', 'typing-indicator bot-message');
                $('#userInput').val('');
                document.getElementById("userInput").disabled = true;
                document.getElementById("userInput").placeholder = "Thinking";
            },
            success: function (response) {
                if (response !== 'No results found.') {
                    $('.typing-indicator').remove();
                    transcript = messageWithTranscript + "\n " + response;
                    addMessage(response, 'bot-message');
                    onlineTextElement.textContent = 'ExperienceGPT.writing';
                    isOnlineElement.style.animation = 'none';
                    isOnlineElement.style.animation = 'writingimg 3s linear infinite forwards';
                } else {
                    $('.typing-indicator').remove();
                    onlineTextElement.textContent = 'ExperienceGPT.error';
                    isOnlineElement.style.animation = 'none';
                    isOnlineElement.style.animation = 'preparationimg 5s linear infinite forwards';
                }
            }
        });
    }
}

function addMessage(message, className) {
    const chatbox = document.getElementById('chatbox');
    const container = document.createElement('div');
    container.className = 'message-container ' + className;

    if (className.includes('typing-indicator')) {
        // Add code here for typing indicator
    } else {
        const iconElement = document.createElement('img');
        if (className === 'bot-message') {
            iconElement.className = 'icon icon-bot';
            iconElement.src = 'media/nikebot.png';
        } else if (className === 'user-message') {
            iconElement.className = 'icon icon-user';
            iconElement.src = 'media/user.png';
        }
        container.appendChild(iconElement);
    }

    if (className.includes('typing-indicator')) {
        // Add code here for typing indicator
    } else if (className === 'bot-message') {
        const messageElement = document.createElement('p');
        messageElement.className = 'message ' + className;
        container.appendChild(messageElement);
        animateBotMessage(message, messageElement);
    } else {
        const messageElement = document.createElement('p');
        messageElement.className = 'message ' + className;
        messageElement.textContent = message;
        container.appendChild(messageElement);
    }

    chatbox.appendChild(container);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function animateBotMessage(message, messageElement) {
    let index = 0;
    let speed = 0;
    const speedIncrease = sessionStorage.getItem("experiencegptanswer");
    if(speedIncrease) {
        speed = 10;
        sessionStorage.removeItem("experiencegptanswer");
    } else {
    speed = 30;
    }
    document.getElementById("userInput").placeholder = "Writing";

    function displayLetter() {
        messageElement.textContent += message[index];
        index++;

        // Auto scroll to the bottom of the chatbox
        const chatbox = document.getElementById('chatbox');
        chatbox.scrollTop = chatbox.scrollHeight;

        if (index < message.length) {
            setTimeout(displayLetter, speed);
        } else {
            document.getElementById("userInput").disabled = false;
            document.getElementById("userInput").placeholder = "Ask me a question here";
            document.getElementById("userInput").select();
            document.getElementById("onlineText").textContent = "ExperienceGPT.ready";
            document.getElementById("chatimage").style.animation = 'readyimg 5s linear infinite forwards';

            // Auto scroll to the bottom after the message is completely displayed
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }

    displayLetter();
}

$(document).ready(function () {
    $('#userInput').keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            const input = $(this).val().trim();
            if (input !== "") {
                contactExperienceGPT();
            }
        }
    });
});

window.onload = function () {
    const isNewSession = sessionStorage.getItem("experiencegptanswer");
    if(isNewSession) {
        loadData();
        animateWithPrevious(isNewSession);
        transcript += isNewSession;
    } else {
    document.getElementById("userInput").disabled = true;
    animateAll();
    loadData();
    }
};

function animateWithPrevious(previousChat) {
    document.getElementById("onlineText").textContent = "ExperienceGPT.ready";
    setTimeout(function () {
        document.getElementById("container").style.animation = 'container 1.5s ease-in 1 forwards';
        document.getElementById("chatimage").style.animation = 'chatimagefinish 0.7s ease-in-out 1 forwards';
        document.getElementById("chathead").style.animation = 'chatheadfinish 1s ease-in-out 1 forwards';
    }, 300);
    setTimeout(function () {
        document.getElementById("breaker").style.animation = 'opacity1 1s ease-in-out 1 forwards';
        document.getElementById("chatimage").style.animation = 'none';
        document.getElementById("chatimage").style.top = "5%";
    }, 1000);
    setTimeout(function () {
        addMessage(previousChat, 'bot-message');
        document.getElementById("chatimage").style.animation = 'readyimg 5s linear infinite forwards';
    }, 1500);
    setTimeout(function () {
        document.getElementById("chatcontainer").style.animation = 'opacity1 1s ease-in-out 1 forwards';
        document.getElementById("userInput").placeholder = "Ask me a question here";
        document.getElementById("userInput").disabled = false;
        document.getElementById("userInput").select();
    }, 2000);
}

function animateAll() {
    setTimeout(function () {
        document.getElementById("chatimage").style.animation = 'containerimageload 1.5s ease-in 1 forwards';
        document.getElementById("chathead").style.animation = 'chatheadertextanimate 1s ease-in-out 1 forwards';
        testConnection();
    }, 1000);
    setTimeout(function () {
        document.getElementById("chatimage").style.animation = 'none';
        document.getElementById("chatimage").style.opacity = 1;
    }, 2600);
    setTimeout(function () {
        document.getElementById("chatimage").style.animation = 'preparationimg 5s linear infinite forwards';
    }, 2800);
}

function toggleContext() {
    const iconElement = document.getElementById("iconElement");
    if (iconElement.classList.contains("fa-toggle-on")) {
        iconElement.classList.remove("fa-toggle-on");
        iconElement.classList.add("fa-toggle-off");
        console.log("Kontext entfernt");
        document.getElementById("onlineText").textContent = "GenericGPT.ready";
    } else {
        iconElement.classList.remove("fa-toggle-off");
        iconElement.classList.add("fa-toggle-on");
        console.log("Kontext hinzugefügt");
        document.getElementById("onlineText").textContent = "ExperienceGPT.ready";
    }
}

function testConnection() {
    const previousmessage = sessionStorage.getItem("experiencegptanswer");
    if (previousmessage) {
        connectionGood(previousmessage);
        console.log("Chat geladen");
        transcript += previousmessage;
    } else {
        console.log("Kein vorheriger Chat verfügbar!");

        const messageWithTranscript = 'Hi!';
        $.ajax({
            type: 'POST',
            url: 'php/process.php',
            data: { messageWithTranscript: messageWithTranscript },
            beforeSend: function () {
                console.log("Frage LLM, ob online");
                console.log(messageWithTranscript);
            },
            success: function (response) {
                connectionGood(response);
                document.getElementById("chatimage").style.animation = 'none';
            }
        });
    }
}

const minInputLength = 3;
let typeaheadData = [];
const typeaheadEndpoint = 'php/get_data.php';

function loadData() {
    fetch(typeaheadEndpoint)
        .then(response => response.json())
        .then(data => {
            typeaheadData = data.typeaheadData.map(item => item.device);
        })
        .catch(error => console.error('Fehler beim Laden der Daten:', error));
}

typeaheadData = ['CX VSA', 'CX Showcase', 'HR VSA', 'HR Showcase', 'Spend VSA', 'Spend VSA'];

function predictSuggestions() {
    const userInput = document.getElementById('userInput').value.trim();
    removeAllSuggestions();

    if (userInput.length >= minInputLength) {
        const matchingSuggestions = typeaheadData.filter(item => item.toLowerCase().includes(userInput.toLowerCase())).slice(0, 3);

        matchingSuggestions.forEach(suggestion => {
            addSuggestion(suggestion);
        });
    }
}

let checkerhehe = 0;

function checkAndRemoveSuggestions() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') {
        removeAllSuggestions();
        checkerhehe = 0;
    }
}

function addSuggestion(suggestionText) {
    const suggestionBox = document.getElementById('suggestionbox');
    const userInput = document.getElementById('userInput').value.trim();
    const suggestionElement = document.createElement('p');
    suggestionElement.classList.add('suggestion');
    suggestionElement.textContent = suggestionText;
    suggestionElement.addEventListener('click', () => {
        const userInputField = document.getElementById('userInput');
        if (checkerhehe === 0) {
            userInputField.value = suggestionText;
        } else {
            userInputField.value = userInput + ' ' + suggestionText;
        }
        removeAllSuggestions();
        if (checkerhehe === 0) {
            addSuggestion("is black");
            addSuggestion("is pixelated");
            addSuggestion("is laggy");
            addSuggestion("has no audio");
            checkerhehe = 1;
        }
    });
    suggestionBox.appendChild(suggestionElement);
}

function removeAllSuggestions() {
    const suggestionBox = document.getElementById('suggestionbox');
    while (suggestionBox.firstChild) {
        suggestionBox.removeChild(suggestionBox.firstChild);
    }
}

function showProblemSuggestions() {
    const suggestionBox = document.getElementById('suggestionbox');
    const suggestionElement = document.createElement('p');
    suggestionElement.classList.add('suggestion');
    suggestionElement.textContent = 'is black';
    suggestionElement.addEventListener('click', () => {
        const userInputField = document.getElementById('userInput');
        userInputField.value = suggestionText + " ";
        removeAllSuggestions();
    });
    suggestionBox.appendChild(suggestionElement);
}

function connectionGood(response) {
    console.log('GPT is ready');
    console.log(response);
    document.getElementById("onlineText").textContent = "ExperienceGPT.ready";
    setTimeout(function () {
        document.getElementById("container").style.animation = 'container 1.5s ease-in 1 forwards';
        document.getElementById("chatimage").style.animation = 'chatimagefinish 0.7s ease-in-out 1 forwards';
        document.getElementById("chathead").style.animation = 'chatheadfinish 1s ease-in-out 1 forwards';
    }, 1000);
    setTimeout(function () {
        document.getElementById("breaker").style.animation = 'opacity1 1s ease-in-out 1 forwards';
        document.getElementById("chatimage").style.animation = 'none';
        document.getElementById("chatimage").style.top = "5%";
    }, 3000);
    setTimeout(function () {
        addMessage(response, 'bot-message');
        document.getElementById("chatimage").style.animation = 'readyimg 5s linear infinite forwards';
    }, 4000);
    setTimeout(function () {
        document.getElementById("chatcontainer").style.animation = 'opacity1 1s ease-in-out 1 forwards';
        document.getElementById("userInput").placeholder = "Ask me a question here";
        document.getElementById("userInput").disabled = false;
        document.getElementById("userInput").select();
    }, 5000);
}
