const links = Array.from(document.getElementsByClassName("link"));
const sections = Array.from(document.querySelectorAll('section'));
const checkbox = document.querySelector('input[type="checkbox"]');
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

checkImage()
setSectionsOpacity();
document.getElementById('home').style.opacity = 1;





let activeSpan;

// Loop through each span element to find the matching color
// Get all the necessary elements and values



// Define a function to update the body background image based on the current settings
function updateBodyBackground() {
    const dataColor = activeSpan.getAttribute('data-color');
    if (background.value === 'image') {
        const imageUrl = checkbox.checked ? `images/dark-${dataColor}.jpg` : 'images/light.jpg';
        bodyBackground.style.backgroundImage = `url(${imageUrl})`;
    } else {
        bodyBackground.style.backgroundImage = '';
    }
}


// Loop through each span element to find the matching color
spans.forEach(span => {
    const dataColor = span.getAttribute('data-color');
    if (dataColor === savedDataColor) {
        span.classList.add('active');
        activeSpan = span;

        // Set the home image to the corresponding URL for the saved data color
        
        const homeImageUrl = `url(images/${dataColor}.png)`;
        homeImage.style.backgroundImage = homeImageUrl;

        // Update the body background image based on the current settings
        updateBodyBackground();
    }

    // Add click event listener to each span element
    span.addEventListener('click', () => {
        // Update the active span and apply the corresponding styles
        spans.forEach(span => span.classList.remove('active'));
        span.classList.add('active');
        activeSpan = span;

        const mainColor = span.getAttribute('data-main');
        const altColor = span.getAttribute('data-alt');
        const dataColor = span.getAttribute('data-color');

        document.documentElement.style.setProperty('--main-color', mainColor);
        document.documentElement.style.setProperty('--alt-main', altColor);


        const homeImageUrl = `url(images/${dataColor}.png)`;
        homeImage.style.backgroundImage = homeImageUrl;

        localStorage.setItem('main-color', mainColor);
        localStorage.setItem('alt-main', altColor);
        localStorage.setItem('data-color', dataColor);

        // Update the body background image based on the current settings
        updateBodyBackground();
    });
});

// Add change event listener to the background selector
background.addEventListener('change', () => {
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

// Add change event listener to the checkbox
checkbox.addEventListener('change', () => {
    // Update the body background image based on the current settings
    updateBodyBackground();
});

// Load the saved main color, alt color, and data color on page load
if (savedMainColor && savedAltColor && savedDataColor) {
    document.documentElement.style.setProperty('--main-color', savedMainColor);
    document.documentElement.style.setProperty('--alt-main', savedAltColor);

    // Set the home image to the corresponding URL for the saved data color
    
    const homeImageUrl = `url(images/${savedDataColor}.png)`;
    homeImage.style.backgroundImage = homeImageUrl;

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



// Load the saved main color, alt color, and data color on page load
if (savedMainColor && savedAltColor && savedDataColor) {
    document.documentElement.style.setProperty('--main-color', savedMainColor);
    document.documentElement.style.setProperty('--alt-main', savedAltColor);

    // Set the home image to the corresponding URL for the saved data color
    const homeImage = document.querySelector('.homeImage');
    const homeImageUrl = `url(images/${savedDataColor}.png)`;
    homeImage.style.backgroundImage = homeImageUrl;

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

// Update the body background image based on the current settings when the page finishes loading
window.addEventListener('load', () => {
    updateBodyBackground();
});




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

selector.addEventListener("change", updateLinks);
updateLinks();



borderSelect.addEventListener('change', function () {
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



function fade(event) {

    event.preventDefault();
    const currentLink = document.querySelector('.active');
    const currentSection = document.querySelector(currentLink.getAttribute('href'));
    const targetLink = this;
    const sectionID = targetLink.getAttribute('href').replace('#', '');
    const section = document.querySelector(`#${sectionID}`);
    if (currentLink === targetLink) {
        return
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

}

function slide(event) {
    event.preventDefault();

    const currentLink = document.querySelector('.active');
    const currentSection = document.querySelector(currentLink.getAttribute('href'));
    const targetLink = this;
    const sectionID = targetLink.getAttribute('href').replace('#', '');
    const section = document.querySelector(`#${sectionID}`);

    // Check if the target section is the same as the current section
    if (targetLink === currentLink) {
        return;
    } else {
        links.forEach(link => {
            link.classList.remove("active");
        });
        this.classList.add("active");

        if (currentLink.compareDocumentPosition(targetLink) & Node.DOCUMENT_POSITION_FOLLOWING) {
            currentSection.style.transition = "1s";
            currentSection.style.transform = "translateX(2000px)";
            currentSection.style.zIndex = 1;
            setTimeout(() => {
                section.style.opacity = 1;
                section.style.zIndex = 3;
            }, 300);
            currentSection.style.opacity = 0;
            setTimeout(() => {
                currentSection.style.transform = "translateX(0)";
            }, 1000);
        } else {
            currentSection.style.transition = "1s";
            currentSection.style.transform = "translateX(-2000px)";
            currentSection.style.zIndex = 1;
            setTimeout(() => {
                section.style.opacity = 1;
                section.style.zIndex = 3;
            }, 300);
            currentSection.style.opacity = 0;
            setTimeout(() => {
                currentSection.style.transform = "translateX(0)";
            }, 1000);
        }
    }

}








checkbox.checked = darkMode === 'true';
html.classList.toggle('dark-mode', checkbox.checked);

checkbox.addEventListener('change', () => {
    html.classList.toggle('dark-mode', checkbox.checked);
    localStorage.setItem('dark-mode', checkbox.checked);
});



settingIcon.addEventListener('click', () => {
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
        skillProg.style.transition = 'width 2s linear';
        skillProg.style.width = `${progValue}%`;
    });
});

links.forEach(link => {
    link.addEventListener('click', () => {
        if (link.getAttribute('href') !== '#about') {
            skillProgs.forEach(skillProg => {
                skillProg.style.transition = 'width 0.5s linear';
                skillProg.style.width = '0%';
            });
        }
    });
});
