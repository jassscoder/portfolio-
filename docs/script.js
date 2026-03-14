AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

/* Preloader - hide immediately if script loads */
const preloader = document.getElementById("preloader");
if (preloader) preloader.style.display = "none";

/* Preloader */
window.addEventListener("load",()=>{
const preloader = document.getElementById("preloader");
if (preloader) preloader.style.display="none";
});

// Fallback: hide preloader after 5 seconds if load event doesn't fire
setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
}, 5000);

/* Advanced Typing Effect */
const typing = document.querySelector(".typing");
const words = ["Full Stack Developer", "UI/UX Designer", "React Specialist", "Node.js Expert", "Problem Solver", "Creative Thinker"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function advancedType() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typing.textContent = currentChar;

    // Add cursor effect
    if (!isDeleting && charIndex < currentWord.length) {
        // Typing forward
        charIndex++;
        setTimeout(advancedType, 120); // Slower typing speed
    } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        charIndex--;
        setTimeout(advancedType, 60); // Faster deleting speed
    } else if (!isDeleting && charIndex === currentWord.length) {
        // Finished typing, pause before deleting
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            advancedType();
        }, 2000); // Pause for 2 seconds when word is complete
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(advancedType, 500); // Pause before starting next word
    }
}

// Start typing animation with initial delay
setTimeout(() => {
    advancedType();
}, 1500); // Wait 1.5 seconds before starting

/* Scroll Progress */
window.onscroll=()=>{
let winScroll=document.body.scrollTop||document.documentElement.scrollTop;
let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
document.getElementById("progress-bar").style.width=(winScroll/height)*100+"%";
};

/* Persistent Theme Toggle */
const THEME_KEY = 'portfolioTheme';
function loadTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved === 'dark'){
        document.body.classList.add('dark');
    }
}
function saveTheme(){
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}
document.getElementById("theme-toggle").onclick=()=>{
    document.body.classList.toggle("dark");
    const themeIcon = document.querySelector("#theme-toggle i");
    if(document.body.classList.contains("dark")){
        themeIcon.className = "fas fa-sun";
    } else {
        themeIcon.className = "fas fa-moon";
    }
    saveTheme();
};
loadTheme();

/* Share Button */
document.getElementById("share-btn").onclick=()=>{
    const url = window.location.href;
    if(navigator.share){
        navigator.share({
            title: 'Jaspher Portfolio',
            text: 'Check out my portfolio!',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url).then(()=>{
            alert('Portfolio URL copied to clipboard!');
        }).catch(()=>{
            prompt('Copy this URL:', url);
        });
    }
};


/* Portfolio DB (local storage + editable JSON) */
const PORTFOLIO_DB_KEY = 'portfolioDB';

function getPortfolioDB() {
    try {
        const saved = localStorage.getItem(PORTFOLIO_DB_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Unable to parse stored portfolio database:', e);
    }
    return window.portfolioDB || {};
}

function savePortfolioDB(data) {
    try {
        localStorage.setItem(PORTFOLIO_DB_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Unable to save portfolio database:', e);
    }
}

function resetPortfolioDB() {
    localStorage.removeItem(PORTFOLIO_DB_KEY);
    return getPortfolioDB();
}

function openDbModal() {
    const db = getPortfolioDB();
    const textarea = document.getElementById('dbJson');
    textarea.value = JSON.stringify(db, null, 2);
    document.getElementById('dbModal').style.display = 'flex';
    // Auto-save on input
    textarea.addEventListener('input', autoSaveDb);
}

function closeDbModal() {
    document.getElementById('dbModal').style.display = 'none';
    const textarea = document.getElementById('dbJson');
    textarea.removeEventListener('input', autoSaveDb);
}

function autoSaveDb() {
    const textarea = document.getElementById('dbJson');
    try {
        const parsed = JSON.parse(textarea.value);
        savePortfolioDB(parsed);
        // Optional: show save indicator
    } catch (e) {
        // Invalid JSON, don't save
    }
}

function copyDbJson() {
    const textarea = document.getElementById('dbJson');
    navigator.clipboard.writeText(textarea.value).then(()=>{
        alert('JSON copied to clipboard!');
    }).catch(()=>{
        textarea.select();
        document.execCommand('copy');
        alert('JSON copied!');
    });
}

function exportDbJson() {
    const db = getPortfolioDB();
    const dataStr = JSON.stringify(db, null, 2);
    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-db.json';
    a.click();
    URL.revokeObjectURL(url);
}

/* Modal */
function openModal(title){
    const db = getPortfolioDB();
    const projectData = Array.isArray(db.projects) ? db.projects : [];
    const project = projectData.find(p => p.name === title) || {};

    document.getElementById("modalTitle").innerText = project.name || title;
    document.getElementById("modalDesc").innerText = project.description || 'Description will be added soon.';
    const linkEl = document.getElementById("modalLink");
    if(project.url){
        linkEl.href = project.url;
        linkEl.style.display = 'inline-block';
    } else {
        linkEl.style.display = 'none';
    }
    document.getElementById("projectModal").style.display="flex";
}

function renderProjects(){
    const grid = document.querySelector('.project-grid');
    if(!grid) return;
    const db = getPortfolioDB();
    const projectData = Array.isArray(db.projects) ? db.projects : [];
    grid.innerHTML = projectData.map(p=>{
        const safeName = (p.name || '').replace(/'/g, "\\'");
        const subtitle = p.subtitle || '';
        return `\n        <div class="card tilt" onclick="openModal('${safeName}')">\n            <h3>${p.name || 'Untitled'}</h3>\n            <p class="card-subtitle">${subtitle}</p>\n        </div>`;
    }).join('');
    // Re-init tilt effects for the new cards
    VanillaTilt.init(document.querySelectorAll(".tilt"),{
        max:25,
        speed:400,
        glare:true,
        "max-glare":0.5
    });
}

function closeModal(){
    document.getElementById("projectModal").style.display="none";
}

// Render data-driven project cards
renderProjects();

/* Mobile Menu */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.onclick=()=>{
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
};

// close mobile menu when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener("mousemove",(e)=>{
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor) cursor.style.left=e.clientX+"px";
if (cursor) cursor.style.top=e.clientY+"px";
if (follower) follower.style.left=e.clientX-10+"px";
if (follower) follower.style.top=e.clientY-10+"px";
});

/* Particles */
particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.json');

/* Tilt */
VanillaTilt.init(document.querySelectorAll(".tilt"),{
max:25,
speed:400,
glare:true,
"max-glare":0.5
});

/* Portfolio DB button bindings */
const dbOpenBtn = document.getElementById('db-open');
if (dbOpenBtn) dbOpenBtn.addEventListener('click', openDbModal);

const dbCopyBtn = document.getElementById('dbCopy');
if (dbCopyBtn) dbCopyBtn.addEventListener('click', copyDbJson);

const dbExportBtn = document.getElementById('dbExport');
if (dbExportBtn) dbExportBtn.addEventListener('click', exportDbJson);

const dbSaveBtn = document.getElementById('dbSave');
if (dbSaveBtn) dbSaveBtn.addEventListener('click', () => {
    const textarea = document.getElementById('dbJson');
    try {
        const parsed = JSON.parse(textarea.value);
        savePortfolioDB(parsed);
        alert('Portfolio database saved locally.');
    } catch (e) {
        alert('Invalid JSON. Please fix any syntax errors before saving.');
    }
});

const dbResetBtn = document.getElementById('dbReset');
if (dbResetBtn) dbResetBtn.addEventListener('click', () => {
    resetPortfolioDB();
    openDbModal();
});

// Close modals when clicking outside their content
window.addEventListener('click', (event) => {
    if (event.target.id === 'projectModal') closeModal();
    if (event.target.id === 'dbModal') closeDbModal();
});

/* Contact Form */
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate sending (replace with actual API call)
    console.log('Contact form submitted:', data);
    alert('Thank you for your message! I\'ll get back to you within 24 hours.');

    // Reset form
    e.target.reset();
});

