// ===== STARFIELD GENERATION =====
document.addEventListener('DOMContentLoaded', function() {
  generateStars();
  generateShapes();
  updateActiveNav();
  updateProgress();
  
  // Quiz page
  if (document.querySelector('.quiz-container')) {
    initQuiz();
  }
  
  // Topic page animations
  animateOnScroll();
  
  // Topic 5 widgets
  initWeatherWidget();
  initThermometerWidget();
});

function generateStars() {
  const starsContainer = document.querySelector('.stars');
  if (!starsContainer) return;
  
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    star.style.width = (2 + Math.random() * 4) + 'px';
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }
}

function generateShapes() {
  const shapesContainer = document.querySelector('.floating-shapes');
  if (!shapesContainer) return;
  
  for (let i = 0; i < 8; i++) {
    const shape = document.createElement('div');
    shape.className = 'shape';
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.animationDelay = (Math.random() * -15) + 's';
    shape.style.animationDuration = (10 + Math.random() * 10) + 's';
    shape.style.width = (50 + Math.random() * 150) + 'px';
    shape.style.height = shape.style.width;
    shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '30%';
    shapesContainer.appendChild(shape);
  }
}

// ===== NAVIGATION =====
function updateActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== PROGRESS BAR =====
function updateProgress() {
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  if (!progressFill || !progressText) return;
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const topicPages = ['topic1.html', 'topic2.html', 'topic3.html', 'topic4.html', 'topic5.html', 'topic5a.html', 'topic6.html', 'topic7.html', 'topic8.html', 'topic9.html', 'topic10.html', 'topic11.html', 'topic12.html', 'quiz.html'];
  
  let completedCount = 0;
  
  // Check localStorage for completed topics
  topicPages.forEach(page => {
    if (localStorage.getItem('completed_' + page)) {
      completedCount++;
    }
  });
  
  // If viewing a topic, mark it as in progress
  const currentIndex = topicPages.indexOf(currentPage);
  if (currentIndex >= 0) {
    const viewed = localStorage.getItem('viewed_' + currentPage);
    if (!viewed) {
      localStorage.setItem('viewed_' + currentPage, 'true');
    }
  }
  
  // Count viewed topics as well
  topicPages.forEach(page => {
    if (localStorage.getItem('viewed_' + page) && !localStorage.getItem('completed_' + page)) {
      // Topic is viewed but not completed
    }
  });
  
  const percentage = Math.round((completedCount / topicPages.length) * 100);
  progressFill.style.width = percentage + '%';
  progressText.textContent = completedCount + ' of ' + topicPages.length + ' topics completed (' + percentage + '%)';
}

function markTopicComplete(topicPage) {
  if (!localStorage.getItem('completed_' + topicPage)) {
    localStorage.setItem('completed_' + topicPage, 'true');
    updateProgress();
    launchConfetti();
  }
}

// ===== CONFETTI =====
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#667eea', '#ff9ff3', '#f368e0', '#ff9f43'];
  
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (5 + Math.random() * 10) + 'px';
    piece.style.height = (5 + Math.random() * 10) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    piece.style.animationDelay = Math.random() * 2 + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(piece);
  }
  
  setTimeout(() => {
    container.remove();
  }, 5000);
}

// ===== EMOTIONAL WEATHER WIDGET =====
function initWeatherWidget() {
  const weatherScene = document.querySelector('.weather-scene');
  if (!weatherScene) return;
  
  const emojiEl = weatherScene.querySelector('.weather-emoji');
  const statusEl = weatherScene.querySelector('.weather-status');
  const messageEl = weatherScene.querySelector('.weather-message');
  
  const weatherStates = [
    { emoji: '😊', status: 'Sunny & Happy', message: 'The sun always comes out again! ☀️' },
    { emoji: '😢', status: 'Rainy & Sad', message: 'It\'s okay to feel sad sometimes 🌧️' },
    { emoji: '😡', status: 'Stormy & Angry', message: 'Stormy feelings pass too ⛈️' },
    { emoji: '😌', status: 'Cloudy & Calm', message: 'Clouds drift by, feelings change 🌥️' },
    { emoji: '😊', status: 'Sunny & Happy', message: 'The sun always comes out again! ☀️' }
  ];
  
  let stateIndex = 0;
  
  // Sync weather emoji/status with the 12s CSS animation cycle
  setInterval(() => {
    stateIndex = (stateIndex + 1) % weatherStates.length;
    const state = weatherStates[stateIndex];
    
    if (emojiEl) emojiEl.textContent = state.emoji;
    if (statusEl) statusEl.textContent = state.status;
    if (messageEl) messageEl.textContent = state.message;
  }, 2400); // 12s cycle / 5 states = 2.4s per state
}

