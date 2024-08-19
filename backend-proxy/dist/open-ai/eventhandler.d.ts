declare const EventEmitter: any;
export declare class EventHandler extends EventEmitter {
    private logger;
    private emailService;
    constructor(client: any, emailTo: any);
    onEvent(event: any): Promise<void>;
    handleRequiresAction(data: any, runId: any, threadId: any): Promise<any[]>;
    submitToolOutputs(toolOutputs: any, runId: any, threadId: any): Promise<any[]>;
}
export {};
