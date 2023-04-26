const links = Array.from(document.getElementsByClassName("link"));
const sections = Array.from(document.querySelectorAll('section'));
const checkbox = document.querySelector(' .dark input[type="checkbox"]');
const audiocheckbox = document.querySelector(' .audio input[type="checkbox"]');
const html = document.querySelector('html');
const darkMode = localStorage.getItem('dark-mode');
const selector = document.getElementById('transition')
const bodyBackground = document.querySelector('body');
const settingIcon = document.querySelector('.set-icon');
const setList = settingIcon.parentElement.querySelector('.set-list');
const skillProgs = document.querySelectorAll('.skill-prog');
const aboutLink = document.querySelector('a[href="#about"]');
const borderSelect = document.getElementById('border');
const spans = document.querySelectorAll('.color span');
const background = document.getElementById('background');
const savedMainColor = localStorage.getItem('main-color');
const savedAltColor = localStorage.getItem('alt-main');
const savedDataColor = localStorage.getItem('data-color');
const homeImage = document.querySelector('.home .homeImage');
const contImage = document.querySelector('.contact .image img')
let activeSpan = document.querySelector('span.active')
const animation = document.querySelector('.animation');
const animediv = document.querySelector('.anime div');
const btns = document.querySelectorAll('.btn');
const contactInfo = document.querySelectorAll('.contact-container .contact-info, .contact-container .get-in');
const icons = document.querySelectorAll('.slide i');
const contactLink = document.querySelector('a[href="#contact"]');
const popup = document.querySelector('.hire-me')
let isTransitioning = false;
let audio = new Audio("images/click.mp3")

function audioCheck() {
    if (audiocheckbox.checked) {
        audio = new Audio("/images/click.mp3")
    } else {
        audio = null
    }
}

function audioPlay() {
    if (!audio) {
        return
    } else {
        audio.play()
    }
}

window.onload = function () {
    spans.forEach(span => {
        if (span !== activeSpan) {
            span.classList.remove('active');
        }
    });
}

window.addEventListener('load', () => {
    updateBodyBackground();
});

const updateHomeImage = (dataColor) => {
    const homeImage = document.querySelector('.homeImage');
    const homeImageUrl = `url(images/${dataColor}.png)`;
    homeImage.style.backgroundImage = homeImageUrl;
}

const updateCoderImage = (dataColor) => {
    if (!dataColor) {
        dataColor = activeSpan.dataset.color
    }
    contImage.src = `images/coder-${dataColor}.png`;
}

const updateBodyBackground = (imageUrl = '') => {
    if (background.value === 'image') {
        waiting();
        if (imageUrl === '') {
            imageUrl = checkbox.checked ? 'images/dark.jpg' : 'images/light.jpg';
        }
        bodyBackground.style.backgroundImage = `url(${imageUrl})`;
    } else {
        waiting();
        bodyBackground.style.backgroundImage = '';
    }
}

const waiting = () => {
    animation.classList.add('shown')
    setTimeout(() => {
        animation.classList.remove('shown')
    }, 1500);
}

function updateLinks() {
    const selector = document.getElementById('transition');
    if (selector.value === 'fade') {
        links.forEach(link => {
            link.addEventListener("click", fade);
            link.removeEventListener("click", slide);
        });
    } else if (selector.value === 'slide') {
        links.forEach(link => {
            link.addEventListener("click", slide);
            link.removeEventListener("click", fade);
        });
    }
}

const setSectionsOpacity = () => {
    sections.forEach(sec => {
        sec.style.opacity = 0;
        sec.style.zIndex = 1
        sec.style.transition = 'opacity 1s ease-in-out';
    });
};

const showSection = (section) => {
    setTimeout(() => {
        section.style.opacity = 1;
        section.style.zIndex = 3
    }, 1000);
};

const checkImage = () => {
    if (background.value === 'image') {
        borderSelect.value = 'none';
        borderSelect.disabled = true;
    } else {
        borderSelect.disabled = false;
    }
}

