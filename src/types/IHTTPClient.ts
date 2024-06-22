export interface IHTTPClient {
	request(url: string | URL, options: RequestInit): Promise<any>;
	// setHeaders(headers: Record<string, string>): any;
	// setEndpoint(endpoint: string): void;
}
