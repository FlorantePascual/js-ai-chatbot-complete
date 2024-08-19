"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiController = void 0;
const common_1 = require("@nestjs/common");
const open_ai_service_1 = require("./open-ai.service");
let OpenAiController = class OpenAiController {
    constructor(openAiService) {
        this.openAiService = openAiService;
        this.logger = new common_1.Logger('OpenAiController');
        this.isLogging = false;
    }
    createThread(req) {
        const fullHost = req.headers.origin;
        const hostName = new URL(fullHost).hostname;
        if (this.isLogging)
            this.logger.log({ hostName });
        return this.openAiService.createThread(hostName);
    }
    async processMessage(res, req, reqBody) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        const fullHost = req.headers.origin;
        const hostName = new URL(fullHost).hostname;
        if (this.isLogging)
            this.logger.log({ hostName });
        const eventHandler = this.openAiService.getEventHandler(hostName);
        eventHandler.on("event", async (event) => {
            if (event.event === "thread.run.completed") {
                const messages = await this.openAiService.onCompleted(event, hostName);
                res.write(`data: ${JSON.stringify(messages)}\n\n`);
                res.end();
            }
            else {
                const processedEvent = this.openAiService.processStreamedEvent(event);
                if (processedEvent) {
                    return res.write(`data: ${JSON.stringify(processedEvent)}\n\n`);
                }
            }
        });
        await this.openAiService.processMessage(reqBody, hostName);
    }
};
exports.OpenAiController = OpenAiController;
__decorate([
    (0, common_1.Get)('create-thread'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OpenAiController.prototype, "createThread", null);
__decorate([
    (0, common_1.Post)('process-message'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OpenAiController.prototype, "processMessage", null);
exports.OpenAiController = OpenAiController = __decorate([
    (0, common_1.Controller)('open-ai'),
    __metadata("design:paramtypes", [open_ai_service_1.OpenAiService])
], OpenAiController);
//# sourceMappingURL=open-ai.controller.js.map