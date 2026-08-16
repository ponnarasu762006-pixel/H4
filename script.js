/* =========================================
   BASIC SETTINGS
========================================= */

// CHANGE THIS PASSWORD
const SECRET_PASSWORD = "HP20082006";

// CHANGE THIS TO HER BIRTHDAY
// Format: YYYY-MM-DDTHH:MM:SS
const BIRTHDAY = "2027-05-28T00:00:00";


function toggleMusic() {

    const music =
        document.getElementById("backgroundMusic");

    if (!music) return;

    if (music.paused) {

        music.play();

    } else {

        music.pause();

    }
}


/* =========================================
   FLOATING HEARTS
========================================= */

function createHeart() {

    const container = document.querySelector(".hearts");

    if (!container) return;

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "🌹"
    ];

    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

setInterval(createHeart, 600);


/* =========================================
   PASSWORD
========================================= */

function checkPassword() {

    const input =
        document.getElementById("password");

    const error =
        document.getElementById("wrongPassword");

    if (!input) return;

    if (input.value === SECRET_PASSWORD) {

        localStorage.setItem(
            "birthdayUnlocked",
            "true"
        );

        window.location.href =
            "story.html";

    } else {

        error.textContent =
            "Hmm... that's not the secret ❤️ Try again.";

        input.value = "";

        input.focus();
    }
}


/* Allow Enter key for password */

const passwordInput =
    document.getElementById("password");

if (passwordInput) {

    passwordInput.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {
                checkPassword();
            }

        }
    );
}


/* =========================================
   COUNTDOWN
========================================= */

function updateCountdown() {

    const target =
        new Date(BIRTHDAY).getTime();

    const now =
        new Date().getTime();

    const difference =
        target - now;

    if (difference <= 0) {

        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");

        if (days) days.textContent = "00";
        if (hours) hours.textContent = "00";
        if (minutes) minutes.textContent = "00";
        if (seconds) seconds.textContent = "00";

        return;
    }

    const daysValue =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

    const hoursValue =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

    const minutesValue =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const secondsValue =
        Math.floor(
            (difference / 1000) % 60
        );

    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");

    if (days)
        days.textContent =
            String(daysValue).padStart(2,"0");

    if (hours)
        hours.textContent =
            String(hoursValue).padStart(2,"0");

    if (minutes)
        minutes.textContent =
            String(minutesValue).padStart(2,"0");

    if (seconds)
        seconds.textContent =
            String(secondsValue).padStart(2,"0");
}

updateCountdown();

setInterval(updateCountdown,1000);


/* =========================================
   ENVELOPE
========================================= */

const envelope =
    document.getElementById("envelope");

if (envelope) {

    envelope.addEventListener(
        "click",
        function() {

            envelope.classList.toggle("open");

            if (envelope.classList.contains("open")) {

                typeMessage();

                const instruction =
                    document.getElementById(
                        "envelopeInstruction"
                    );

                if (instruction)
                    instruction.textContent =
                        "A message from my heart ❤️";

            }

        }
    );
}


/* =========================================
   TYPING EFFECT
========================================= */

function typeMessage() {

    const element =
        document.getElementById("typingText");

    if (!element) return;

    if (element.dataset.started)
        return;

    element.dataset.started = "true";

    const message =
        "I made this little world for you because you are one of the most beautiful parts of my life. Happy Birthday, my love. ❤️";

    let index = 0;

    function type() {

        if (index < message.length) {

            element.textContent +=
                message.charAt(index);

            index++;

            setTimeout(type,45);

        } else {

            const button =
                document.getElementById(
                    "continueButton"
                );

            if (button)
                button.classList.remove("hidden");
        }
    }

    type();
}


/* =========================================
   PHOTO SLIDESHOW
========================================= */

const slides = [

    {
        image: "images/photo1.jpg",
        text: "The beginning of something beautiful ❤️"
    },

    {
        image: "images/photo2.jpg",
        text: "A memory I'll always keep close to my heart."
    },

    {
        image: "images/photo3.jpg",
        text: "Your smile makes everything better 🥰"
    },

    {
        image: "images/photo4.jpg",
        text: "One moment, a thousand feelings."
    },

    {
        image: "images/photo5.jpg",
        text: "Distance can't erase this memory."
    },

    {
        image: "images/photo6.jpg",
        text: "Every memory with you is special."
    },

    {
        image: "images/photo7.jpg",
        text: "And our story is still being written..."
    },

    {
        image: "images/photo8.jpg",
        text: "More beautiful memories are waiting for us. ❤️"
    }

];

let currentSlide = 0;