// ===== FEELINGS THERMOMETER WIDGET =====
function initThermometerWidget() {
  const thermometerWidget = document.querySelector('.thermometer-widget');
  if (!thermometerWidget) return;
  
  const statusEmoji = thermometerWidget.querySelector('.status-emoji');
  const statusLevel = thermometerWidget.querySelector('.status-level');
  const statusRange = thermometerWidget.querySelector('.status-range');
  const statusTip = thermometerWidget.querySelector('.status-tip');
  
  const thermometerStates = [
    { emoji: '😌', level: 'Feeling Calm', range: 'Level 0-3 · Cool', tip: 'Try: Deep breathing 🌬️' },
    { emoji: '😊', level: 'Feeling Good', range: 'Level 4-6 · Warm', tip: 'Try: Enjoy the moment ✨' },
    { emoji: '😰', level: 'Feeling Stressed', range: 'Level 7-8 · Hot', tip: 'Try: Take a walk 🚶' },
    { emoji: '🤯', level: 'Feeling Overwhelmed', range: 'Level 9-10 · Exploding!', tip: 'Try: Ask for a hug 🤗' },
    { emoji: '😤', level: 'Feeling Frustrated', range: 'Level 7-8 · Hot', tip: 'Try: Draw your feelings 🎨' },
    { emoji: '😊', level: 'Feeling Good', range: 'Level 4-6 · Warm', tip: 'Try: Splash cold water 🧊' }
  ];
  
  let stateIndex = 0;
  
  // Sync thermometer status with the 12s CSS animation cycle
  setInterval(() => {
    stateIndex = (stateIndex + 1) % thermometerStates.length;
    const state = thermometerStates[stateIndex];
    
    if (statusEmoji) statusEmoji.textContent = state.emoji;
    if (statusLevel) statusLevel.textContent = state.level;
    if (statusRange) statusRange.textContent = state.range;
    if (statusTip) statusTip.textContent = state.tip;
  }, 2000); // 12s cycle / 6 states = 2s per state
}

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.info-box, .illustration, .weather-widget, .thermometer-widget');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===== QUIZ ENGINE =====
function initQuiz() {
  // Handle main quiz page (by ID)
  const mainSubmit = document.getElementById('submitQuiz');
  const mainResult = document.getElementById('quizResult');
  const mainReset = document.getElementById('resetQuiz');
  
  if (mainSubmit && mainResult) {
    const mainQuestions = document.querySelectorAll('.quiz-container > .question');
    setupQuiz(mainQuestions, mainSubmit, mainResult, mainReset, 'quiz.html');
  }
  
  // Handle mini quizzes on topic pages (by class)
  document.querySelectorAll('.quiz-container').forEach(container => {
    const miniSubmit = container.querySelector('.mini-submit');
    const miniReset = container.querySelector('.mini-reset');
    const miniResult = container.querySelector('.mini-result');
    
    if (miniSubmit && miniResult) {
      const miniQuestions = container.querySelectorAll('.question');
      setupQuiz(miniQuestions, miniSubmit, miniResult, miniReset, null);
    }
  });
}

function setupQuiz(questions, submitBtn, resultDiv, resetBtn, completionKey) {
  questions.forEach((question) => {
    const options = question.querySelectorAll('.option');
    options.forEach(option => {
      option.addEventListener('click', function() {
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        checkAllAnswered(questions, submitBtn);
      });
    });
  });
  
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      checkQuiz(questions, resultDiv, completionKey);
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      resetQuiz(questions, resultDiv, submitBtn);
    });
  }
}

