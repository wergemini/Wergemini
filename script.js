import CryptoJS from 'crypto-js'; // Dovremo assicurarci che questa libreria sia inclusa nel nostro progetto web

const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const myNickname = 'Tu';
const otherNickname = 'Gemini';

// **ATTENZIONE: QUESTE CHIAVI SONO SOLO PER TEST E SONO INSECURE!**
const publicKeyTu = 'chiavepubblicatu123';
const privateKeyTu = 'chiaveprivatatu456';
const publicKeyGemini = 'chiavepubblicagemini789';
const privateKeyGemini = 'chiaveprivatagemini012';

// Funzioni per la crittografia (esempio concettuale con AES - da sostituire con chiave pubblica)
function criptaMessaggio(messaggio, chiavePubblica) {
  const ciphertext = CryptoJS.AES.encrypt(messaggio, chiavePubblica).toString();
  return ciphertext;
}

function decriptaMessaggio(ciphertext, chiavePrivata) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, chiavePrivata);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
}

// ... (il resto del tuo codice: event listener, sendMessage, displayMessage, generateFakeResponse)

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
        const encryptedText = criptaMessaggio(messageText, publicKeyGemini); // Cripta con la chiave pubblica di Gemini
        displayMessage('Criptato (Tu): ' + encryptedText, 'my-message', myNickname); // Mostra il testo cifrato (per ora)
        // Simulazione di invio e ricezione (senza server reale per ora)
        setTimeout(() => {
            const decryptedResponse = decriptaMessaggio(encryptedText, privateKeyGemini); // Simulo la decrittografia con la mia chiave privata
            const responseText = generateFakeResponse(decryptedResponse); // Rispondo al messaggio decriptato
            displayMessage(responseText, 'other-message', otherNickname);
        }, 1000);
        messageInput.value = '';
    }
}

function displayMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight; // Scrolla in basso per mostrare l'ultimo messaggio
}
