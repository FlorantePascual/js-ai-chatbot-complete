# Chatbot Widget

**chatbot-widget** is an embeddable website chatbot built with plain vanilla JavaScript, HTML, and CSS. This chatbot is designed to be easily configurable for branding based on the domain of the website it is embedded on. Powered by the [Backend Proxy](https://github.com/FlorantePascual/nest-openai-proxy), it supports streaming responses from the backend API, ensuring a smooth and dynamic interaction experience.

## Features
- Easy embedding on any website with minimal setup.
- Dynamic branding customization based on the website domain.
- Real-time, streaming responses powered by the backend.
- Small footprint built with plain vanilla JavaScript, HTML, and CSS for maximum compatibility and performance.

## Getting Started

### Prerequisites
- Setup your backend: [js-ai-chatbot-complete/backend-proxy](https://github.com/FlorantePascual/js-ai-chatbot-complete)

### Installation

1. Clone the repository if you haven't done so already:
    ```bash
    git clone https://github.com/FlorantePascual/js-ai-chatbot-complete.git
    ```
2. Navigate to the project directory:
    ```bash
    cd js-ai-chatbot-complete/chatbot-widget
    ```
3. Install dependencies (Optional when testing)
    ```bash
    npm install
    ```

### Configuration

No configuration is required when trying out the widget on `localhost`. The chatbot will render basic colors and icons and call the local API on `http://localhost:3000/open-ai` by default. Use the embeddable widget located in `dist/ChatComponent.bundle.js` as indicated in `example-website-index.html`.

To customize your chatbot for production, we will require the following information to build your very own custom embeddable widget.

1. Open the `constants/index.js` file and define your list of avatar and launcher icons:
    ```javascript
    const CHATBOT_AVATARS = {
        "nameOfAvatar": "https://your-avatar-location/avatar.png",
        "nameOfAvatar2": "https://your-avatar-location/avatar2.png",
    }
    const CHATBOT_LAUNCHERS = {
        "nameOfLauncher": "https://your-launcher-location/launcher.png",
        "nameOfLauncher2": "https://your-launcher-location/launcher2.png",
    }
    ```
2. Customize the branding settings in the colors/avatars/launchers per domain on `DOMAIN_CUSTOM_VARS` as per your domain requirements.

    ```js
        const DOMAIN_CUSTOM_VARS = {/*your custom variables for each domain*/}
    ```

    You can customize the chatbot's appearance and behavior based on the domain by adding your domain-specific configurations as follows:

    ```typescript
    "mydomain": {
        "bgColorHex": "#ff0000",
        "avatar": "nameOfAvatarFromList",
        "launcher": "nameOfLauncherFromList",
        "botName": "AI Assistant",
        "apiEndpoint": "https://api.mybackend.com/open-ai",
    }
    ```
    Legend:
    ```
    bgColorHex: Set the background color using a hex code.
    avatar: Customize the chatbot's avatar.
    launcher: Customize the chatbot's launcher icon.
    botName: Set the name of the chatbot.
    apiEndpoint: Specify the API endpoint for the backend proxy.
    ```

### Usage

1. Include the chatbot script in your website's HTML file (in this case, see `example-website-index.html`):

    ```html
    <script src="./dist/ChatComponent.bundle.js" defer></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize the Chat component
            const options = {
                initialGreeting: [
                    `<p>Greetings and a Happy Summer of 2024 from Canada!</p>`,
                    `<p>How can I help you today?</p>`,
                ],
            if (window.ChatComponent) {
                ChatComponent.init(options);
            } else {
                console.error('ChatComponent is not available');
            }
        });
    </script>
    ```

    Customize your initial greeting with `options.initialGreeting` using an array of HTML strings. If `option` is not included in the initialization, you will get the default greeting.

2. Open `example-website-index.html` using LiveServer or any local http server on `localhost`.

**IMPORTANT** `localhost` will be used by BOTH Chatbot Widget and Backend to validate the white-listed origin/referer. Anything other than `localhost` (like `http://127.0.0.1/`) will fail to load the chatbot correctly or call the local Backend Proxy API.

## Use Cases
- Customer support for e-commerce websites.
- Interactive FAQ sections.
- Engaging visitors with AI-driven conversations.
- and many more

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Copyright 2024 [Florante Pascual](florantepascual.com)

## About
Developed by [Florante Pascual](florantepascual.com)
