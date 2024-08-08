// Manejo de la animación del chatbot
document.getElementById('chatbot-icon').addEventListener('click', () => {
    const chatbotWindow = document.getElementById('chatbot-window');
    
    if (!chatbotWindow.classList.contains('show')) {
        chatbotWindow.classList.remove('hide', 'finished');
        chatbotWindow.classList.add('show');
    }
});

document.getElementById('chatbot-close').addEventListener('click', () => {
    const chatbotWindow = document.getElementById('chatbot-window');
    
    if (chatbotWindow.classList.contains('show')) {
        chatbotWindow.classList.remove('show');
        chatbotWindow.classList.add('hide');

        setTimeout(() => {
            chatbotWindow.classList.add('finished');
        }, 300); // Coincide con la duración de la animación CSS
    }
});

// Funciones del Chatbot
document.getElementById('chatbot-icon').addEventListener('click', () => {
    const chatbot = document.getElementById('chatbot-window');
    chatbot.classList.toggle('open');
    chatbot.classList.remove('close');
});

document.getElementById('chatbot-close').addEventListener('click', () => {
    const chatbot = document.getElementById('chatbot-window');
    chatbot.classList.add('close');
    setTimeout(() => {
        chatbot.classList.remove('open');
    }, 300); // Tiempo igual al de la transición
});

document.getElementById('chat-send').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    if (message) {
        displayMessage(message, 'user');
        chatInput.value = '';
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al final

        // Respuesta personalizada del chatbot
        setTimeout(() => {
            let botResponse = 'No entiendo esa pregunta. ¿Puedes reformularla?';
            if (message.includes('hola') || message.includes('buenos días')) {
                botResponse = '¡Hola! 😊 ¿Cómo puedo ayudarte hoy?';
            } else if (message.includes('sostenibilidad')) {
                botResponse = 'La sostenibilidad es clave para el futuro. ¿Te gustaría saber más sobre nuestras iniciativas?';
            }
            displayMessage(botResponse, 'bot');
        }, 1000);
    }
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (sender === 'bot') {
        messageElement.innerHTML = `<img src="https://twemoji.maxcdn.com/v/13.0/72x72/1f60a.png" alt="😊"> ${message}`;
        messageElement.classList.add('bot-message');
    } else {
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
    }
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Funciones del Formulario de Evaluación Inicial
const form = document.getElementById('evaluation-form');
const formSteps = Array.from(document.getElementsByClassName('form-step'));
const nextButton = document.getElementById('next-step');
const prevButton = document.getElementById('prev-step');
const submitButton = document.getElementById('submit-form');
let currentStep = 0;

formSteps[currentStep].classList.add('active');
toggleButtons();

nextButton.addEventListener('click', () => {
    if (validateCurrentStep()) {
        if (currentStep < formSteps.length - 1) {
            formSteps[currentStep].classList.remove('active');
            currentStep++;
            formSteps[currentStep].classList.add('active');
            toggleButtons();
        }
    }
});

prevButton.addEventListener('click', () => {
    if (currentStep > 0) {
        formSteps[currentStep].classList.remove('active');
        currentStep--;
        formSteps[currentStep].classList.add('active');
        toggleButtons();
    }
});

function toggleButtons() {
    prevButton.style.display = currentStep > 0 ? 'inline-block' : 'none';
    nextButton.style.display = currentStep < formSteps.length - 1 ? 'inline-block' : 'none';
    submitButton.style.display = currentStep === formSteps.length - 1 ? 'inline-block' : 'none';
}

function validateCurrentStep() {
    const currentFields = formSteps[currentStep].querySelectorAll('input, textarea, select');
    for (const field of currentFields) {
        if (!field.checkValidity()) {
            alert(`Por favor, completa el campo: ${field.name}`);
            return false;
        }
    }
    return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    sendToBackend(data);
});

function sendToBackend(data) {
    // Asegúrate de manejar la URL de la API de manera segura y no exponerla directamente
    const apiUrl = "URL_DE_TU_API"; // Cambia esto por una variable de entorno o config seguro

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Datos enviados correctamente.");
        } else {
            alert("Error en el envío de datos.");
        }
    })
    .catch(error => {
        console.error("Error al enviar datos:", error);
        alert("Error en el envío de datos.");
    });
}
