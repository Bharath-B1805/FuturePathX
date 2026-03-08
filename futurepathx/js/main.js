// ── Future PathX – Main JS ──

// Chat Widget
function toggleChat() {
  const panel = document.getElementById('chatPanel');
  panel.classList.toggle('open');
}

const botReplies = {
  python: "Python is great for Data Science, AI Engineering, and Backend Development. I'd recommend starting with Python basics, then moving into libraries like Pandas, NumPy, and TensorFlow.",
  data: "Data Scientist is one of the most in-demand roles! You'll need Python, SQL, Statistics, and Machine Learning skills. Check our roadmap for a step-by-step guide.",
  resume: "A strong resume should have clear sections: Personal Info, Education, Skills, Projects, and Experience. Use our Resume Builder to create one! Also check your ATS score.",
  career: "Based on common profiles, popular tech careers include AI Engineer, Data Scientist, Software Developer, and Cloud Architect. Take our Career Test for personalized suggestions!",
  skill: "Visit our Skill Gap Analyzer to see what skills you're missing for your target career. We also recommend learning resources for each missing skill.",
  ai: "AI Engineering involves Python, Machine Learning, Deep Learning, and frameworks like TensorFlow and PyTorch. Check our AI Engineer Roadmap for a complete guide.",
  default: "That's a great question! I'd recommend exploring our Career Test for personalized guidance, or browsing the Career Explorer for detailed career profiles. You can also check the Learning Resources section. 🚀"
};

function sendChat() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const text = input.value.trim();
  if (!text) return;

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg user';
  userMsg.textContent = text;
  messages.appendChild(userMsg);
  input.value = '';

  // Bot reply
  setTimeout(() => {
    const lower = text.toLowerCase();
    let reply = botReplies.default;
    for (const [key, val] of Object.entries(botReplies)) {
      if (lower.includes(key)) { reply = val; break; }
    }
    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.textContent = reply;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 600);

  messages.scrollTop = messages.scrollHeight;
}

// Animate progress bars on scroll
function animateOnScroll() {
  const bars = document.querySelectorAll('.progress-bar-fill, .score-fill');
  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// Tag input helper (used in multiple pages)
function initTagInput(inputId, containerId, storageKey) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);
  if (!input || !container) return;

  let tags = JSON.parse(localStorage.getItem(storageKey) || '[]');
  renderTags();

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.value.trim().replace(',', '');
      if (val && !tags.includes(val)) {
        tags.push(val);
        localStorage.setItem(storageKey, JSON.stringify(tags));
        renderTags();
      }
      input.value = '';
    }
  });

  function renderTags() {
    container.innerHTML = '';
    tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.innerHTML = `${t} <button onclick="removeTag('${storageKey}','${t}')">✕</button>`;
      container.appendChild(tag);
    });
  }
}

function removeTag(storageKey, val) {
  let tags = JSON.parse(localStorage.getItem(storageKey) || '[]');
  tags = tags.filter(t => t !== val);
  localStorage.setItem(storageKey, JSON.stringify(tags));
  location.reload(); // Simple refresh; in production use state mgmt
}
