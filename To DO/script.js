document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const scoreDisplay = document.getElementById('score');
  const levelDisplay = document.getElementById('level');
  const celebration = document.getElementById('celebration');
  const inviteBtn = document.getElementById('inviteBtn');

  let score = 0;
  let level = 1;

  // Add task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.className = 'task-item rounded p-3 mb-2 d-flex align-items-center';

    li.innerHTML = `
          <input type="checkbox" class="form-check-input me-3 task-checkbox">
          <span class="task-text flex-grow-1">${taskText}</span>
          <button class="btn btn-sm btn-outline-danger delete-btn">
              <i class="fas fa-trash"></i>
          </button>
      `;

    taskList.appendChild(li);
    taskInput.value = '';

    // Add event listeners
    li.querySelector('.task-checkbox').addEventListener('change', toggleTask);
    li.querySelector('.delete-btn').addEventListener('click', () => li.remove());
  }

  // Toggle task completion
  function toggleTask(e) {
    const taskText = e.target.nextElementSibling;
    taskText.classList.toggle('completed');

    if (e.target.checked) {
      score += 10;
      scoreDisplay.textContent = score;
      showCelebration();
      checkLevelUp();
    } else {
      score -= 10;
      scoreDisplay.textContent = score;
    }
  }

  // Show celebration
  function showCelebration() {
    celebration.classList.remove('d-none');
    setTimeout(() => celebration.classList.add('d-none'), 10000);
  }


  // Check level up with celebrations and music
  function checkLevelUp() {
    if (score >= level * 50) {
      level++;
      levelDisplay.textContent = level;

      // Show celebration
      const celebration = document.getElementById('levelUpCelebration');
      document.getElementById('celebratedLevel').textContent = level;

      celebration.style.animation = 'fadeIn 0.5s forwards';
      celebration.classList.remove('d-none');

      // Start celebration music
      const celebrationAudio = document.getElementById('celebrationAudio');
      celebrationAudio.currentTime = 0; // Rewind to start
      celebrationAudio.play();

      // Hide after 3 seconds and stop music
      setTimeout(() => {
        celebration.style.animation = 'fadeOut 0.30s forwards';
        setTimeout(() => celebration.classList.add('d-none'), 10000);
        celebrationAudio.pause();
      }, 10000);
    }
  }

  // Music functions
  function startLevelUpMusic() {

    if (!window.levelUpAudio) {
      window.levelUpAudio = new Audio('eternal-celebration-293494.mp3');
      window.levelUpAudio.addEventListener('canplaythrough', () => {
        console.log('Audio is ready to play.');
      });
      window.levelUpAudio.loop = true;
      // Ensure audio is loaded after user interaction
      document.body.addEventListener('click', () => {
        if (window.levelUpAudio.paused) {
          window.levelUpAudio.play().catch(error => {
            console.error('Audio playback failed:', error);
          });
        }
      }, { once: true });
    }

    // Start music
    window.levelUpAudio.play();

    // Start visualizer animation
    document.querySelectorAll('.visualizer-bar').forEach(bar => {
      bar.classList.remove('paused');
      bar.style.animationDuration = `${Math.random() * 0.3 + 0.2}s`; // Random speed
    });
  }

  function stopLevelUpMusic() {
    if (window.levelUpAudio) {
      window.levelUpAudio.pause();
      window.levelUpAudio.currentTime = 0;
    }

    // Stop visualizer animation
    document.querySelectorAll('.visualizer-bar').forEach(bar => {
      bar.classList.add('paused');
    });
  }

  inviteBtn.addEventListener('click', () => {
    if (window.levelUpAudio) {
      window.levelUpAudio.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
    stopLevelUpMusic();
    alert("Challenge your friends to beat your high score! 🏆");
  });

  // Event listeners
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
});