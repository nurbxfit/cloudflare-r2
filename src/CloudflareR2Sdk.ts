import Bucket from "./Bucket";
import FetchHTTPClient from "./clients/FetchHttpClient";
import CloudflareR2Client from "./services/CloudflareR2Client";
import { IBucket, LocationHint, StorageClass } from "./types/common";
import { R2Credentials } from "./types/credentials";
import { BucketBase } from "./types/rawResponse";

export class CloudflareR2 {
	endpoint: string = "https://api.cloudflare.com";
	r2client: CloudflareR2Client;

	constructor(credentials: R2Credentials) {
		const fetchHTTPClient = new FetchHTTPClient();
		this.r2client = new CloudflareR2Client(
			fetchHTTPClient,
			this.endpoint,
			credentials.accountId,
			credentials.token
		);
	}

	async listBuckets(): Promise<BucketBase[]> {
		const bucketListResponse = await this.r2client.listBucketsAsync();
		if (!bucketListResponse.success) {
			throw bucketListResponse.errors;
		}
		return bucketListResponse.result.buckets;
	}

	async getBucket(bucketName: string): Promise<IBucket> {
		const bucketResponse = await this.r2client.getBucketAsync(bucketName);
		if (!bucketResponse.success) {
			throw bucketResponse.errors;
		}
		return new Bucket(bucketResponse.result, this.r2client);
	}

	async deleteBucket(bucketName: string) {
		const deleteBucketResponse = await this.r2client.deleteBucketAsync(
			bucketName
		);

		if (!deleteBucketResponse.success) {
			throw deleteBucketResponse.errors;
		}
		return deleteBucketResponse.success;
	}

	async createBucket(
		bucketName: string,
		location: LocationHint,
		storageClass: StorageClass = "Standard"
	) {
		const createBucketResponse = await this.r2client.createBucketAsync({
			name: bucketName,
			locationHint: location,
			storageClass,
		});

		if (!createBucketResponse.success) {
			throw createBucketResponse.errors;
		}
		return createBucketResponse.result;
	}

	async getBucketCustomDomainsURL(bucketName: string): Promise<string[]> {
		const getCustomDomainResponse = await this.r2client.getBucketCustomDomains(
			bucketName
		);

		return getCustomDomainResponse.result.domains.map((d) => {
			if (d.status.ssl !== "active") {
				return `http://${d.domain}`;
			}
			return `https://${d.domain}`;
		});
	}
}
