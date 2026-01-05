// Basic quiz data
    const quiz = [
      {
        question: "What is the plural form of 'child'?",
        options: ["childs", "children", "childes", "childrens"],
        answer: "children"
      },
      {
        question: "Choose the correct article: ___ apple a day keeps the doctor away.",
        options: ["A", "An", "The", "No article"],
        answer: "An"
      },
      {
        question: "Which one is a synonym of 'happy'?",
        options: ["sad", "joyful", "angry", "tired"],
        answer: "joyful"
      }
    ];

    let current = 0;
    let score = 0;

    const qElem = document.getElementById('question');
    const optElem = document.getElementById('options');
    const scoreElem = document.getElementById('score');

    function showQuestion() {
      const q = quiz[current];
      qElem.textContent = q.question;
      optElem.innerHTML = ''; // Clear old buttons

      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt);
        optElem.appendChild(btn);
      });
      scoreElem.textContent = `Score: ${score}/${quiz.length}`;
    }

    function checkAnswer(selected) {
      const correct = quiz[current].answer;
      if (selected === correct) {
        score++;
        alert("✅ Correct!");
      } else {
        alert(`❌ Wrong! The correct answer was: ${correct}`);
      }

      current++;
      if (current < quiz.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }

    function endQuiz() {
      qElem.textContent = "Quiz Finished!";
      optElem.innerHTML = '';
      scoreElem.textContent = `Final Score: ${score} / ${quiz.length}`;
    }

    // Start quiz
    showQuestion();