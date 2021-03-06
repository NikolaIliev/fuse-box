import { BundleSource } from "../BundleSource";
import { File, ScriptTarget } from "./File";
import { Log } from "../Log";
import { IPackageInformation } from "./PathMaster";
import { ModuleCollection } from "./ModuleCollection";
import { ModuleCache } from "../ModuleCache";
import { EventEmitter } from "../EventEmitter";
import { SourceChangedEvent } from "../devServer/Server";
import { Defer } from "../Defer";
import { UserOutput } from "./UserOutput";
import { FuseBox } from "./FuseBox";
import { Bundle } from "./Bundle";
import { BundleProducer } from "./BundleProducer";
import { QuantumSplitConfig, QuantumItem, QuantumSplitResolveConfiguration } from "../quantum/plugin/QuantumSplit";
import { ICSSDependencyExtractorOptions } from "../lib/CSSDependencyExtractor";
/**
 * All the plugin method names
 */
export declare type PluginMethodName = "init" | "preBuild" | "preBundle" | "bundleStart" | "bundleEnd" | "postBundle" | "postBuild";
/**
 * Interface for a FuseBox plugin
 */
export interface Plugin {
    test?: RegExp;
    options?: any;
    init?(context: WorkFlowContext): any;
    transform?(file: File, ast?: any): any;
    transformGroup?(file: File): any;
    onTypescriptTransform?(file: File): any;
    bundleStart?(context: WorkFlowContext): any;
    bundleEnd?(context: WorkFlowContext): any;
    producerEnd?(producer: BundleProducer): any;
    onSparky?(): any;
    /**
     * If provided then the dependencies are loaded on the client
     *  before the plugin is invoked
     */
    dependencies?: string[];
}
/**
 * Gets passed to each plugin to track FuseBox configuration
 */
export declare class WorkFlowContext {
    /**
     * defaults to app-root-path, but can be set by user
     * @see FuseBox
     */
    appRoot: any;
    shim: any;
    writeBundles: boolean;
    fuse: FuseBox;
    useTypescriptCompiler: boolean;
    userWriteBundles: boolean;
    showWarnings: boolean;
    useJsNext: boolean | string[];
    showErrors: boolean;
    showErrorsInBrowser: boolean;
    sourceChangedEmitter: EventEmitter<SourceChangedEvent>;
    /**
     * The default package name or the package name configured in options
     */
    defaultPackageName: string;
    transformTypescript?: (contents: string) => string;
    ignoreGlobal: string[];
    pendingPromises: Promise<any>[];
    languageLevel: ScriptTarget;
    polyfillNonStandardDefaultUsage: boolean | string[];
    customAPIFile: string;
    experimentalFeaturesEnabled: boolean;
    defaultEntryPoint: string;
    rollupOptions: any;
    output: UserOutput;
    hash: string | Boolean;
    target: string;
    /**
     * Explicitly target bundle to server
     */
    serverBundle: boolean;
    nodeModules: Map<string, ModuleCollection>;
    libPaths: Map<string, IPackageInformation>;
    homeDir: string;
    printLogs: boolean;
    runAllMatchedPlugins: boolean;
    plugins: Plugin[];
    fileGroups: Map<string, File>;
    useCache: boolean;
    doLog: boolean;
    cache: ModuleCache;
    tsConfig: any;
    customModulesFolder: string;
    tsMode: boolean;
    loadedTsConfig: string;
    globals: {
        [packageName: string]: string;
    };
    standaloneBundle: boolean;
    source: BundleSource;
    sourceMapsProject: boolean;
    sourceMapsVendor: boolean;
    inlineSourceMaps: boolean;
    sourceMapsRoot: string;
    useSourceMaps: boolean;
    initialLoad: boolean;
    debugMode: boolean;
    quantumSplitConfig: QuantumSplitConfig;
    log: Log;
    pluginTriggers: Map<string, Set<String>>;
    natives: {
        process: boolean;
        stream: boolean;
        Buffer: boolean;
        http: boolean;
    };
    autoImportConfig: {};
    bundle: Bundle;
    storage: Map<string, any>;
    aliasCollection: any[];
    experimentalAliasEnabled: boolean;
    customCodeGenerator: any;
    defer: Defer;
    initCache(): void;
    resolve(): Promise<void>;
    queue(obj: any): void;
    convertToFuseBoxPath(name: string): string;
    isBrowserTarget(): boolean;
    shouldPolyfillNonStandardDefault(file: File): boolean;
    shouldUseJsNext(libName: string): boolean;
    quantumSplit(rule: string, bundleName: string, entryFile: string): void;
    configureQuantumSplitResolving(opts: QuantumSplitResolveConfiguration): void;
    getQuantumDevelepmentConfig(): any;
    requiresQuantumSplitting(path: string): QuantumItem;
    setCodeGenerator(fn: any): void;
    generateCode(ast: any, opts?: any): any;
    emitJavascriptHotReload(file: File): void;
    debug(group: string, text: string): void;
    nukeCache(): void;
    setSourceMapsProperty(params: any): void;
    warning(str: string): Log;
    fatal(str: string): void;
    debugPlugin(plugin: Plugin, text: string): void;
    isShimed(name: string): boolean;
    isHashingRequired(): boolean;
    /**
     * Resets significant class members
     */
    reset(): void;
    initAutoImportConfig(userNatives: any, userImports: any): void;
    setItem(key: string, obj: any): void;
    getItem(key: string, defaultValue?: any): any;
    setCSSDependencies(file: File, userDeps: string[]): void;
    extractCSSDependencies(file: File, opts: ICSSDependencyExtractorOptions): string[];
    getCSSDependencies(file: File): string[];
    /**
     * Create a new file group
     * Mocks up file
     */
    createFileGroup(name: string, collection: ModuleCollection, handler: Plugin): File;
    getFileGroup(name: string): File;
    allowExtension(ext: string): void;
    addAlias(obj: any, value?: any): void;
    setHomeDir(dir: string): void;
    setLibInfo(name: string, version: string, info: IPackageInformation): Map<string, IPackageInformation>;
    /** Converts the file extension from `.ts` to `.js` */
    convert2typescript(name: string): string;
    getLibInfo(name: string, version: string): IPackageInformation;
    setPrintLogs(printLogs: boolean): void;
    setUseCache(useCache: boolean): void;
    hasNodeModule(name: string): boolean;
    isGlobalyIgnored(name: string): boolean;
    resetNodeModules(): void;
    addNodeModule(name: string, collection: ModuleCollection): void;
    /**
     * Retuns the parsed `tsconfig.json` contents
     */
    getTypeScriptConfig(): any;
    isFirstTime(): boolean;
    writeOutput(outFileWritten?: () => any): void;
    protected writeSourceMaps(result: any): void;
    shouldSplit(file: File): boolean;
    getNodeModule(name: string): ModuleCollection;
    /**
     * @param fn if provided, its called once the plugin method has been triggered
     */
    triggerPluginsMethodOnce(name: PluginMethodName, args: any, fn?: {
        (plugin: Plugin): void;
    }): void;
    /**
     * Makes sure plugin method is triggered only once
     * @returns true if the plugin needs triggering
     */
    private pluginRequiresTriggering(cls, method);
}
