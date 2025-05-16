

import CryptoJS from 'crypto-js'; // Importa la libreria CryptoJS per la crittografia

// Ottiene riferimenti agli elementi HTML della chat
const chatArea = document.getElementById('chat-area'); // Area dove vengono visualizzati i messaggi
const messageInput = document.getElementById('message-input'); // Input per scrivere il messaggio
const sendButton = document.getElementById('send-button'); // Bottone per inviare il messaggio

// Definisce i nickname dei partecipanti alla chat
const myNickname = 'Tu'; // Il tuo nickname
const otherNickname = 'Gemini'; // Il nickname dell'altro utente

// **ATTENZIONE: QUESTE CHIAVI SONO SOLO PER TEST E SONO INSECURE!**
// Non usare mai chiavi private hardcoded in un'applicazione reale.
const publicKeyTu = 'chiavepubblicatu123'; // La tua chiave pubblica (di test)
const privateKeyTu = 'chiaveprivatatu456'; // La tua chiave privata (di test)
const publicKeyGemini = 'chiavepubblicagemini789'; // La chiave pubblica di Gemini (di test)
const privateKeyGemini = 'chiaveprivatagemini012'; // La chiave privata di Gemini (di test)

// Funzioni per la crittografia (esempio concettuale con AES - da sostituire con chiave pubblica)
// Questa funzione cripta un messaggio usando l'algoritmo AES.
// Prende come input il messaggio da criptare e una chiave pubblica (ma in realtà usa una chiave simmetrica).
function criptaMessaggio(messaggio, chiavePubblicaRSA) {
  //  const jwk = KJUR.jws.JWS.readJWKPublicKey(chiavePubblicaRSA); // Questa riga è commentata e sembra incompleta.  Non fa parte di CryptoJS
  const encrypted = CryptoJS.AES.encrypt(messaggio, chiavePubblicaRSA).toString(); // Cripta il messaggio con AES
  return encrypted; // Restituisce il messaggio criptato (in formato stringa)
}

// Questa funzione decripta un messaggio usando l'algoritmo AES.
// Prende come input il messaggio criptato e una chiave privata (ma in realtà usa una chiave simmetrica).
function decriptaMessaggio(ciphertext, chiavePrivataRSA) {
  // const key = KJUR.jws.JWS.readPKCS8PrivateKey(chiavePrivataRSA); //Questa riga è commentata e sembra incompleta. Non fa parte di CryptoJS
  const bytes = CryptoJS.AES.decrypt(ciphertext, chiavePrivataRSA); // Decripta il messaggio con AES.  Restituisce un oggetto Bytes
  const plaintext = bytes.toString(CryptoJS.enc.Utf8); // Converte i byte decriptati in una stringa UTF-8
  return plaintext; // Restituisce il messaggio decriptato
}

// Aggiunge un listener per l'evento 'click' al bottone di invio del messaggio.
// Quando l'utente clicca sul bottone, viene chiamata la funzione sendMessage.
sendButton.addEventListener('click', sendMessage);

// Aggiunge un listener per l'evento 'keypress' all'input del messaggio.
// Quando l'utente preme un tasto nell'input del messaggio, viene controllato se il tasto premuto è 'Enter'.
// Se è 'Enter', viene chiamata la funzione sendMessage.
messageInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage(); // Chiama sendMessage() quando viene premuto Enter
  }
});

// Questa funzione gestisce l'invio di un messaggio.
function sendMessage() {
  const messageText = messageInput.value.trim(); // Ottiene il testo del messaggio dall'input e rimuove gli spazi bianchi all'inizio e alla fine.
  if (messageText !== '') { // Controlla se il messaggio non è vuoto.
    const encryptedText = criptaMessaggio(messageText, publicKeyGeminiRSA); // Cripta il messaggio usando la funzione criptaMessaggio() e la chiave pubblica di Gemini.  Nota: publicKeyGeminiRSA non è definita, dovrebbe essere publicKeyGemini
    displayMessage('Criptato (Tu): ' + encryptedText, 'my-message', myNickname); // Visualizza il messaggio criptato nella chat.
    // Imposta un timeout per simulare la ricezione di una risposta dopo 1 secondo.
    setTimeout(() => {
      try {
        const decryptedResponse = decriptaMessaggio(encryptedText, privateKeyGeminiRSA); // Decripta il messaggio criptato usando la funzione decriptaMessaggio() e la chiave privata di Gemini. Nota: privateKeyGeminiRSA non è definita, dovrebbe essere privateKeyGemini
        const responseText = generateFakeResponse(decryptedResponse); // Genera una risposta fittizia basata sul messaggio decriptato.
        displayMessage(responseText, 'other-message', otherNickname); // Visualizza la risposta nella chat.
      } catch (error) {
        console.error("Errore di decrittografia:", error); // Stampa l'errore nella console.
        displayMessage("Impossibile decriptare il messaggio!", 'other-message', otherNickname); // Visualizza un messaggio di errore nella chat.
      }
    }, 1000);
    messageInput.value = ''; // Pulisce l'input del messaggio.
  }
}

// Questa funzione genera una risposta fittizia basata sul messaggio ricevuto.
function generateFakeResponse(inputText) {
  inputText = inputText.toLowerCase(); // Converti il testo in minuscolo per semplificare il confronto.
  if (inputText.includes('ciao') || inputText.includes('hey')) { // Controlla se il messaggio contiene "ciao" o "hey".
    return 'Ciao anche a te!'; // Restituisce una risposta appropriata.
  } else if (inputText.includes('come stai')) { // Controlla se il messaggio contiene "come stai".
    return 'Tutto bene, grazie!';
  } else if (inputText.includes('amore')) { // Controlla se il messaggio contiene "amore".
    return 'Ti voglio bene!';
  } else { // Se nessuna delle condizioni precedenti è vera.
    return 'Ricevuto!'; // Restituisce una risposta generica.
  }
}

//Questa funzione aggiunge un messaggio alla chat
function displayMessage(message, messageType, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(messageType);
  messageElement.textContent = `${sender}: ${message}`;
  chatArea.appendChild(messageElement);
  chatArea.scrollTop = chatArea.scrollHeight; //scrolla in basso
}
