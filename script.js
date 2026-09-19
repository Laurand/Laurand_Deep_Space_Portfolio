// Website created by Laurand Osmeni Sep 18 2026
const askForm = document.querySelector('#askForm');
const askInput = document.querySelector('#askInput');
const responseConsole = document.querySelector('.response-console');
const responseKicker = document.querySelector('#responseKicker');
const responseTitle = document.querySelector('#responseTitle');
const responseBody = document.querySelector('#responseBody');
const responseTags = document.querySelector('#responseTags');
const responseState = document.querySelector('#responseState');
const missionLog = document.querySelector('#missionLog');
const lifeLog = document.querySelector('#lifeLog');
const soundToggle = document.querySelector('#soundToggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let soundEnabled = true;
let audioContext;

const knowledge = {
  profile: {
    kicker: 'IDENTITY PROFILE',
    title: 'A builder who understands systems and people.',
    body: `<p>Laurand Osmeni is a software engineer, independent app developer, and operations leader based in California.</p><p>He combines more than a decade of product ownership with practical experience leading teams through demanding, fast-moving environments.</p>`,
    tags: ['SOFTWARE ENGINEERING', 'PRODUCT OWNERSHIP', 'LEADERSHIP']
  },
  skills: {
    kicker: 'CAPABILITY INDEX',
    title: 'Languages, platforms, and engineering systems.',
    body: `<p><strong>Core:</strong> C++, JavaScript, HTML, CSS, Python, Java, TypeScript, SQL, and SwiftUI development.</p><p><strong>Platforms:</strong> iPhone, iPad, Mac, web, React, NestJS, Firebase, PostgreSQL, Core Data, and SwiftData.</p>`,
    tags: ['C++', 'JAVASCRIPT', 'HTML + CSS', 'SWIFTUI', 'PYTHON', 'JAVA']
  },
  projects: {
    kicker: 'PROJECT ARCHIVE',
    title: 'Products developed from idea to release.',
    body: `<ul><li><strong>Family Walkie Talkie</strong> — peer-to-peer voice communication.</li><li><strong>Speak It. Scan It. Solve It.</strong> — offline speech, text, and photo math.</li><li><strong>Animal Record Keeper</strong> — care records, alarms, walks, routes, and history.</li><li><strong>Command Word Jumble</strong> — competitive word gameplay across Apple platforms.</li><li><strong>Rendoor and Londvera</strong> — practical full-stack and responsive web development.</li></ul>`,
    tags: ['MOBILE APPS', 'WEB PRODUCTS', 'APP STORE', 'FULL STACK']
  },
  experience: {
    kicker: 'MISSION HISTORY',
    title: 'Engineering ownership meets operational leadership.',
    body: `<p><strong>Independent App Developer, 2015–Present:</strong> Owns planning, UI, architecture, development, testing, accessibility, privacy, delivery, and maintenance.</p><p><strong>Operations:</strong> Inventory Control Technician at Lineage Logistics and former Process Assistant at Amazon, leading daily execution for teams of 80+ associates.</p>`,
    tags: ['10+ YEARS', '80+ PEOPLE LED', 'OPERATIONS', 'DELIVERY']
  },
  education: {
    kicker: 'EDUCATION RECORD',
    title: 'Built across computer engineering and computer science.',
    body: `<p><strong>M.S. Computer Engineering</strong> — San Diego State University, 2025.</p><p><strong>B.S. Computer Science</strong> — CSU Monterey Bay, 2023.</p><p>Associate degrees in Natural Science and Computer Science, plus University of Washington training in JavaScript web applications and HTML/CSS development.</p>`,
    tags: ['M.S. COMPUTER ENGINEERING', 'B.S. COMPUTER SCIENCE', 'WEB DEVELOPMENT']
  },
  cpp: {
    kicker: 'LANGUAGE FOCUS',
    title: 'C++ first. Web systems connected.',
    body: `<p>Laurand is strengthening C++ for performance-focused software, robotics, systems, and future-facing engineering.</p><p>His web experience includes JavaScript, HTML, CSS, TypeScript, React, NestJS, databases, responsive interfaces, debugging, and deployment.</p>`,
    tags: ['C++', 'ROBOTICS', 'JAVASCRIPT', 'HTML + CSS', 'TYPESCRIPT']
  },
  swift: {
    kicker: 'APPLE PLATFORM INDEX',
    title: 'SwiftUI products designed for real use.',
    body: `<p>Laurand builds iPhone, iPad, and Mac applications using SwiftUI and Apple frameworks including AVFoundation, MapKit, SwiftData, Vision, Speech, PhotosUI, and MultipeerConnectivity.</p>`,
    tags: ['SWIFTUI', 'IOS', 'IPADOS', 'MACOS', 'XCODE']
  },
  leadership: {
    kicker: 'LEADERSHIP SIGNAL',
    title: 'Technical depth with calm operational execution.',
    body: `<p>Laurand has coordinated staffing, workflow, safety, quality, coaching, and continuous improvement for teams of more than 80 associates per shift.</p><p>He brings that same ownership, communication, and root-cause thinking to software engineering.</p>`,
    tags: ['TEAM LEADERSHIP', 'COACHING', 'ROOT CAUSE', 'PROCESS IMPROVEMENT']
  },
  hire: {
    kicker: 'CANDIDATE ANALYSIS',
    title: 'A rare combination of builder and operator.',
    body: `<p>Laurand can understand a product, build the software, debug the details, communicate with people, and keep execution moving.</p><p>His background connects computer engineering, independent product delivery, and leadership under real operational pressure.</p>`,
    tags: ['ENGINEER', 'OWNER', 'PROBLEM SOLVER', 'LEADER']
  },
  contact: {
    kicker: 'COMMUNICATION CHANNEL',
    title: 'Open to software and technical leadership opportunities.',
    body: `<p>Use the Contact channel on this command deck to open Laurand’s verified portfolio form. You can also explore his GitHub source archive and published Apple software.</p>`,
    tags: ['OPEN TO OPPORTUNITIES', 'CALIFORNIA', 'RELOCATION']
  },
  default: {
    kicker: 'KNOWLEDGE SEARCH',
    title: 'Try a mission-ready question.',
    body: `<p>Ask about Laurand’s programming languages, SwiftUI apps, C++ focus, web development, education, experience, leadership, projects, or how to make contact.</p>`,
    tags: ['PROFILE', 'PROJECTS', 'EXPERIENCE', 'EDUCATION', 'SKILLS']
  }
};

function chooseAnswer(question) {
  const q = question.toLowerCase();
  if (/hire|candidate|why laurand|strength/.test(q)) return knowledge.hire;
  if (/contact|email|reach|opportunit/.test(q)) return knowledge.contact;
  if (/education|degree|school|university|master/.test(q)) return knowledge.education;
  if (/experience|work|amazon|lineage|operations/.test(q)) return knowledge.experience;
  if (/leader|manage|team|people/.test(q)) return knowledge.leadership;
  if (/project|app|build|product/.test(q)) return knowledge.projects;
  if (/swift|ios|ipad|mac|apple/.test(q)) return knowledge.swift;
  if (/c\+\+|javascript|html|css|web|typescript|robot/.test(q)) return knowledge.cpp;
  if (/skill|language|technology|tech|stack|framework/.test(q)) return knowledge.skills;
  if (/who|about|profile|laurand/.test(q)) return knowledge.profile;
  return knowledge.default;
}

function renderAnswer(answer, question) {
  responseState.textContent = 'ANSWER FOUND';
  responseKicker.textContent = answer.kicker;
  responseTitle.textContent = answer.title;
  responseBody.innerHTML = answer.body;
  responseTags.innerHTML = answer.tags.map((tag) => `<span>${tag}</span>`).join('');
  missionLog.textContent = `Knowledge core resolved: “${question}”`;
  responseConsole.classList.remove('flash');
  void responseConsole.offsetWidth;
  responseConsole.classList.add('flash');
  tone(880, .055, .012);
}

function answerQuestion(question) {
  const clean = question.trim();
  if (!clean) return;
  renderAnswer(chooseAnswer(clean), clean);
  if (window.innerWidth < 851) responseConsole.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
}

askForm.addEventListener('submit', (event) => {
  event.preventDefault();
  answerQuestion(askInput.value);
});

document.querySelectorAll('[data-query]').forEach((button) => {
  button.addEventListener('click', () => {
    askInput.value = button.dataset.query;
    answerQuestion(button.dataset.query);
  });
});

document.querySelector('#resetCore').addEventListener('click', () => {
  askInput.value = '';
  renderAnswer(knowledge.profile, 'Reset to identity profile');
  askInput.focus();
});

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(frequency, duration, volume) {
  if (!soundEnabled) return;
  const context = getAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration);
  oscillator.connect(gain); gain.connect(context.destination);
  oscillator.start(); oscillator.stop(context.currentTime + duration);
}

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = `SOUND ${soundEnabled ? 'ON' : 'OFF'}`;
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  if (soundEnabled) tone(720, .06, .01);
});