function fade(event) {
    if (isTransitioning) {
        return;
    }
    isTransitioning = true;

    event.preventDefault();
    const currentLink = document.querySelector('.active');
    const currentSection = document.querySelector(currentLink.getAttribute('href'));
    const targetLink = this;
    const sectionID = targetLink.getAttribute('href').replace('#', '');
    const section = document.querySelector(`#${sectionID}`);
    if (currentLink === targetLink) {
        isTransitioning = false;
        return;
    } else {
        links.forEach(link => {
            link.classList.remove("active");
        });

        this.classList.add("active");

        setSectionsOpacity();
        showSection(section);

        localStorage.setItem("lastActiveLink", `.${this.classList[0]}`);
        localStorage.setItem("lastActiveSection", `#${sectionID}`);
    }

    setTimeout(() => {
        isTransitioning = false;
    }, 1000); // set this timeout to the duration of your transition
}

function slide(event) {
    if (isTransitioning) {
        return;
    }
    isTransitioning = true;

    event.preventDefault();
    const currentLink = document.querySelector('header .active');
    const currentSection = document.querySelector(currentLink.getAttribute('href'));
    const targetLink = this;
    const sectionID = targetLink.getAttribute('href').replace('#', '');
    const section = document.querySelector(`#${sectionID}`);
    const isFollowing = currentLink.compareDocumentPosition(targetLink) & Node.DOCUMENT_POSITION_FOLLOWING;
    const animationDistance = isFollowing ? '2000px' : '-2000px';
    // Check if the target section is the same as the current section
    if (targetLink === currentLink) {
        isTransitioning = false;
        return;
    }
    // Remove active class from all links and add it to the target link
    links.forEach(link => {
        link.classList.remove("active");
    });
    this.classList.add("active");
    // Set the animation styles for the current and target sections
    currentSection.style.cssText = `
      transition: transform 1s, opacity 1s;
      transform: translateX(${animationDistance});
      opacity: 0;
      z-index: 1;
    `;
    section.style.cssText = `
      transition: opacity 1s .3s;
      opacity: 1;
      z-index: 3;
    `;
    // Reset the transform of the current section after the animation completes
    setTimeout(() => {
        currentSection.style.transform = "translateX(0)";
        isTransitioning = false;
    }, 1300); // set this timeout to the duration of your transition
}

function slider(event) {
    event.preventDefault();
    const slides = document.querySelectorAll('.slider .box');
    const prevBtn = document.querySelector('.slide .left');
    const nextBtn = document.querySelector('.slide .right');
    const currentSlide = document.querySelector('.slider .box.active');
    let slideIndex = Array.from(slides).indexOf(currentSlide);

    function showSlide() {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[slideIndex].classList.add('active');
    }

    function slideToNext() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide();
    }

    function slideToPrev() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide();
    }

    prevBtn.addEventListener('click', slideToPrev);
    nextBtn.addEventListener('click', slideToNext);
}

function pop_up() {
    let timeout1, timeout2;
    popup.addEventListener('mouseenter', () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
    });
    popup.addEventListener('mouseleave', () => {
        timeout1 = setTimeout(() => {
            popup.style.transform = 'translateY(300px)';
        }, 5000);
        timeout2 = setTimeout(() => {
            popup.style.transform = 'translateY(0px)';
        }, 10000);
    });
    timeout1 = setTimeout(() => {
        popup.style.transform = 'translateY(300px)';
    }, 5000);
    timeout2 = setTimeout(() => {
        popup.style.transform = 'translateY(0px)';
    }, 10000);
}


popup.addEventListener('click', () => {
    contactLink.click();
    popup.style.transform = 'translateY(300px)';

});


setInterval(pop_up, 10000);
audioCheck()
updateLinks()
checkImage()
setSectionsOpacity();
document.getElementById('home').style.opacity = 1;

