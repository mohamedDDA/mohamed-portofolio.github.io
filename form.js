const contactForm = document.querySelector('#email-form');
const messageDiv = document.querySelector('.message');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    const response = await fetch('/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });

    const result = await response.text();
    messageDiv.textContent = result;
});