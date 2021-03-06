import { Plugin } from "../core/WorkflowContext";
import { BundleProducer } from "../core/BundleProducer";
import { UserOutput } from "../core/UserOutput";
export interface IndexPluginOptions {
    title?: string;
    charset?: string;
    description?: string;
    keywords?: string;
    author?: string;
    bundles?: string[];
    path?: string;
    target?: string;
    template?: string;
    async?: boolean;
    resolve?: {
        (output: UserOutput): string;
    };
}
export declare class WebIndexPluginClass implements Plugin {
    opts: IndexPluginOptions;
    constructor(opts?: IndexPluginOptions);
    producerEnd(producer: BundleProducer): void;
}
export declare const WebIndexPlugin: (opts?: IndexPluginOptions) => WebIndexPluginClass;