function updateClock() {
  document.querySelector('#shipClock').textContent = `${new Date().toISOString().slice(11,19)} UTC`;
}
updateClock();
window.setInterval(updateClock, 1000);

const missionLines = [
  'Scanning sector L0 for software engineering opportunities…',
  'Planet candidate Kepler-LX: no life support found yet.',
  'Meteor field detected. Recalculating navigation vector…',
  'Following intelligent signal toward a brighter tomorrow…',
  'C++ systems channel synchronized with web development core.',
  'Human capability signal confirmed: engineering + leadership.',
  'Unknown biosphere located. Deploying curiosity probe…'
];
const lifeLines = [
  'Following unknown signal beyond TRAPPIST-9X…',
  'Liquid water probability rising: 87%.',
  'Organic pattern probability: 94%.',
  'Consciousness scan: searching deeper layers…',
  'Life found. Initiating peaceful observation protocol.'
];
let missionIndex = 0;
let lifeIndex = 0;
window.setInterval(() => {
  missionIndex = (missionIndex + 1) % missionLines.length;
  missionLog.textContent = missionLines[missionIndex];
}, 3200);
window.setInterval(() => {
  lifeIndex = (lifeIndex + 1) % lifeLines.length;
  lifeLog.textContent = lifeLines[lifeIndex];
}, 4100);

let charge = 73;
window.setInterval(() => {
  charge = charge >= 99 ? 73 : charge + 1;
  document.querySelector('#chargeBar').style.width = `${charge}%`;
  document.querySelector('#chargeValue').textContent = `${charge}%`;
}, 1800);
