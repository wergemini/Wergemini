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
// Generazione delle chiavi RSA (da fare una sola volta per utente - **QUESTO È SOLO UN ESEMPIO DI GENERAZIONE IN-BROWSER A SCOPO DI TEST! MAI FARLO IN UN'APPLICAZIONE REALE!**)
const keyPair = KJUR.crypto.KeyPair.genKeyPair('RSA', 2048); // Genera una coppia di chiavi RSA a 2048 bit
const publicKeyTuRSA = keyPair.getPublicKey();    // Ottiene la chiave pubblica (formato JWK)
const privateKeyTuRSA = keyPair.getPrivateKey();  // Ottiene la chiave privata (formato PKCS8)

const publicKeyGeminiRSA = KJUR.crypto.KeyPair.genKeyPair('RSA', 2048).getPublicKey(); // Genero anche le mie chiavi (INSECURE!)
const privateKeyGeminiRSA = KJUR.crypto.KeyPair.genKeyPair('RSA', 2048).getPrivateKey();

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

function displayMessage(text, className, sender) { // Ho aggiunto 'sender' qui
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    const senderSpan = document.createElement('span');
    senderSpan.classList.add('sender');
    senderSpan.textContent = sender + ': ';
    messageDiv.appendChild(senderSpan);
    messageDiv.appendChild(document.createTextNode(text));
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight; // Scrolla in basso per mostrare l'ultimo messaggio
}

function generateFakeResponse(inputText) {
    // Una semplice logica per generare risposte finte basate sull'input
    inputText = inputText.toLowerCase();
    if (inputText.includes('ciao') || inputText.includes('hey')) {
        return 'Ciao anche a te!';
    } else if (inputText.includes('come stai')) {
        return 'Tutto bene, grazie!';
    } else if (inputText.includes('amore')) {
        return 'Ti voglio bene!';
    } else {
        return 'Ricevuto!';
    }
}