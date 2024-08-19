"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
require("dotenv/config");
const eventhandler_1 = require("./eventhandler");
const { OPENAI_API_KEYS, ASSISTANT_IDS, DOMAINS, EMAIL_TO } = process.env;
let OpenAiService = class OpenAiService {
    constructor() {
        this.eventHandlerMap = {};
        this.clientMap = {};
        this.isVerboseLogging = false;
        this.apiKeys = JSON.parse(OPENAI_API_KEYS || '[]');
        this.assistantIds = JSON.parse(ASSISTANT_IDS || '[]');
        this.domains = JSON.parse(DOMAINS || '[]');
        this.emailTo = JSON.parse(EMAIL_TO || '[]');
        this.logger = new common_1.Logger('OpenAiService');
    }
    getEventHandler(rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        if (!this.eventHandlerMap[hostName]) {
            const eventHandler = new eventhandler_1.EventHandler(this.getClient(hostName), this.getEmailTo(hostName));
            eventHandler.setMaxListeners(20);
            eventHandler.on("event", eventHandler.onEvent.bind(eventHandler));
            this.eventHandlerMap[hostName] = eventHandler;
        }
        return this.eventHandlerMap[hostName];
    }
    getAPIKey(rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const index = this.domains.indexOf(hostName);
        return this.apiKeys[index] || '';
    }
    getAssistantId(rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const index = this.domains.indexOf(hostName);
        return this.assistantIds[index] || '';
    }
    getEmailTo(rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const index = this.domains.indexOf(hostName);
        if (index >= 0 && this.emailTo.length === 1) {
            return this.emailTo[0];
        }
        return this.emailTo[index] || '';
    }
    getClient(rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const OPENAI_API_KEY = this.getAPIKey(hostName);
        if (!this.clientMap[hostName]) {
            const client = new openai_1.default({
                apiKey: OPENAI_API_KEY
            });
            this.clientMap[hostName] = client;
        }
        if (this.isVerboseLogging)
            this.logger.log({ hostName, OPENAI_API_KEY });
        return this.clientMap[hostName];
    }
    async createThread(rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const client = this.getClient(hostName);
        const thread = await client.beta.threads.create();
        return thread;
    }
    async processMessage(requestBody, rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const { threadId, message } = requestBody;
        try {
            await this.addMessage(threadId, message, hostName);
        }
        catch (error) {
            this.logger.error('Error adding message: ' + JSON.stringify(error));
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const handler = this.getEventHandler(hostName);
        const client = this.getClient(hostName);
        const ASSISTANT_ID = this.getAssistantId(hostName);
        const stream = await client.beta.threads.runs.stream(threadId, { assistant_id: ASSISTANT_ID }, handler);
        const trackedEvents = ['thread.run.created', 'thread.run.requires_action', 'xxthread.message.delta', 'thread.message.created', 'thread.message.completed', 'thread.run.completed'];
        for await (const event of stream) {
            handler.emit("event", event);
            if (this.isVerboseLogging && trackedEvents.includes(event.event)) {
                const eventData = event.data;
                this.logger.log({
                    event: event.event,
                    data_object: eventData.object,
                    data_status: eventData.status,
                    data_content: eventData.delta ? eventData.delta.content[0]?.text?.value : eventData?.content && eventData.content[0]?.text?.value
                });
            }
        }
    }
    async onCompleted(event, rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const client = this.getClient(hostName);
        const threadMessages = await client.beta.threads.messages.list(event.data.thread_id);
        const messages = this.extractMessages(threadMessages);
        return {
            event: 'end',
            messages
        };
    }
    processStreamedEvent(streamedEvent) {
        const trackedEvents = ['thread.run.created', 'thread.run.requires_action', 'thread.message.delta', 'thread.message.completed', 'thread.run.completed', "system.error"];
        const { event, data } = streamedEvent;
        const { status, content, delta } = data;
        if (trackedEvents.includes(event)) {
            return {
                event,
                status,
                content,
                delta
            };
        }
        else {
            return null;
        }
    }
    extractMessages(threadMessages) {
        const messages = threadMessages.body.data;
        return messages;
    }
    async addMessage(threadId, message, rawHostName) {
        const hostName = this.sanitizeReferer(rawHostName);
        const client = this.getClient(hostName);
        const response = await client.beta.threads.messages.create(threadId, {
            role: "user",
            content: message
        });
        return response;
    }
    sanitizeReferer(hostName) {
        return hostName.replace('www.', '');
    }
};
exports.OpenAiService = OpenAiService;
exports.OpenAiService = OpenAiService = __decorate([
    (0, common_1.Injectable)()
], OpenAiService);
//# sourceMappingURL=open-ai.service.js.map