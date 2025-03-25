const jsQuestions = [
    {
      question: "What is the difference between 'let', 'const', and 'var'?",
      options: [
        "'let' is block-scoped, 'var' is function-scoped, 'const' cannot be reassigned",
        "'var' is block-scoped, 'let' is function-scoped, 'const' can be reassigned",
        "'let' and 'var' are the same, 'const' is different",
        "There is no difference between them"
      ],
      correctIndex: 0
    },
    {
      question: "What does `typeof null` return in JavaScript?",
      options: [
        "'null'",
        "'undefined'",
        "'object'",
        "'number'"
      ],
      correctIndex: 2
    },
    {
      question: "How do you create an arrow function in JavaScript?",
      options: [
        "`function add(a, b) { return a + b; }`",
        "`const add = function(a, b) { return a + b; }`",
        "`const add = (a, b) => a + b;`",
        "`let add = new Function('a', 'b', 'return a + b');`"
      ],
      correctIndex: 2
    },
    {
      question: "Which method creates a new array with modified elements?",
      options: [
        "forEach()",
        "map()",
        "filter()",
        "reduce()"
      ],
      correctIndex: 1
    },
    {
      question: "What does `console.log(2 + '2')` print?",
      options: [
        "22",
        "4",
        "'4'",
        "NaN"
      ],
      correctIndex: 0
    },
    {
      question: "How do you check if an array contains a specific value?",
      options: [
        "arr.has(2)",
        "arr.indexOf(2) !== -1",
        "arr.includes(2)",
        "arr.find(2)"
      ],
      correctIndex: 2
    },
    {
      question: "What is the result of `0.1 + 0.2 === 0.3`?",
      options: [
        "true",
        "false",
        "undefined",
        "NaN"
      ],
      correctIndex: 1
    },
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function inside another function that remembers variables from its outer scope",
        "A function that executes immediately",
        "A function that doesn’t return anything",
        "A built-in JavaScript method"
      ],
      correctIndex: 0
    },
    {
      question: "What is the difference between `==` and `===`?",
      options: [
        "`==` checks both value and type, `===` checks only value",
        "`==` checks only value, `===` checks both value and type",
        "Both are identical",
        "They are different in ES6 but same in ES5"
      ],
      correctIndex: 1
    },
    {
      question: "Which of the following is an example of asynchronous code?",
      options: [
        "`console.log('Hello')`",
        "`fetch('https://api.example.com')`",
        "`let x = 10 + 20;`",
        "`const arr = [1,2,3].map(x => x * 2);`"
      ],
      correctIndex: 1
    }
  ];


const quiz = document.querySelector("#quiz");
const answerElm = document.querySelectorAll(".option");
const [questionElm, option_1, option_2, option_3, option_4] = document.querySelectorAll("#question, #option_1, #option_2, #option_3, #option_4");
const submitBtn = document.querySelector("#submit");

let currentQuiz = 0;
let score = 0;

// Ask for username before the quiz starts
let username = prompt("Enter your name:");

if (!username) username = "Anonymous"; // Default name if none entered

const loadQuiz = () => {
  const { question, options } = jsQuestions[currentQuiz];
  questionElm.innerText = `${currentQuiz + 1}: ${question}`;
  options.forEach((curOption, index) => (window[`option_${index + 1}`].innerText = curOption));
};

// Get the selected option index
const getSelectedOption = () => {
  return Array.from(answerElm).findIndex((curElem) => curElem.checked);
};

// Deselect all answers
const deselectedAnswer = () => {
  answerElm.forEach((curElem) => (curElem.checked = false));
};

// Save and update leaderboard
const updateLeaderboard = (username, score) => {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // Add new score
  leaderboard.push({ username, score });

  // Sort by highest score
  leaderboard.sort((a, b) => b.score - a.score);

  // Keep only top 3
  leaderboard = leaderboard.slice(0, 3);

  // Store in localStorage
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  return leaderboard;
};

// Submit button functionality
submitBtn.addEventListener("click", () => {
  const selectedOptionIndex = getSelectedOption();

  if (selectedOptionIndex === jsQuestions[currentQuiz].correctIndex) {
      score++;
  }

  currentQuiz++;
  if (currentQuiz < jsQuestions.length) {
      deselectedAnswer();
      loadQuiz();
  } else {
      let leaderboard = updateLeaderboard(username, score);

      let leaderboardHTML = "<h3>Top 3 Players:</h3><ol>";
      leaderboard.forEach((entry) => {
          leaderboardHTML += `<li>${entry.username} - ${entry.score}</li>`;
      });
      leaderboardHTML += "</ol>";

      quiz.innerHTML = `
      <div class="result">
          <h2>Your Score: ${score}/${jsQuestions.length} Correct Answers</h2>
          <p>Congratulations, ${username}!</p>
          ${leaderboardHTML}
          <button class="reload-button" onclick="location.reload()">Play Again</button>
      </div>`;
  }
});

loadQuiz();