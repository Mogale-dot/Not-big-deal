  
// ============================================
// QUESTIONS.JS — Romantic Love Quiz Game
// Playful, interactive, with a runaway "No" button!
// ============================================

// ============================================
// 💕 ADD YOUR QUESTIONS HERE, BROTHER!
// ============================================
const loveQuestions = [
    // --- Multiple Choice Questions ---
   
    {
        id: 1,
        type: 'multiple',
        question: 'What do you think I love most about you? 🌹',
        options: [
            { text: 'Your beautiful smile 😊', score: 18 },
            { text: 'Your sweat voice  💖', score: 20 },
            { text: 'The way you make me feel ✨', score: 17 },
            { text: 'Everything — I can\'t choose! 🥰', score: 20 }
        ],
        romanticNote: '...'
    },
    {
        id: 2,
        type: 'multiple',
        question: 'Our perfect date would be...? 🌙',
        options: [
            { text: 'Going to watch the movies  🌌', score: 18 },
            { text: 'A cozy dinner  🕯️', score: 17 },
            { text: 'Go  somewhere new  🗺️', score: 16 },
            { text: 'Anywhere — as long as I\'m with you 💕', score: 20 }
        ],
        romanticNote: '...'
    },
    
    // --- Yes/No Questions (Rhetorical — No button runs away!) ---
    {
        id: 3,
        type: 'yesno',
        question: 'Do you know how much you mean to me? 🥺',
        rhetorical: true,
        romanticNote: 'YOU  MEAN SOO  MUCH  TO ME ... 💕'
    },
    {
        id: 4,
        type: 'yesno',
        question: 'Would you let me make you the happiest wife  in the world ONE DAY  ? 🌍',
        rhetorical: true,
        romanticNote: 'Because that\'s all I really  want now ... ✨'
    },
   
    {
        id: 5,
        type: 'yesno',
        question: 'Will you be my Wife   one day  ? ♾️',
        rhetorical: true,
        romanticNote: 'Because my heart has already chosen you... 💖'
    }
];

// ============================================
// GAME STATE
// ============================================
let currentQuestionIndex = 0;
let totalScore = 0;
let answeredQuestions = [];
let noButtonClickCount = 0;
let noButtonRunCount = 0;

// ============================================
// INITIALIZATION
// ============================================
function loadQuestions() {
    const container = document.getElementById('questionsContainer');
    
    // Reset state
    currentQuestionIndex = 0;
    totalScore = 0;
    answeredQuestions = [];
    noButtonClickCount = 0;
    noButtonRunCount = 0;
    
    container.innerHTML = `
        <!-- Quiz Intro -->
        <div class="quiz-intro" id="quizIntro">
            <div class="quiz-intro-icon">💝</div>
            <h3>Quiz</h3>
            <p>Let's play a little game, my lady ...<br>Answer from your heart  💕</p>
            <div class="quiz-progress-preview">
                <span>${loveQuestions.length} sweet questions</span>
                <div class="mini-hearts">
                    ${'💕'.repeat(Math.min(loveQuestions.length, 5))}
                </div>
            </div>
            <button class="btn-start-quiz" id="btnStartQuiz">
                <i class="fas fa-heart"></i>
                <span>Start the Quiz</span>
                <i class="fas fa-heart"></i>
            </button>
        </div>
        
        <!-- Quiz Question Card -->
        <div class="quiz-question-card" id="quizQuestionCard" style="display:none;">
            <!-- Progress bar -->
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <span class="progress-text" id="progressText">1/${loveQuestions.length}</span>
            </div>
            
            <!-- Heart score -->
            <div class="score-display" id="scoreDisplay">
                <i class="fas fa-heart"></i>
                <span id="scoreText">0</span>
                <span class="score-label">love points</span>
            </div>
            
            <!-- Question -->
            <div class="question-content" id="questionContent">
                <!-- Rendered dynamically -->
            </div>
            
            <!-- Romantic note (appears after answering) -->
            <div class="romantic-note" id="romanticNote" style="display:none;">
                <span class="note-sparkle">✨</span>
                <p id="noteText"></p>
                <span class="note-sparkle">✨</span>
            </div>
            
            <!-- Next button -->
            <button class="btn-next" id="btnNext" style="display:none;">
                <span>Next Question</span>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        
        <!-- Quiz Result -->
        <div class="quiz-result" id="quizResult" style="display:none;">
            <!-- Rendered at the end -->
        </div>
        
        <!-- Floating hearts container for effects -->
        <div class="floating-hearts-container" id="floatingHearts"></div>
    `;
    
    // Setup listeners
    document.getElementById('btnStartQuiz').addEventListener('click', startQuiz);
    document.getElementById('btnNext').addEventListener('click', nextQuestion);
}

