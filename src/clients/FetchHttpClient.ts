import { IHTTPClient } from "../types/IHTTPClient";

class FetchHTTPClient implements IHTTPClient {
	private headers: Headers;

	constructor() {
		this.headers = new Headers();
		this.headers.append("Content-Type", "application/json");
	}

	async request(url: string, options: RequestInit): Promise<any> {
		try {
			const response = await fetch(url, options);
			const contentType = response.headers.get("Content-Type");

			if (!response.ok) {
				throw new Error(
					`Request failed with status ${response.status}: ${response.statusText}`
				);
			}
			if (contentType && this.isMediaType(contentType)) {
				return await response.arrayBuffer();
			}
			return await response.json();
		} catch (error: any) {
			throw new Error(`HTTP request failed: ${error.message}`);
		}
	}

	isMediaType(contentType: string): boolean {
		return (
			contentType.startsWith("image/") ||
			contentType.startsWith("video/") ||
			contentType.startsWith("audio/") ||
			contentType.startsWith("application/") ||
			contentType.startsWith("application/octet-stream")
		);
	}
}

export default FetchHTTPClient;
