interface IPanelManager {
	
	open(pn: string, info?: any): void;

	close(): void;

	closeAll(): void;
}
