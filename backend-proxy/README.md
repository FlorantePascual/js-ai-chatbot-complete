# Backend Proxy

`backend-proxy` is a backend service built with NestJS and TypeScript designed to facilitate communication between an embeddable chatbot and OpenAI Assistants API. This service handles creatiion of conversation threads and processing messages within those threads, with support for event streaming data to ensure seamless communication between OpenAI and the chatbot.

This repo contains the compiled code intended for testing. The working compiled code can be found in `dist/` folder.

For further customization such as accessing external API functionality, please reach out to us at [our website](https://www.florantepascual.com). We are continuously adding common features like email, SMS and database access.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Configuration](#configuration)
- [License](#license)

## Features

- **Domain Whitelisting**: Only authorized domains can access the API endpoint.
- **OpenAI API Integration**: Communicates with OpenAI Assistants API for advanced conversational capabilities like RAG and function calling.
- **Streaming Data**: Supports streaming responses to ensure smooth and real-time communication.

## Installation

To install and set up the project, follow these steps:

1. Clone the repository if you haven't done so already:

    ```sh
    git clone https://github.com/FlorantePascual/js-ai-chatbot-complete.git
    ```
2. Navigate to the project directory:
    ```sh
    cd js-ai-chatbot-complete/backend-proxy
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Set up the environment variables (see [Configuration](#configuration)).

5. Start the backend proxy server:

    ```sh
    npm run start
    ```

## Usage

Once the server is up and running, you can use the following endpoints to interact with the service. The `chatbot-widget` will automatically make the calls to the local instance endpoints as needed. Make sure the `chatbot-widget` is hosted on `http://localhost` using any port except `3000`.

## Endpoints

When testing locally, the API endpoint will usually be listening on `http://localhost:3000/open-ai`

### `GET /create-thread`

Creates a new conversation thread and returns the thread object.

**Request:**

```http
GET /create-thread
```

**Response:**

```json
{
  "thread_id": "unique_thread_id",
  "created_at": "timestamp"
}
```

### `POST /process-message`

Creates a message within a specified thread, initiates a run with OpenAI, and streams back the results.

**Request:**

```http
POST /process-message
Content-Type: application/json

{
  "thread_id": "unique_thread_id",
  "message": "your_message"
}
```

**Response:**

The response is streamed back in real-time, containing the processed results from OpenAI.

## Configuration

Create `.env` file in the root directory (refer to `.env.sample`) and add the following environment variables:

```js
DOMAINS=["domain.com", "another.domain.com"]
OPENAI_API_KEYS=["openai-api-key1", "openai-api-key2"]
ASSISTANT_IDS=["assistant-id1", "assistant-id2"]
SMTP_PORT=465 (or whatever port you use)
SMTP_HOST=your-smtp-host
SMTP_USER="email-account-to-send-email"
SMTP_PASS="your-email-password"
EMAIL_TO=["destination-email-of-leads-captured", "destination2"]
```

`DOMAINS` variable is the list of domains authorized to access this endpoint. Add "localhost" if you want to test it locally, but make sure to remove it for production.

This mechanism will prevent unauthorized domains from accessing your Chatbot API Services.

`OPENAI_API_KEYS` are the API keys for each domain
`ASSISTANT_IDS` are the OpenAI Assistant IDs for each domain
`SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS` are your email credentials if you prompt the AI Assistant to collect lead info and send it to  `EMAIL_TO` address
`EMAIL_TO` is the destination email-to for lead captures per domain. If only one email is supplied, it applies to all domains.

Additional functionality can be extended by adding credentials here, like sending SMS or querying a database.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Copyright 2024 [Florante Pascual](florantepascual.com)

## About
Developed by [Florante Pascual](florantepascual.com)
