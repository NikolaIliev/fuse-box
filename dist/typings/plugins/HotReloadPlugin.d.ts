import { WorkFlowContext } from "../core/WorkflowContext";
import { Plugin } from "../core/WorkflowContext";
export interface HotReloadPluginOptions {
    /** The port that the client JS connects to */
    port?: number | string;
    uri?: string;
    reload?: boolean;
}
/**
 * Hot reload plugin
 */
export declare class HotReloadPluginClass implements Plugin {
    dependencies: string[];
    port: any;
    uri: any;
    reload: boolean;
    constructor(opts?: HotReloadPluginOptions);
    init(): void;
    bundleEnd(context: WorkFlowContext): void;
}
export declare const HotReloadPlugin: (options?: HotReloadPluginOptions) => HotReloadPluginClass;
