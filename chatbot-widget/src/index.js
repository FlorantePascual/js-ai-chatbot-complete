// This is a placeholder only - NOT meant to be compiled and for illustration purposes only. 
// However, the working compiled code can be found in dist/ChatComponent.bundle.js
// Reach out to us for further customization.

import ChatComponent from "./ChatComponent";

// This function will initialize the chat component
function initializeChat(options) {
  const chatContainerId = "chat-container";
  let chatContainer = document.getElementById(chatContainerId);

  // If the chat container doesn't exist, create it and append to the body
  if (!chatContainer) {
    chatContainer = document.createElement("div");
    chatContainer.id = chatContainerId;
    document.body.appendChild(chatContainer);
  }

  // Initialize the ChatComponent with the containerId
  ChatComponent.initializeComponent(chatContainerId, options);
}

// Expose the chat initialization to the global scope so it can be called from the embedding script
window.ChatComponent = {
  init: initializeChat
};
