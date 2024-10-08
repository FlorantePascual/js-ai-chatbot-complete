"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const open_ai_module_1 = require("./open-ai/open-ai.module");
const load_env_middleware_1 = require("./middleware/load-env.middleware");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const files_controller_1 = require("./files/files.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(load_env_middleware_1.LoadEnvMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            open_ai_module_1.OpenAiModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
        ],
        controllers: [
            files_controller_1.FilesController,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map