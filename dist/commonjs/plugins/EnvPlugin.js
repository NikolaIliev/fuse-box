"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvPluginClass {
    constructor(env) {
        this.env = env;
    }
    bundleStart(context) {
        const producer = context.bundle.producer;
        if (producer) {
            producer.addUserProcessEnvVariables(this.env);
        }
        context.source.addContent(`var __process_env__ = ${JSON.stringify(this.env)};`);
    }
}
exports.EnvPluginClass = EnvPluginClass;
exports.EnvPlugin = (options) => {
    return new EnvPluginClass(options);
};

//# sourceMappingURL=EnvPlugin.js.map