function showSlide(index) {

    const image =
        document.getElementById("slideImage");

    const caption =
        document.getElementById("slideCaption");

    if (!image || !caption) return;

    if (index >= slides.length)
        currentSlide = 0;

    if (index < 0)
        currentSlide = slides.length - 1;

    image.style.opacity = "0";

    setTimeout(() => {

        image.src =
            slides[currentSlide].image;

        caption.textContent =
            slides[currentSlide].text;

        image.style.opacity = "1";

    },300);

    updateDots();
}


function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length)
        currentSlide = 0;

    showSlide(currentSlide);
}


function previousSlide() {

    currentSlide--;

    if (currentSlide < 0)
        currentSlide = slides.length - 1;

    showSlide(currentSlide);
}


function createDots() {

    const dots =
        document.getElementById("dots");

    if (!dots) return;

    dots.innerHTML = "";

    slides.forEach((slide,index) => {

        const dot =
            document.createElement("span");

        dot.className =
            "dot";

        if (index === currentSlide)
            dot.classList.add("active");

        dot.onclick = () => {

            currentSlide = index;

            showSlide(currentSlide);

        };

        dots.appendChild(dot);

    });
}


function updateDots() {

    const dots =
        document.querySelectorAll(".dot");

    dots.forEach((dot,index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });
}

createDots();

if (document.getElementById("slideImage")) {

    setInterval(() => {
        nextSlide();
    },5000);

}


/* =========================================
   YES / NO QUESTION
========================================= */

function sayYes() {

    const message =
        document.getElementById("yesMessage");

    if (message)
        message.classList.remove("hidden");

    const yes =
        document.getElementById("yesButton");

    const no =
        document.getElementById("noButton");

    if (yes)
        yes.style.display = "none";

    if (no)
        no.style.display = "none";

    for (let i = 0; i < 10; i++) {

        setTimeout(
            createHeart,
            i * 100
        );

    }
}


function moveNoButton() {

    const button =
        document.getElementById("noButton");

    if (!button) return;

    const maxX =
        Math.max(
            20,
            window.innerWidth - 160
        );

    const maxY =
        Math.max(
            20,
            window.innerHeight - 100
        );

    button.style.position = "fixed";

    button.style.left =
        Math.random() * maxX + "px";

    button.style.top =
        Math.random() * maxY + "px";

    button.textContent =
        "You can't escape 😜";
}


/* =========================================
   FINAL GIFT
========================================= */

function openFinalGift() {

    const gift =
        document.getElementById("gift");

    const title =
        document.getElementById("finalTitle");

    const instruction =
        document.getElementById(
            "finalInstruction"
        );

    const message =
        document.getElementById(
            "finalMessage"
        );

    if (gift)
        gift.style.display = "none";

    if (title)
        title.style.display = "none";

    if (instruction)
        instruction.style.display = "none";

    if (message)
        message.classList.remove("hidden");

    startFireworks();

    for (let i = 0; i < 30; i++) {

        setTimeout(
            createHeart,
            i * 100
        );

    }
}


/* =========================================
   FIREWORKS
========================================= */

let fireworksRunning = false;

function startFireworks() {

    const canvas =
        document.getElementById("fireworks");

    if (!canvas) return;

    if (fireworksRunning) return;

    fireworksRunning = true;

    const ctx =
        canvas.getContext("2d");

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    let particles = [];

    function createFirework() {

        const x =
            Math.random() *
            canvas.width;

        const y =
            Math.random() *
            canvas.height *
            0.55;

        const colors = [
            "#ff4081",
            "#ffeb3b",
            "#40c4ff",
            "#69f0ae",
            "#ffffff",
            "#e040fb"
        ];

        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        for (let i = 0; i < 70; i++) {

            const angle =
                Math.random() *
                Math.PI * 2;

            const speed =
                Math.random() * 6 + 2;

            particles.push({

                x: x,
                y: y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life: 100,

                color: color

            });

        }
    }


    function animate() {

        ctx.fillStyle =
            "rgba(20,0,10,0.18)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        if (Math.random() < 0.04)
            createFirework();

        particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy +=
                    0.05;

                particle.life--;

                ctx.globalAlpha =
                    particle.life / 100;

                ctx.fillStyle =
                    particle.color;

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    2,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }
        );

        particles =
            particles.filter(
                particle =>
                    particle.life > 0
            );

        ctx.globalAlpha = 1;

        requestAnimationFrame(animate);
    }

    animate();
}


/* Resize fireworks */

window.addEventListener(
    "resize",
    () => {

        const canvas =
            document.getElementById(
                "fireworks"
            );

        if (canvas) {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;

        }

    }
);