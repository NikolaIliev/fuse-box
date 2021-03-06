import { PackageAbstraction } from "./PackageAbstraction";
import { RequireStatement } from "./nodes/RequireStatement";
import { ExportsInterop } from "./nodes/ExportsInterop";
import { UseStrict } from "./nodes/UseStrict";
import { TypeOfExportsKeyword } from "./nodes/TypeOfExportsKeyword";
import { TypeOfModuleKeyword } from "./nodes/TypeOfModuleKeyword";
import { TypeOfWindowKeyword } from "./nodes/TypeOfWindowKeyword";
import { NamedExport } from "./nodes/NamedExport";
import { GenericAst } from "./nodes/GenericAst";
import { QuantumItem } from "../plugin/QuantumSplit";
import { QuantumCore } from "../plugin/QuantumCore";
import { ReplaceableBlock } from "./nodes/ReplaceableBlock";
export declare class FileAbstraction {
    fuseBoxPath: string;
    packageAbstraction: PackageAbstraction;
    private id;
    private treeShakingRestricted;
    dependents: Set<FileAbstraction>;
    private dependencies;
    ast: any;
    fuseBoxDir: any;
    isEcmaScript6: boolean;
    shakable: boolean;
    globalsName: string;
    amountOfReferences: number;
    canBeRemoved: boolean;
    quantumItem: QuantumItem;
    namedRequireStatements: Map<string, RequireStatement>;
    /** FILE CONTENTS */
    requireStatements: Set<RequireStatement>;
    dynamicImportStatements: Set<RequireStatement>;
    fuseboxIsEnvConditions: Set<ReplaceableBlock>;
    definedLocally: Set<string>;
    exportsInterop: Set<ExportsInterop>;
    useStrict: Set<UseStrict>;
    typeofExportsKeywords: Set<TypeOfExportsKeyword>;
    typeofModulesKeywords: Set<TypeOfModuleKeyword>;
    typeofWindowKeywords: Set<TypeOfWindowKeyword>;
    typeofGlobalKeywords: Set<GenericAst>;
    typeofDefineKeywords: Set<GenericAst>;
    typeofRequireKeywords: Set<GenericAst>;
    namedExports: Map<string, NamedExport>;
    processNodeEnv: Set<ReplaceableBlock>;
    core: QuantumCore;
    isEntryPoint: boolean;
    wrapperArguments: string[];
    localExportUsageAmount: Map<string, number>;
    private globalVariables;
    constructor(fuseBoxPath: string, packageAbstraction: PackageAbstraction);
    isProcessPolyfill(): boolean;
    registerHoistedIdentifiers(identifier: string, statement: RequireStatement, resolvedFile: FileAbstraction): void;
    getFuseBoxFullPath(): string;
    isNotUsedAnywhere(): boolean;
    releaseDependent(file: FileAbstraction): void;
    markForRemoval(): void;
    /**
     * Initiates an abstraction from string
     */
    loadString(contents: string): void;
    setID(id: any): void;
    referenceQuantumSplit(item: QuantumItem): void;
    getSplitReference(): QuantumItem;
    getID(): string;
    isTreeShakingAllowed(): boolean;
    restrictTreeShaking(): void;
    addDependency(file: FileAbstraction, statement: RequireStatement): void;
    getDependencies(): Map<FileAbstraction, Set<RequireStatement>>;
    /**
     * Initiates with AST
     */
    loadAst(ast: any): void;
    /**
     * Finds require statements with given mask
     */
    findRequireStatements(exp: RegExp): RequireStatement[];
    wrapWithFunction(args: string[]): void;
    /**
     * Return true if there is even a single require statement
     */
    isRequireStatementUsed(): boolean;
    isDirnameUsed(): boolean;
    isFilenameUsed(): boolean;
    isExportStatementInUse(): boolean;
    isModuleStatementInUse(): boolean;
    isExportInUse(): boolean;
    setEnryPoint(globalsName?: string): void;
    generate(ensureEs5?: boolean): any;
    /**
     *
     * @param node
     * @param parent
     * @param prop
     * @param idx
     */
    private onNode(node, parent, prop, idx);
    private detectLocallyDefinedSystemVariables(node);
    analyse(): void;
}