// ============================================
// START QUIZ
// ============================================
function startQuiz() {
    document.getElementById('quizIntro').style.display = 'none';
    document.getElementById('quizQuestionCard').style.display = 'block';
    
    // Animate entrance
    const card = document.getElementById('quizQuestionCard');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'fadeSlideUp 0.5s ease';
    
    showQuestion(0);
}

// ============================================
// SHOW QUESTION
// ============================================
function showQuestion(index) {
    const question = loveQuestions[index];
    const questionContent = document.getElementById('questionContent');
    const romanticNote = document.getElementById('romanticNote');
    const btnNext = document.getElementById('btnNext');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Reset
    romanticNote.style.display = 'none';
    btnNext.style.display = 'none';
    questionContent.style.animation = 'none';
    questionContent.offsetHeight;
    questionContent.style.animation = 'fadeSlideUp 0.4s ease';
    
    // Update progress
    const progress = ((index + 1) / loveQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${index + 1}/${loveQuestions.length}`;
    
    if (question.type === 'multiple') {
        questionContent.innerHTML = `
            <div class="question-text">
                <span class="question-number">Q${index + 1}</span>
                <h4>${question.question}</h4>
            </div>
            <div class="options-grid">
                ${question.options.map((opt, i) => `
                    <button class="option-btn" onclick="selectMultipleOption(${index}, ${i}, this)">
                        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                        <span class="option-text">${opt.text}</span>
                        <span class="option-heart">💕</span>
                    </button>
                `).join('')}
            </div>
        `;
    } else if (question.type === 'yesno') {
        questionContent.innerHTML = `
            <div class="question-text">
                <span class="question-number">Q${index + 1}</span>
                <h4>${question.question}</h4>
            </div>
            <div class="yesno-buttons">
                <button class="btn-yes" onclick="selectYesNo(${index}, 'yes', this)">
                    <i class="fas fa-heart"></i>
                    <span>Yes!</span>
                    <i class="fas fa-heart"></i>
                </button>
                <button class="btn-no" id="btnNo" onmouseover="runAwayNoButton(this)" onclick="tryClickNo(this)">
                    <span>No...</span>
                </button>
            </div>
            <p class="no-button-hint" id="noButtonHint"></p>
        `;
        
        // If rhetorical, make the No button playful
        if (question.rhetorical) {
            noButtonRunCount = 0;
            document.getElementById('noButtonHint').textContent = 'Try saying no... if you can! 😏💕';
        }
    }
}

// ============================================
// MULTIPLE CHOICE SELECTION
// ============================================
function selectMultipleOption(questionIndex, optionIndex, buttonElement) {
    // Prevent double selection
    if (answeredQuestions.includes(questionIndex)) return;
    
    const question = loveQuestions[questionIndex];
    const score = question.options[optionIndex].score;
    
    // Mark as answered
    answeredQuestions.push(questionIndex);
    totalScore += score;
    
    // Update score display
    updateScoreDisplay();
    
    // Highlight selected
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
    });
    
    buttonElement.classList.add('selected');
    buttonElement.querySelector('.option-heart').style.opacity = '1';
    
    // Show romantic note
    showRomanticNote(question.romanticNote);
    
    // Show next button
    showNextButton();
    
    // Burst hearts
    burstHearts(buttonElement);
}

// ============================================
// YES/NO SELECTION
// ============================================
function selectYesNo(questionIndex, answer, buttonElement) {
    // Prevent double selection
    if (answeredQuestions.includes(questionIndex)) return;
    
    const question = loveQuestions[questionIndex];
    
    // Mark as answered
    answeredQuestions.push(questionIndex);
    totalScore += 20; // Yes always gives full score
    
    // Update score display
    updateScoreDisplay();
    
    // Highlight Yes
    buttonElement.classList.add('selected');
    document.getElementById('btnNo').classList.add('disabled-no');
    document.getElementById('btnNo').style.pointerEvents = 'none';
    document.getElementById('noButtonHint').textContent = 'Of course you said yes! 💕';
    document.getElementById('noButtonHint').style.color = 'var(--pink-deep)';
    
    // Show romantic note
    showRomanticNote(question.romanticNote);
    
    // Show next button
    showNextButton();
    
    // Lots of hearts!
    burstHearts(buttonElement);
    setTimeout(() => burstHearts(buttonElement), 300);
}

// ============================================
// RUNAWAY NO BUTTON (The playful part!)
// ============================================
function runAwayNoButton(button) {
    const question = loveQuestions[currentQuestionIndex];
    if (!question.rhetorical) return;
    if (answeredQuestions.includes(currentQuestionIndex)) return;
    
    noButtonRunCount++;
    
    const btnNo = document.getElementById('btnNo');
    const hint = document.getElementById('noButtonHint');
    
    // Get button position
    const rect = btnNo.getBoundingClientRect();
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Calculate random position
    const maxX = containerWidth - rect.width - 20;
    const maxY = containerHeight - rect.height - 20;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Move the button
    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = '999';
    btnNo.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    
    // Funny hints
    const hints = [
        'You can\'t say no mara! 💕',
        'Nice try! ! 😄',
        'Running won\'t help, beautiful! 🏃‍♀️💨',
        'Just say yes... it\'s easier! 😘',
        `You've tried ${noButtonRunCount} time${noButtonRunCount > 1 ? 's' : ''}... still no? 😂`,
        'The "No" button is shy today! 🙈',
        'Caught it! Oh wait, it ran again... 🎯',
        'Accept your fate: YES! 💖'
    ];
    
    hint.textContent = hints[Math.min(noButtonRunCount - 1, hints.length - 1)];
    hint.style.color = 'var(--pink-deep)';
    
    // Reset position after a while if she gives up
    if (noButtonRunCount >= 5) {
        setTimeout(() => {
            btnNo.style.position = 'relative';
            btnNo.style.left = 'auto';
            btnNo.style.top = 'auto';
            hint.textContent = 'Okay okay, the button is back... but we both know the answer! 😏💕';
        }, 2000);
    }
}

