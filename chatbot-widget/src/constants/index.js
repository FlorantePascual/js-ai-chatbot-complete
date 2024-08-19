// The following constants will be modified to customize the chatbots

// This is a placeholder only - NOT meant to be compiled and for illustration purposes only. 
// However, the working compiled code can be found in dist/ChatComponent.bundle.js
// Reach out to us for further customization.

const CHATBOT_AVATARS = {
    "florante": "https://api.florantepascual.com/chatbots/img/ai-bot-avatar.png",
}

const CHATBOT_LAUNCHERS = {
    "florante": "https://api.florantepascual.com/chatbots/img/ai-bot-launcher.png",
}

export const DEFAULT_API_STREAMING_URL = "http://localhost:3000/open-ai";

const DEFAULT_AI_BOT_AVATAR = "https://api.florantepascual.com/chatbots/img/ai-bot-avatar.png";
const DEFAULT_AI_BOT_LAUNCHER = "https://api.florantepascual.com/chatbots/img/ai-bot-launcher.png";

const DOMAIN_CUSTOM_VARS = {
    "florantepascual": {
        "bgColorHex": "#7635dc",
        "avatar": "florante",
        "launcher": "florante",
        "botName": "Florante's Assistant",
        "apiEndpoint": "https://api.florantepascual.com/open-ai",
    },
    "localhost": {
        "bgColorHex": "#7635dc",
        "avatar": "",
        "launcher": "",
        "botName": "localBot",
        "apiEndpoint": "http://localhost:3000/open-ai",
    },
}

const getMatchingKeyword = () => {
    const domain = window.location.hostname;
    const domainKeywords = Object.keys(DOMAIN_CUSTOM_VARS);
    const matchingKeyword = domainKeywords.find(keyword => domain.includes(keyword));
    return matchingKeyword || "localhost";
}

const AI_BOT_AVATAR_FX = () => {
    const matchingKeyword = getMatchingKeyword();
    if (matchingKeyword) {
        const keyword = DOMAIN_CUSTOM_VARS[matchingKeyword].avatar;
        return keyword ? CHATBOT_AVATARS[keyword] : DEFAULT_AI_BOT_AVATAR;
    }
    return DEFAULT_AI_BOT_AVATAR;
}

const AI_BOT_LAUNCHER_FX = () => {
    const matchingKeyword = getMatchingKeyword();
    if (matchingKeyword) {
        const keyword = DOMAIN_CUSTOM_VARS[matchingKeyword].launcher;
        return keyword ? CHATBOT_LAUNCHERS[keyword] : DEFAULT_AI_BOT_LAUNCHER;
    }
    return DEFAULT_AI_BOT_LAUNCHER;
}

const API_STREAMING_URL_FX = () => {
    const matchingKeyword = getMatchingKeyword();
    if (matchingKeyword) {
        return DOMAIN_CUSTOM_VARS[matchingKeyword].apiEndpoint || DEFAULT_API_STREAMING_URL;
    }
    return DEFAULT_API_STREAMING_URL;
}

export const API_STREAMING_URL = API_STREAMING_URL_FX();

// Custom Colors
const PRIMARY_COLOR_FX = () => {
    const matchingKeyword = getMatchingKeyword();
    if (matchingKeyword) {
        return DOMAIN_CUSTOM_VARS[matchingKeyword].bgColorHex || "#7635dc"
    }
    return "#7635dc";
}
const PRIMARY_COLOR = PRIMARY_COLOR_FX();
const BACKGROUND_COLOR = "#f8f8f8";

// images
export const AI_BOT_AVATAR = AI_BOT_AVATAR_FX();
export const AI_BOT_LAUNCHER = AI_BOT_LAUNCHER_FX();

// AI_BOT_NAME: The name of the chatbot
export const AI_BOT_NAME_FX = () => {
    const matchingKeyword = getMatchingKeyword();
    if (matchingKeyword) {
        return DOMAIN_CUSTOM_VARS[matchingKeyword].botName || "AI Assistant"
    }
    return "AI Assistant";
}
const AI_BOT_NAME = AI_BOT_NAME_FX();

// STYLES: The CSS styles for the chatbot
export const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

/* Complete source code not included, for illustration purposes. You can use the bundled code in dist/ChatComponent.bundle.js */

`;

// CHATBOT_HTML: The HTML structure for the chatbot
export const CHATBOT_HTML = `
<header>
    <img src="${AI_BOT_AVATAR}" alt="AI Bot Avatar">
    <h2>${AI_BOT_NAME}</h2>
    <span class="ai-bot-close-btn material-symbols-outlined">close</span>
</header>
<div class="message-thread">
    <div class="mt-10px"></div>
</div>
<div class="message-input">
<textarea required placeholder="Message here ..."></textarea>
<span id="send-btn" class="material-symbols-outlined">send</span>
</div>`;

export const CHATBOT_TOGGLER_HTML = `
<span><img src="${AI_BOT_LAUNCHER}" height="50" alt="AI Bot Launcher"></span>
<span class="material-symbols-outlined">close</span>`;
