import { BundleWriter } from "./BundleWriter";
import { ProducerAbstraction } from "../core/ProducerAbstraction";
import { BundleProducer } from "../../core/BundleProducer";
import { BundleAbstraction } from "../core/BundleAbstraction";
import { FileAbstraction } from "../core/FileAbstraction";
import { ResponsiveAPI } from "./ResponsiveAPI";
import { Log } from "../../Log";
import { QuantumOptions } from "./QuantumOptions";
import { ComputedStatementRule } from "./ComputerStatementRule";
import { RequireStatement } from "../core/nodes/RequireStatement";
import { WorkFlowContext } from "../../core/WorkflowContext";
export interface QuantumStatementMapping {
    statement: RequireStatement;
    core: QuantumCore;
}
export declare class QuantumCore {
    producer: BundleProducer;
    producerAbstraction: ProducerAbstraction;
    api: ResponsiveAPI;
    index: number;
    log: Log;
    opts: QuantumOptions;
    writer: BundleWriter;
    context: WorkFlowContext;
    requiredMappings: Set<RegExp>;
    customStatementSolutions: Set<RegExp>;
    computedStatementRules: Map<string, ComputedStatementRule>;
    splitFiles: Set<FileAbstraction>;
    constructor(producer: BundleProducer, opts: QuantumOptions);
    solveComputed(path: string, rules?: {
        mapping: string;
        fn: {
            (statement: RequireStatement, core: QuantumCore): void;
        };
    }): void;
    getCustomSolution(file: FileAbstraction): ComputedStatementRule;
    consume(): Promise<void>;
    private printStat();
    compriseAPI(): void;
    handleMappings(fuseBoxFullPath: string, id: any): void;
    prepareSplitFiles(): void;
    prepareFiles(bundleAbstraction: BundleAbstraction): void;
    processBundle(bundleAbstraction: BundleAbstraction): Promise<any>;
    treeShake(): Promise<any>;
    render(): Promise<any>;
    hoist(): Promise<any>;
    modify(file: FileAbstraction): Promise<any>;
}
