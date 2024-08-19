import { Request, Response } from 'express';
import { OpenAiService } from './open-ai.service';
export declare class OpenAiController {
    private readonly openAiService;
    private logger;
    private isLogging;
    constructor(openAiService: OpenAiService);
    createThread(req: Request): Promise<import("openai/resources/beta/threads/threads").Thread>;
    processMessage(res: Response, req: Request, reqBody: any): Promise<void>;
}
