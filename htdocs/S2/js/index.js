function animateText() {
  const title = document.getElementById("title");
  const title0 = document.getElementById("title0");
  const words = [
    "Say hello to",
    "Analytics",
    "Insights",
    "Dashboards",
    "Metrics",
    "Data",
    "Forecasting",
    "Strategy",
    "Mining",
    "Modeling",
    "Visualization",
    "Intelligence",
    "Algorithms",
    "Integration",
    "Predictive",
    "Machine Learning",
    "Optimization",
];

  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let isFirst = true;
  let currentTitle = title0;

  function type() {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      if (!isFirst) {
        title.textContent = currentWord.substring(0, currentCharIndex - 1);
      }
      currentCharIndex--;
    } else {
      if (isFirst) {
        currentTitle.textContent = currentWord.substring(
          0,
          currentCharIndex + 1
        );
      } else {
        title.textContent = currentWord.substring(0, currentCharIndex + 1);
      }
      currentCharIndex++;
    }

    if (!isDeleting && currentCharIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, isFirst ? 50 : 1500); // Wait before starting deletion
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;

      if (!isFirst) {
        title.textContent = "\u00A0"; // Invisible placeholder (non-breaking space)
      }

      isFirst = false;
      setTimeout(type, isFirst ? 20 : 500); // Wait before typing next word
    } else {
      const typingSpeed = isDeleting ? 100 : 200; // Speed of typing and deletion
      setTimeout(type, typingSpeed);
    }
  }

  setTimeout(() => {
    type();
  }, 1500); // Start the animation after 1.5 seconds
}

document.getElementById("title0").textContent = "\u00A0";
document.getElementById("title").textContent = "\u00A0";
document.getElementById("");

animateText();

function changeAnimation() {
  const inputField = document.getElementById("IDinputField");

  setTimeout(() => {
    inputField.style.animation = "glowing-border-85 4s linear infinite";
  }, 7000);
}

window.onload = changeAnimation;

function setUserID(userID) {
  sessionStorage.setItem("hensoAI.SessionStorage.UserID", userID);
}

function relocate() {
  let headertext = document.getElementById("headerbox");
  headertext.style.animation = "opacity0 1s ease-in 1 forwards";
  let chatbutton = document.getElementById("loadingGIF");
  chatbutton.style.animation = "opacity0 1s ease-in 1 forwards";
  document.getElementById("IDinputField").style.animation =
    "opacity0 1s ease-in 1 forwards";
  setTimeout(function () {
    window.location = "bot.html";
  }, 1200);
}

function touched() {
  document.getElementById("loadingGIF").style.animation =
    "opacity1 1s ease-in 1 forwards";
}

function skipID() {
  let headertext = document.getElementById("headerbox");
  headertext.style.animation = "opacity0 1s ease-in 1 forwards";
  let chatbutton = document.getElementById("loadingGIF");
  chatbutton.style.animation = "opacity0 1s ease-in 1 forwards";
  document.getElementById("IDinputField").style.animation =
    "opacity0 1s ease-in 1 forwards";
  setTimeout(function () {
    window.location = "bot.html";
  }, 1200);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "x") {
    sessionStorage.removeItem("hensoAI.SessionStorage.UserID");
    console.log("User Resetted");
  }
});


window.addEventListener('scroll', function() {
  const headerText = document.querySelector('.headertext1');
  const navbar = document.getElementById('dynamicNavbar');
  const headerPosition = headerText.getBoundingClientRect().bottom;

  if (headerPosition < 0) {
    // If the header text is off-screen, show the navbar
    navbar.classList.remove('hidden');
  } else {
    // Otherwise, hide it
    navbar.classList.add('hidden');
  }
});
window.addEventListener('scroll', function() {
  const headerText = document.querySelector('.headertext1');
  const navbar = document.getElementById('dynamicNavbar');
  const datasphere = document.querySelector('.datasphere');
  const headerPosition = headerText.getBoundingClientRect().bottom + window.pageYOffset;

  if (window.pageYOffset > headerPosition) {
    navbar.classList.remove('hidden');
    navbar.style.opacity = "1"; // Make the navbar visible
    datasphere.classList.add('datasphere-visible'); // Trigger datasphere animation
  } else {
    navbar.classList.add('hidden');
    datasphere.classList.remove('datasphere-visible'); // Reset datasphere position
  }
});
