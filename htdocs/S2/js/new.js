function animateText() {
    const title = document.getElementById("title1");
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
  document.getElementById("title1").textContent = "\u00A0";
  document.getElementById("");
  
  animateText();