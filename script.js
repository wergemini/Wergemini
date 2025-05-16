const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        displayMessage(messageText, 'my-message'); // Mostra il tuo messaggio
        displayMessage('Ricevuto: ' + messageText, 'other-message'); // Simulo la mia risposta
        messageInput.value = ''; // Pulisci il campo di input
    }
}

function displayMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight; // Scrolla in basso per mostrare l'ultimo messaggio
}