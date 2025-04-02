const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
];

// Retrieve saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = choice;
      radio.checked = userAnswers[index] === choice;

      radio.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

renderQuestions();

// Handle submission
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Display score from localStorage on page load
window.onload = () => {
  const storedScore = localStorage.getItem("score");
  if (storedScore) {
    document.getElementById("score").textContent = `Your score is ${storedScore} out of ${questions.length}.`;
  }
};
