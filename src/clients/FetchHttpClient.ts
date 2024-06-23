import { IHTTPClient } from "../types/IHTTPClient";
import ClientError from "../utils/ClientError";

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
				const errorMessage = `HTTP request failed with status ${response.status}: ${response.statusText}`;

				const responseBody = await response.json();
				if (!responseBody.success && responseBody.errors) {
					const clientError = new ClientError(
						errorMessage,
						responseBody.errors
					);
					throw clientError;
				} else {
					throw new Error(errorMessage);
				}
			}
			if (contentType && this.isMediaType(contentType)) {
				return await response.arrayBuffer();
			}
			return await response.json();
		} catch (error: any) {
			throw error;
		}
	}

	isMediaType(contentType: string): boolean {
		return (
			contentType.startsWith("image/") ||
			contentType.startsWith("video/") ||
			contentType.startsWith("audio/") ||
			!contentType.startsWith("application/json") ||
			contentType.startsWith("application/octet-stream")
		);
	}
}

export default FetchHTTPClient;