function checkAllAnswered(questions, submitBtn) {
  let allAnswered = true;
  questions.forEach(question => {
    const selected = question.querySelector('.option.selected');
    if (!selected) allAnswered = false;
  });
  
  if (submitBtn) {
    submitBtn.disabled = !allAnswered;
    if (allAnswered) {
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    } else {
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
    }
  }
}

function checkQuiz(questions, resultDiv, completionKey) {
  let score = 0;
  let totalQuestions = questions.length;
  
  questions.forEach((question) => {
    const selected = question.querySelector('.option.selected');
    const correctValue = question.dataset.correct;
    
    question.querySelectorAll('.option').forEach(opt => {
      opt.classList.remove('correct', 'wrong');
    });
    
    const correctOption = question.querySelector(`.option[data-value="${correctValue}"]`);
    if (correctOption) {
      correctOption.classList.add('correct');
    }
    
    if (selected) {
      if (selected.dataset.value === correctValue) {
        score++;
        selected.classList.add('correct');
      } else {
        selected.classList.add('wrong');
      }
    }
  });
  
  if (resultDiv) {
    const percentage = Math.round((score / totalQuestions) * 100);
    resultDiv.classList.add('show');
    
    const icon = resultDiv.querySelector('.result-icon');
    const message = resultDiv.querySelector('.result-message');
    const scoreEl = resultDiv.querySelector('.score');
    
    scoreEl.textContent = score + ' / ' + totalQuestions + ' (' + percentage + '%)';
    
    if (percentage === 100) {
      icon.textContent = '🏆';
      message.textContent = 'Perfect! You are a Motivation & Mindfulness Master!';
      launchConfetti();
    } else if (percentage >= 70) {
      icon.textContent = '🌟';
      message.textContent = 'Great job! You learned a lot! Keep practicing!';
      launchConfetti();
    } else if (percentage >= 40) {
      icon.textContent = '💪';
      message.textContent = 'Good start! Why not review the topics and try again?';
    } else {
      icon.textContent = '🌱';
      message.textContent = 'Keep growing! Try reviewing the lessons and come back!';
    }
    
    const reviewDiv = resultDiv.querySelector('.answers-review');
    reviewDiv.innerHTML = '<h4>📝 Answer Review:</h4>';
    
    questions.forEach((question, index) => {
      const selected = question.querySelector('.option.selected');
      const correctValue = question.dataset.correct;
      const correctText = question.querySelector(`.option[data-value="${correctValue}"]`).textContent;
      
      const item = document.createElement('div');
      item.className = 'answer-item';
      
      if (selected && selected.dataset.value === correctValue) {
        item.classList.add('correct-answer');
        item.textContent = `Q${index + 1}: ✅ ${correctText}`;
      } else {
        item.classList.add('wrong-answer');
        const selectedText = selected ? selected.textContent : 'Not answered';
        item.textContent = `Q${index + 1}: ❌ You said "${selectedText}" | Correct answer: ${correctText}`;
      }
      
      reviewDiv.appendChild(item);
    });
    
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    if (completionKey) {
      markTopicComplete(completionKey);
    }
  }
}

function resetQuiz(questions, resultDiv, submitBtn) {
  questions.forEach(question => {
    question.querySelectorAll('.option').forEach(opt => {
      opt.classList.remove('selected', 'correct', 'wrong');
    });
  });
  
  if (resultDiv) {
    resultDiv.classList.remove('show');
    const reviewDiv = resultDiv.querySelector('.answers-review');
    if (reviewDiv) reviewDiv.innerHTML = '';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }
  
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
  }
}

// ===== SOUND EFFECTS (simple) =====
function playSound(type) {
  // Could add Web Audio API sounds here
  // For now, it's a placeholder for future enhancement
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
  // Arrow key navigation between topics
  if (e.key === 'ArrowLeft') {
    const prevLink = document.querySelector('.prev-link');
    if (prevLink) window.location.href = prevLink.getAttribute('href');
  }
  if (e.key === 'ArrowRight') {
    const nextLink = document.querySelector('.next-link');
    if (nextLink) window.location.href = nextLink.getAttribute('href');
  }
});

console.log('🌟 Welcome to the Motivation & Mindfulness Course for Kids!');
console.log('💡 Tip: Use left/right arrow keys to navigate between topics!');