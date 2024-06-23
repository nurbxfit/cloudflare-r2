import { IHTTPClient } from "../types/IHTTPClient";
import { CreateBucketBody } from "../types/rawRequestParams";
import {
	CreateBucketResponse,
	DeleteBucketResponse,
	DeleteObjectResponse,
	GetBucketObjectResponse,
	GetBucketObjectsResponse,
	GetBucketResponse,
	ListBucketResponse,
	UploadObjectResponse,
} from "../types/rawResponse";

export default class CloudflareR2Client {
	constructor(
		private httpClient: IHTTPClient,
		private endpoint: string,
		private accountId: string,
		private token: string
	) {
		this.endpoint = endpoint + `/client/v4/accounts/${this.accountId}/r2`;
	}

	private getHeaders() {
		return {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.token}`,
		};
	}

	async getBucketAsync(bucketName: string): Promise<GetBucketResponse> {
		const url = new URL(`${this.endpoint}/buckets/${bucketName}`);
		return this.httpClient.request(url, {
			method: "GET",
			headers: this.getHeaders(),
		});
	}

	async listBucketsAsync(): Promise<ListBucketResponse> {
		const url = new URL(`${this.endpoint}/buckets`);
		return this.httpClient.request(url, {
			method: "GET",
			headers: this.getHeaders(),
		});
	}

	async createBucketAsync(
		bucketOptions: CreateBucketBody
	): Promise<CreateBucketResponse> {
		const url = new URL(`${this.endpoint}/buckets`);
		return this.httpClient.request(url, {
			method: "POST",
			headers: this.getHeaders(),
			body: JSON.stringify(bucketOptions),
		});
	}

	async deleteBucketAsync(bucketName: string): Promise<DeleteBucketResponse> {
		const url = new URL(`${this.endpoint}/buckets/${bucketName}`);
		return this.httpClient.request(url, {
			method: "DELETE",
			headers: this.getHeaders(),
		});
	}

	async getBucketObjects(
		bucketName: string
	): Promise<GetBucketObjectsResponse> {
		const url = new URL(`${this.endpoint}/buckets/${bucketName}/objects`);
		return this.httpClient.request(url, {
			method: "GET",
			headers: this.getHeaders(),
		});
	}

	async searchBucketObjects(
		bucketName: string,
		objectKey: string
	): Promise<GetBucketObjectsResponse> {
		const url = new URL(
			`${this.endpoint}/buckets/${bucketName}/objects?delimiter=%2F&prefix=${objectKey}`
		);
		return this.httpClient.request(url, {
			method: "GET",
			headers: this.getHeaders(),
		});
	}

	async getBucketObject(
		bucketName: string,
		objectKey: string
	): Promise<GetBucketObjectResponse> {
		const url = new URL(
			`${this.endpoint}/buckets/${bucketName}/objects/${objectKey}`
		);
		return this.httpClient.request(url, {
			method: "GET",
			headers: this.getHeaders(),
		});
	}

	async putBucketObject(
		bucketName: string,
		objectKey: string,
		objectBin: BinaryData,
		contentType?: string
	): Promise<UploadObjectResponse> {
		const url = new URL(
			`${this.endpoint}/buckets/${bucketName}/objects/${objectKey}`
		);

		const headers = this.getHeaders();
		headers["Content-Type"] = contentType ?? "application/octet-stream";

		return this.httpClient.request(url, {
			method: "PUT",
			headers,
			body: objectBin,
		});
	}

	async deleteBucketObject(
		bucketName: string,
		objectKey: string
	): Promise<DeleteObjectResponse> {
		const url = new URL(`${this.endpoint}/buckets/${bucketName}/objects`);
		return this.httpClient.request(url, {
			method: "DELETE",
			headers: this.getHeaders(),
			body: JSON.stringify([objectKey]),
		});
	}
}