function tryClickNo(button) {
    // The No button was somehow clicked
    const btnNo = document.getElementById('btnNo');
    
    // Make it run away immediately
    runAwayNoButton(btnNo);
    
    // Show playful message
    const hint = document.getElementById('noButtonHint');
    hint.textContent = 'Almost got it! But love always wins! 💕😄';
    
    // Add shake to the No button area
    const yesnoContainer = document.querySelector('.yesno-buttons');
    yesnoContainer.style.animation = 'none';
    yesnoContainer.offsetHeight;
    yesnoContainer.style.animation = 'shake 0.5s ease';
}

// ============================================
// ROMANTIC NOTE & NEXT BUTTON
// ============================================
function showRomanticNote(note) {
    const romanticNote = document.getElementById('romanticNote');
    const noteText = document.getElementById('noteText');
    
    noteText.textContent = note;
    romanticNote.style.display = 'flex';
    romanticNote.style.animation = 'none';
    romanticNote.offsetHeight;
    romanticNote.style.animation = 'fadeSlideUp 0.5s ease';
}

function showNextButton() {
    const btnNext = document.getElementById('btnNext');
    btnNext.style.display = 'flex';
    btnNext.style.animation = 'none';
    btnNext.offsetHeight;
    btnNext.style.animation = 'fadeSlideUp 0.4s ease';
}

