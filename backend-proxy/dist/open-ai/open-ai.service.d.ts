import OpenAI from "openai";
import 'dotenv/config';
import { EventHandler } from './eventhandler';
import { MessageObject, ThreadMessages } from './openai-types';
export declare class OpenAiService {
    private eventHandlerMap;
    private clientMap;
    private isVerboseLogging;
    private apiKeys;
    private assistantIds;
    private domains;
    private emailTo;
    private logger;
    getEventHandler(rawHostName: string): EventHandler;
    getAPIKey(rawHostName: string): string;
    getAssistantId(rawHostName: string): string;
    getEmailTo(rawHostName: string): string;
    getClient(rawHostName: string): OpenAI;
    createThread(rawHostName: string): Promise<OpenAI.Beta.Threads.Thread>;
    processMessage(requestBody: any, rawHostName: any): Promise<void>;
    onCompleted(event: any, rawHostName: any): Promise<{
        event: string;
        messages: MessageObject[];
    }>;
    processStreamedEvent(streamedEvent: any): {
        event: any;
        status: any;
        content: any;
        delta: any;
    };
    extractMessages(threadMessages: ThreadMessages): MessageObject[];
    private addMessage;
    private sanitizeReferer;
}
