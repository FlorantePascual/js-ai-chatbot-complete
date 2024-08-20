"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadEnvMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoadEnvMiddleware = class LoadEnvMiddleware {
    constructor() {
        this.logger = new common_1.Logger('LoadEnvMiddleware');
    }
    use(req, res, next) {
        const fullHost = req.headers.origin || req.headers.referer || 'http://localhost';
        let hostName = '';
        try {
            hostName = new URL(fullHost).hostname;
        }
        catch (error) {
            this.logger.error('Error parsing URL: ' + fullHost);
        }
        if (hostName) {
        }
        next();
    }
};
exports.LoadEnvMiddleware = LoadEnvMiddleware;
exports.LoadEnvMiddleware = LoadEnvMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoadEnvMiddleware);
//# sourceMappingURL=load-env.middleware.js.map