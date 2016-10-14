interface IDBSFactory {

    start(): void;

    stop(): void;

    addData(armatureName: string, armatureTexName: string): void

    getArmature(ArmatureName: string, ...args): DBArmature;
}