/* ===== BALL BOUNCE GAME ===== */
class Ball {
    constructor(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
        this.trail = [];
        this.maxTrail = 10;
    }

    update(canvas) {
        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) {
            this.trail.shift();
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Add gravity
        this.vy += 0.3;

        // Bounce off walls
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.vx *= -0.8; // Damping
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.vy *= -0.8; // Damping
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }

        // Stop very slow movement
        if (Math.abs(this.vx) < 0.1) this.vx = 0;
        if (Math.abs(this.vy) < 0.1) this.vy = 0;
    }

    draw(ctx) {
        // Draw trail
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < this.trail.length; i++) {
            const alpha = (i / this.trail.length) * 0.3;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(this.trail[i].x, this.trail[i].y, this.radius * (1 - i / this.trail.length), 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Draw ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    collidesWith(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + other.radius;
    }

    resolveCollision(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return; // Avoid division by zero

        // Normalize
        const nx = dx / distance;
        const ny = dy / distance;

        // Separate balls
        const overlap = this.radius + other.radius - distance;
        this.x += nx * overlap * 0.5;
        this.y += ny * overlap * 0.5;
        other.x -= nx * overlap * 0.5;
        other.y -= ny * overlap * 0.5;

        // Swap velocities
        const tempVx = this.vx;
        const tempVy = this.vy;
        this.vx = other.vx * 0.9;
        this.vy = other.vy * 0.9;
        other.vx = tempVx * 0.9;
        other.vy = tempVy * 0.9;
    }
}

class BallGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.balls = [];
        this.animationId = null;
        this.colors = [
            '#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24',
            '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8'
        ];

        this.init();
    }

    init() {
        this.canvas.addEventListener('click', (e) => this.addBall(e));
        this.animate();
    }

    addBall(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const vx = (Math.random() - 0.5) * 10;
        const vy = (Math.random() - 0.5) * 10;
        const radius = Math.random() * 15 + 10;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.balls.push(new Ball(x, y, vx, vy, radius, color));
        this.updateBallCount();
    }

    updateBallCount() {
        const countElement = document.getElementById('ballCount');
        if (countElement) {
            countElement.textContent = `Balls: ${this.balls.length}`;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw balls
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update(this.canvas);

            // Check collisions
            for (let j = i + 1; j < this.balls.length; j++) {
                if (this.balls[i].collidesWith(this.balls[j])) {
                    this.balls[i].resolveCollision(this.balls[j]);
                }
            }

            this.balls[i].draw(this.ctx);
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    reset() {
        this.balls = [];
        this.updateBallCount();
    }

    addRandomBall() {
        const x = Math.random() * (this.canvas.width - 40) + 20;
        const y = Math.random() * (this.canvas.height - 40) + 20;
        const vx = (Math.random() - 0.5) * 10;
        const vy = (Math.random() - 0.5) * 10;
        const radius = Math.random() * 15 + 10;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.balls.push(new Ball(x, y, vx, vy, radius, color));
        this.updateBallCount();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const game = new BallGame(canvas);

        // Add ball button
        const addBallBtn = document.getElementById('addBallBtn');
        if (addBallBtn) {
            addBallBtn.addEventListener('click', () => game.addRandomBall());
        }

        // Reset button
        const resetBtn = document.getElementById('resetGameBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => game.reset());
        }
    }
});