function updateScoreDisplay() {
    const scoreText = document.getElementById('scoreText');
    const maxPossible = Math.min((answeredQuestions.length) * 20, 100);
    
    // Animate score change
    const currentDisplay = parseInt(scoreText.textContent) || 0;
    animateNumber(currentDisplay, totalScore, scoreText);
}

function animateNumber(start, end, element) {
    const duration = 600;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * eased);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// NEXT QUESTION
// ============================================
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < loveQuestions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

// ============================================
// SHOW RESULTS
// ============================================
function showResults() {
    const questionCard = document.getElementById('quizQuestionCard');
    const resultDiv = document.getElementById('quizResult');
    
    questionCard.style.display = 'none';
    resultDiv.style.display = 'block';
    
    const maxScore = loveQuestions.length * 20;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    // Determine love level
    let loveLevel, loveMessage, loveEmoji, loveColor;
    
    if (percentage >= 90) {
        loveLevel = 'mmmmh nice ';
        loveMessage = '.. 💕';
        loveEmoji = '💝';
        loveColor = '#d6336c';
    } else if (percentage >= 70) {
        loveLevel = '';
        loveMessage = '🌹';
        loveEmoji = '💖';
        loveColor = '#ff4d7a';
    } else if (percentage >= 50) {
        loveLevel = 'Great ';
        loveMessage = '🌸';
        loveEmoji = '💗';
        loveColor = '#ff85a2';
    } else {
        loveLevel = '';
        loveMessage = '✨';
        loveEmoji = '🌷';
        loveColor = '#e8a0b4';
    }
    
    resultDiv.innerHTML = `
        <div class="result-card">
            <div class="result-emoji">${loveEmoji}</div>
            <div class="result-score-circle" style="--score-color: ${loveColor};">
                <svg viewBox="0 0 36 36" class="circular-chart">
                    <path class="circle-bg"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path class="circle-fill"
                        stroke="${loveColor}"
                        stroke-dasharray="${percentage}, 100"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" class="circle-text">${percentage}%</text>
                </svg>
            </div>
            <h3 class="result-level" style="color: ${loveColor};">${loveLevel}</h3>
            <p class="result-message">${loveMessage}</p>
            <div class="result-stats">
                <div class="stat">
                    <span class="stat-number">${loveQuestions.length}</span>
                    <span class="stat-label">Questions</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${totalScore}</span>
                    <span class="stat-label">Love Points</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${noButtonRunCount}</span>
                    <span class="stat-label">No's Attempted 😂</span>
                </div>
            </div>
            <button class="btn-retry" onclick="loadQuestions()">
                <i class="fas fa-redo"></i>
                <span>Play Again</span>
            </button>
            <div class="result-hearts">
                <span>💕</span><span>💖</span><span>💗</span><span>💝</span><span>🌸</span>
            </div>
        </div>
    `;
    
    // Massive heart burst!
    for (let i = 0; i < 15; i++) {
        setTimeout(() => burstHearts(resultDiv), i * 200);
    }
}

// ============================================
// HEART BURST EFFECT
// ============================================
function burstHearts(element) {
    const container = document.getElementById('floatingHearts');
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const hearts = ['💕', '💖', '💗', '💝', '🌸', '✨', '🩷', '💓'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('span');
        heart.classList.add('burst-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
        heart.style.setProperty('--ty', (Math.random() * -200 - 50) + 'px');
        heart.style.setProperty('--r', (Math.random() * 360) + 'deg');
        heart.style.animationDuration = (Math.random() * 1 + 0.8) + 's';
        heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

// Add burst heart styles dynamically
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    .floating-hearts-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    }
    
    .burst-heart {
        position: fixed;
        animation: burstOut ease-out forwards;
        pointer-events: none;
    }
    
    @keyframes burstOut {
        0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 1;
        }
        50% {
            opacity: 1;
            transform: translate(calc(var(--tx) * 0.5), calc(var(--ty) * 0.5)) rotate(calc(var(--r) * 0.5)) scale(1.2);
        }
        100% {
            transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);