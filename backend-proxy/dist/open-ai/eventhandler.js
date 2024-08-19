"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const EventEmitter = require('node:events');
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
class EventHandler extends EventEmitter {
    constructor(client, emailTo) {
        super();
        this.logger = new common_1.Logger('EventHandler');
        this.emailService = new email_service_1.EmailService();
        this.client = client;
        this.emailTo = emailTo;
    }
    async onEvent(event) {
        try {
            if (event.event === "thread.run.requires_action") {
                this.logger.log("Thread run requires action detected");
                await this.handleRequiresAction(event.data, event.data.id, event.data.thread_id);
            }
        }
        catch (error) {
            console.error("Error handling event:", error);
        }
    }
    async handleRequiresAction(data, runId, threadId) {
        try {
            const toolOutputs = data.required_action.submit_tool_outputs.tool_calls.map(async (toolCall) => {
                const parsedArgs = JSON.parse(toolCall.function.arguments);
                if (toolCall.function.name === "sendEmail") {
                    this.logger.log("Sending email...");
                    const result = await this.emailService.sendEmail(parsedArgs, this.emailTo);
                    return {
                        tool_call_id: toolCall.id,
                        output: JSON.stringify(result)
                    };
                }
                else if (toolCall.function.name === "sendSMS") {
                    return {
                        tool_call_id: toolCall.id,
                        output: "SMS sent successfully",
                    };
                }
            });
            const resolvedOutputs = await Promise.all(toolOutputs);
            return await this.submitToolOutputs(resolvedOutputs, runId, threadId);
        }
        catch (error) {
            console.error("Error processing required action:", error);
        }
    }
    async submitToolOutputs(toolOutputs, runId, threadId) {
        try {
            const stream = this.client.beta.threads.runs.submitToolOutputsStream(threadId, runId, { tool_outputs: toolOutputs });
            const eventResponse = [];
            for await (const event of stream) {
                this.emit("event", event);
                eventResponse.push(event);
            }
            return eventResponse;
        }
        catch (error) {
            console.error("Error submitting tool outputs:", error);
            this.emit("event", {
                event: "system.error",
                data: {
                    status: "error",
                    content: "Error submitting tool outputs",
                },
            });
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=eventhandler.js.map