const questions = [
    { 
        question: "1. What is your skin color?", 
        options: [
            { text: "Reddish", mizaj: "Damvi" },
            { text: "Pale(Yellowish)", mizaj: "Safravi" },
            { text: "Whitish", mizaj: "Balghami" },
            { text: "Purple(Blackish)", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "2. What is your body type?", 
        options: [
            { text: "Muscular & broad", mizaj: "Damvi" },
            { text: "Muscular & thin", mizaj: "Safravi" },
            { text: "Fatty & broad", mizaj: "Balghami" },
            { text: "Skeletal", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "3. What is your skin type and texture?", 
        options: [
            { text: "Hot & soft", mizaj: "Damvi" },
            { text: "Hot & dry", mizaj: "Safravi" },
            { text: "Cold & soft", mizaj: "Balghami" },
            { text: "Cold & dry", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "4. What is your hair color and type ?", 
        options: [
            { text: "Black & Shiny thick rapid growth", mizaj: "Damvi" },
            { text: "Brown & thin rapid growth", mizaj: "Safravi" },
            { text: "Black & thin slow growth", mizaj: "Balghami" },
            { text: "Brown & slow growth", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "5. Are you physically active?", 
        options: [
            { text: "Active", mizaj: "Damvi" },
            { text: "Hyperactive", mizaj: "Safravi" },
            { text: "Dull", mizaj: "Balghami" },
            { text: "less active", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "6. Do you become more inclined to eat any of the food listed here?", 
        options: [
            { text: "Cold & dry(sour)", mizaj: "Damvi" },
            { text: "Cold & moist(citrus, tasteless)", mizaj: "Safravi" },
            { text: "Hot & dry(salty, bitter, spicy)", mizaj: "Balghami" },
            { text: "Hot & moist(sweet)", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "7. What type of weather makes you feel your best?", 
        options: [
            { text: "Spring", mizaj: "Damvi" },
            { text: "Winter", mizaj: "Safravi" },
            { text: "Summer", mizaj: "Balghami" },
            { text: "Autumn", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "8. How is your sleep?", 
        options: [
            { text: "Normal (6-8 hrs)", mizaj: "Damvi" },
            { text: "Inadequate", mizaj: "Safravi" },
            { text: "In excess", mizaj: "Balghami" },
            { text: "Insomnia", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "9. Check your pulse rate by counting the beats in one minute and note the thrust of the pulse against the fingertips?", 
        options: [
            { text: "Normal (70-80/m)", mizaj: "Damvi" },
            { text: "(80-90/m)", mizaj: "Safravi" },
            { text: "(60-70/m)", mizaj: "Balghami" },
            { text: "(60-70/m)", mizaj: "Saudavi" }
        ]
    },
    { 
        question: "10. What is your personality trait?", 
        options: [
            { text: "Normal", mizaj: "Damvi" },
            { text: "Angry", mizaj: "Safravi" },
            { text: "Calm & quiet", mizaj: "Balghami" },
            { text: "Nervous", mizaj: "Saudavi" }
        ]
    }
];

// Mizaj score tracker
let scores = {
    "Damvi": 0,
    "Safravi": 0,
    "Balghami": 0,
    "Saudavi": 0
};

let currentQuestion = 0;
let selectedMizaj = null;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    selectedMizaj = null; // Reset selection
    document.getElementById("next-btn").disabled = true; // Disable Next button

    q.options.forEach(option => {
        const btn = document.createElement("div");
        btn.classList.add("option");
        btn.innerText = option.text;
        btn.onclick = function() {
            document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
            btn.classList.add("selected");
            selectedMizaj = option.mizaj;
            document.getElementById("next-btn").disabled = false; // Enable Next button
        };
        optionsContainer.appendChild(btn);
    });
}
function nextQuestion() {
    if (selectedMizaj) {
        scores[selectedMizaj]++;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
}
function showResult() {
    document.getElementById("question-box").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");

    let highestMizaj = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    let mizajDescriptions = {
    "Damvi": `Hot & Wet<br><br>Your character is:<br>Extrovert, Enthusiastic, Optimistic, Confident, Positive, Adventurous.`,
    
    "Safravi": 'Hot & Dry<br><br>Your character is:<br>Energetic, Bold, Daring, Intelligent, Persistent.',
    
    "Balghami": 'Cold & Wet<br><br>Your character is:<br>Calm, Thoughtful, Sentimental, and Emotional.',
    
    "Saudavi": 'Cold & Dry<br><br>Your character is:<br>Analytical, Logical, Mindful, Attentive, Memorious, Systematic.',
  };
    document.getElementById("result").innerHTML = `
        <h2>Your Mizaj is: ${highestMizaj}</h2>
        <h2>Mizaj: ${mizajDescriptions[highestMizaj]}</h2>
    `;
    document.getElementById("result").classList.remove("hidden");
}
function restartQuiz() {
    scores = { "Damvi": 0, "Safravi": 0, "Balghami": 0, "Saudavi": 0 };
    currentQuestion = 0;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("question-box").classList.remove("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
    loadQuestion();
}
loadQuestion();
function toggleMenu() {
    document.getElementById("side-menu").classList.toggle("show");
}
function togglePopup(id) {
  const modal = document.getElementById(id);
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}
// Close menu when clicking outside
document.addEventListener("click", function(event) {
    let menu = document.getElementById("side-menu");
    let menuBtn = document.getElementById("menu-btn");

    if (!menu.contains(event.target) && event.target !== menuBtn) {
        menu.classList.remove("show");
    }
});
      // Wait for 3 seconds, then hide the splash screen
setTimeout(function() {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}, 3000); // 3000 milliseconds = 3 seconds