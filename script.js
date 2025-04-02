const questions = [
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
];

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = "";

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

      if (userAnswers[index] && userAnswers[index] === choice) {
        radio.setAttribute("checked", true);
      }

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

window.onload = () => {
  renderQuestions();
};

document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) score++;
  });
  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