spans.forEach(span => {
    if (!activeSpan) {
        activeSpan = spans[0]
    }
    const dataColor = activeSpan.getAttribute('data-color');
    if (dataColor) {
        // Update the home image background and coder image based on the current settings
        updateHomeImage(dataColor);
        updateCoderImage(dataColor);
        // Update the body background image based on the current settings
        updateBodyBackground();
    }

    // Add click event listener to each span element
    span.addEventListener('click', () => {
        audioPlay();
        // Update the active span and apply the corresponding styles
        spans.forEach(span => span.classList.remove('active'));
        span.classList.add('active');
        waiting()
        activeSpan = span;

        const mainColor = span.getAttribute('data-main');
        const altColor = span.getAttribute('data-alt');
        const dataColor = span.getAttribute('data-color');

        document.documentElement.style.setProperty('--main-color', mainColor);
        document.documentElement.style.setProperty('--alt-main', altColor);

        // Update the home image background and coder image based on the current settings
        updateHomeImage(dataColor);
        updateCoderImage(dataColor);

        localStorage.setItem('main-color', mainColor);
        localStorage.setItem('alt-main', altColor);
        localStorage.setItem('data-color', dataColor);

        // Update the body background image based on the current settings
        updateBodyBackground();
    });
});

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        audioPlay()
        let currentFront = document.querySelector('.contact-container .front');
        let nextFront = [...contactInfo].find(cont => !cont.classList.contains('front'));
        if (currentFront) {
            currentFront.classList.remove('front'); // remove 'front' class from current element
            setTimeout(() => {

                if (nextFront) {
                    nextFront.classList.add('front'); // add 'front' class to next element without it
                }
            }, 1000); // wait 1 second before adding class
        }
    });
});

links.forEach(link => {
    link.addEventListener('click', () => {
        audioPlay()
        if (link.getAttribute('href') !== '#about') {
            skillProgs.forEach(skillProg => {
                skillProg.style.width = '0%';
            });
        }
    });
});

icons.forEach(icon => {
    icon.addEventListener('click', slider);
    audioPlay()
});

background.addEventListener('change', () => {
    audioPlay()
    const dataColor = activeSpan.getAttribute('data-color');
    if (background.value === 'image') {
        // If the background selector is set to "Image", update the body background image based on the current settings
        updateBodyBackground();
        border.disabled = true;
    } else {
        // If the background selector is set to "Plain", remove the body background image and enable the border selector
        bodyBackground.style.backgroundImage = '';
        border.disabled = false;
    }
});

checkbox.addEventListener('change', () => {
    audioPlay()
    updateBodyBackground();
});

borderSelect.addEventListener('change', function () {
    audioPlay()
    if (borderSelect.value === 'none') {
        sections.forEach(sec => {
            sec.querySelector('.container').classList.remove('border-normal', 'border-animated');
        });

    } else if (borderSelect.value === 'normal') {
        sections.forEach(sec => {
            sec.querySelector('.container').classList.remove('border-none', 'border-animated');
            sec.querySelector('.container').classList.add('border-normal');
        });
        console.log(borderSelect.value)
    } else if (borderSelect.value === 'animated') {
        sections.forEach(sec => {
            sec.querySelector('.container').classList.remove('border-none', 'border-normal');
            sec.querySelector('.container').classList.add('border-animated');
        });
        console.log(borderSelect.value)
    }
});

selector.addEventListener('change', () => {
    audioPlay()
    updateLinks()
});

checkbox.addEventListener('change', () => {
    audioPlay()
    waiting()
    html.classList.toggle('dark-mode', checkbox.checked);
    localStorage.setItem('dark-mode', checkbox.checked);
});

settingIcon.addEventListener('click', () => {
    audioPlay()
    setList.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!settingIcon.contains(event.target) && !setList.contains(event.target)) {
        setList.classList.remove('open');
    }
});

aboutLink.addEventListener('click', (event) => {
    event.preventDefault();
    skillProgs.forEach(skillProg => {
        const progValue = skillProg.dataset.prog;
        skillProg.style.width = `${progValue}`;
    });
});

audiocheckbox.addEventListener('change', audioCheck)
audiocheckbox.addEventListener('change', audioPlay)

if (savedMainColor && savedAltColor && savedDataColor) {
    document.documentElement.style.setProperty('--main-color', savedMainColor);
    document.documentElement.style.setProperty('--alt-main', savedAltColor);

    // Update the home image background and coder image based on the saved data color
    updateHomeImage(savedDataColor);
    updateCoderImage(savedDataColor);

    // Update the active span and apply the corresponding styles
    spans.forEach(span => {
        const dataColor = span.getAttribute('data-color');
        if (dataColor === savedDataColor) {
            span.classList.add('active');
            activeSpan = span;
        }
    });

    // Update the body background image based on the current settings
    updateBodyBackground();
}

checkbox.checked = darkMode === 'true';
html.classList.toggle('dark-mode', checkbox.checked);
