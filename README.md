# js-ai-chatbot-complete

**js-ai-chatbot-complete** is the polished version of [`js-ai-chatbot`](https://github.com/FlorantePascual/js-ai-chatbot) that is production-ready and supports event streaming from OpenAI's Assistants API through a backend proxy.

This repo is intended for testing the features locally and can be customized and implemented into production by reaching out to us.

The files that you will need for testing are located in each component's `dist/` folder.

## Components
- **chatbot-widget** - a light-weight embeddable website chatbot built with plain vanilla JavaScript, HTML, and CSS. Configurable with domain white-listing and branding customization.
- **backend-proxy** - a backend service built with NestJS and TypeScript designed to facilitate communication between `chatbot-widget` and OpenAI Assistants API with streaming events for best UX response. It can also serve static and dynamic files like images and the chatbot widget bundle script itself.

## Features
This solution does not require any 3rd party chatbot builders (Botpress, Voiceflow, RelevanceAI) or intermediate services (Zapier, Make) for majority of chatbot use-cases.

For testing, this solution requires a minimal footprint (GCP e2-micro instance or equivalent) to handle multiple chatbots, each connected to its own AI Assistant.

Since it's running on your own server, you get these goodies out of the box:
- Unlimited Chatbots for Unlimited Websites (limited only by your server size / cluster)
- Unlimited Agents (Always alive)
- Agentic RAG capability with function calling
- Unlimited message events
- No vendor lock-in

Best of all, you never have to
- Share your API keys
- Share your confidential company information to train your AI Models
- Worry about data leakage of chat interactions
- or Worry about unpredictable usage costs

## Instructions

Clone the repository:
```bash
git clone https://github.com/FlorantePascual/js-ai-chetbot-complete.git
```

Refer to each corresponding folder's `README.md` for running them locally on your machine.

If you like the solution, please reach out for a full production-ready implementation.

## Let's build something amazing together!

Copyright 2024 [Florante Pascual](florantepascual.com)
