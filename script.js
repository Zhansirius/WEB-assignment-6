document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector("span");
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                icon.textContent = "-";
            } else {
                answer.style.display = "none";
                icon.textContent = "+";
            }
        });
    });

    const contactBtn = document.getElementById("contactUsBtn");
    const popupForm = document.getElementById("popupForm");
    const closePopup = document.getElementById("closePopup");

    if (contactBtn && popupForm) {

        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            popupForm.style.display = "flex";
        });
    }

    if (closePopup && popupForm) {

        closePopup.addEventListener("click", () => {
            popupForm.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === popupForm) {
            popupForm.style.display = "none";
        }
    });

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = document.getElementById("popEmail").value;
            const password = document.getElementById("popPassword").value;
            const confirm = document.getElementById("popConfirm").value;
            
            const emailError = document.getElementById("emailError");
            const passwordError = document.getElementById("passwordError");
            const confirmError = document.getElementById("confirmError");
            
            let isValid = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.style.display = "block";
                isValid = false;
            } else {
                emailError.style.display = "none";
            }

            if (password.length < 6) {
                passwordError.style.display = "block";
                isValid = false;
            } else {
                passwordError.style.display = "none";
            }

            if (password !== confirm) {
                confirmError.style.display = "block";
                isValid = false;
            } else {
                confirmError.style.display = "none";
            }

            if (isValid) {
                alert("Form send succesfully!");
                form.reset();
                popupForm.style.display = "none";
            }
        });
    }
});


/* Task 4: Change Background Color */

const changeBackgroundBtn = document.getElementById("changeBackgroundBtn");

const backgroundColors = [
    "#0b0b0b",
    "#102a43",
    "#243b2f",
    "#3b243a",
    "#302b1d"
];

let backgroundColorIndex = 0;

if (changeBackgroundBtn) {
    changeBackgroundBtn.addEventListener("click", function() {
        backgroundColorIndex++;

        if (backgroundColorIndex >= backgroundColors.length) {
            backgroundColorIndex = 0;
        }

        document.body.style.backgroundColor =
            backgroundColors[backgroundColorIndex];
    });
}


/* Task 5: Display Current Date and Time */

const currentDateTime = document.getElementById("currentDateTime");

function updateDateTime() {
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).format(now);

    if (currentDateTime) {
        currentDateTime.textContent = formattedDate;
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);


/* Animation of transitions between pages */

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("pageOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !href.startsWith("http") && href !== "#" && link.id !== "contactUsBtn") {
                e.preventDefault();
                if (overlay) {
                    overlay.classList.add("active");
                    setTimeout(() => {
                        window.location.href = href;
                    }, 250);
                } else {
                    window.location.href = href;
                }
            }
        });
    });
});

/* Sound Randomizer */

const playRandomSoundBtn = document.getElementById("playRandomSoundBtn");

const soundFiles = [
    "assets/sounds/sound1.mp3",
    "assets/sounds/sound2.mp3",
    "assets/sounds/sound3.mp3",
    "assets/sounds/sound4.mp3",
    "assets/sounds/sound5.mp3",
    "assets/sounds/sound6.mp3",
    "assets/sounds/sound7.mp3"
];

let currentAudio = null;
let lastSoundIndex = -1;

if (playRandomSoundBtn) {
    playRandomSoundBtn.addEventListener("click", function() {
        if (soundFiles.length === 0) return;

        let randomIndex;

        if (soundFiles.length > 1) {
            do {
                randomIndex = Math.floor(Math.random() * soundFiles.length);
            } while (randomIndex === lastSoundIndex);
        } else {
            randomIndex = 0;
        }

        lastSoundIndex = randomIndex;
        const selectedSound = soundFiles[randomIndex];

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(selectedSound);
        currentAudio.volume = 0.5;

        currentAudio.play().catch(error => {
            console.warn("Audio error:", error);
        });
    });
}

// asik 5 | Task 1: Dynamic greeting using switch

const timeGreeting = document.getElementById("timeGreeting");

function showGreeting() {
    if (!timeGreeting) return;

    const hour = new Date().getHours();
    let greeting;

    switch (true) {
        case hour < 12:
            greeting = "Good morning, Stalker!";
            break;
        case hour < 18:
            greeting = "Good afternoon, Stalker!";
            break;
        default:
            greeting = "Good evening, Stalker!";
    }

    timeGreeting.textContent = greeting;
}

showGreeting();

// asik 5 | Task 2: Keyboard navigation

document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(
        ".navbar-nav .nav-link"
    );

    menuLinks.forEach((link, index) => {
        link.addEventListener("keydown", (event) => {
            let nextIndex = index;

            switch (event.key) {
                case "ArrowDown":
                case "ArrowRight":
                    nextIndex = (index + 1) % menuLinks.length;
                    break;

                case "ArrowUp":
                case "ArrowLeft":
                    nextIndex =
                        (index - 1 + menuLinks.length) % menuLinks.length;
                    break;

                default:
                    return;
            }

            event.preventDefault();
            menuLinks[nextIndex].focus();
        });
    });
});


// Task 0: Setup jQuery
$(document).ready(function() {
    console.log("jQuery is ready!");

    // Task 4: Colorful and Stylized Scroll Progress Bar
    $(window).scroll(function() {
        let scrollTop = $(window).scrollTop();
        let docHeight = $(document).height();
        let winHeight = $(window).height();
        let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        $('#scrollProgressBar').css('width', scrollPercent + '%');
    });

    // Task 5: Animated Number Counter
    $('.counter').each(function() {
        let $this = $(this);
        let target = $this.data('target');
        
        $({ countNum: $this.text() }).animate({
            countNum: target
        }, {
            duration: 2500,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        });
    });

    // Task 6 & 7: Loading spinner on Submit & Notification System
    $('.custom-form').on('submit', function(e) {
        e.preventDefault();
        
        let $btn = $(this).find('.submit-btn');
        let $btnText = $btn.find('.btn-text');
        let $spinner = $btn.find('.spinner');
        
        // Task 6: Spinner
        $btn.prop('disabled', true);
        $btnText.hide();
        $spinner.show();
        
        // Server thinking imitation. 2 seconds delay
        setTimeout(function() {
            $btn.prop('disabled', false);
            $spinner.hide();
            $btnText.show();
            
            $('.custom-form')[0].reset();
            
            // Task 7: Notification
            $('#toastNotification').text("Donated succesfully!").fadeIn(400);
            
            // Hiding notification in 3 seconds
            setTimeout(function() {
                $('#toastNotification').fadeOut(400);
            }, 3000);
            
        }, 2000);
    });

    // Task 8: Copied to Clipboard Button
    $('.copy-btn').on('click', function() {
        let $btn = $(this);
        // Finding text
        let textToCopy = $btn.siblings('.faq-text').text(); 
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            let originalText = $btn.html();
            $btn.html('✅ Copied to clipboard!');
            $btn.addClass('copied');

            setTimeout(() => {
                $btn.html(originalText);
                $btn.removeClass('copied');
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    });
});