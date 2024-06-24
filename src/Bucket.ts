import CloudflareR2Client from "./services/CloudflareR2Client";
import { IBucketObject, StorageClass } from "./types/common";
import { BucketBase, BucketResult } from "./types/rawResponse";

// seems like unnecessary to implement, but why not
export default class Bucket {
	name: string;
	creationDate: Date;
	location?: string;
	storageClass?: StorageClass;
	client: CloudflareR2Client;

	constructor(
		bucketResult: BucketBase | BucketResult,
		client: CloudflareR2Client
	) {
		this.name = bucketResult.name;
		this.creationDate = bucketResult.creation_date;
		this.client = client;
	}

	async getObjects(): Promise<IBucketObject[]> {
		const bucketObjectsResponse = await this.client.getBucketObjects(this.name);
		return bucketObjectsResponse.result;
	}
	async getObject(objectKey: string): Promise<IBucketObject | undefined> {
		const bucketObjectsResponse = await this.client.searchBucketObjects(
			this.name,
			objectKey
		);
		// this is unnecessary and weird,
		const bucketObject = bucketObjectsResponse.result.find(
			(object: IBucketObject) => object.key == objectKey
		);

		// not sure want to do something like this or just return nothing if not found.
		// if (!bucketObject) throw new Error("Object not found!");
		return bucketObject;
	}

	async uploadObject(
		objectKey: string,
		objectBin: BinaryData,
		contentType?: string
	): Promise<any> {
		const uploadBucketResponse = await this.client.putBucketObject(
			this.name,
			objectKey,
			objectBin,
			contentType
		);
		return uploadBucketResponse.result;
	}

	async deleteObject(objectKey: string): Promise<any> {
		const deletedBucketResponse = await this.client.deleteBucketObject(
			this.name,
			objectKey
		);
		return deletedBucketResponse.result[0];
	}
	async deleteObjects(objectKeys: string[]): Promise<any> {
		const deletedBucketResponse = await this.client.deleteBucketObjects(
			this.name,
			objectKeys
		);
		return deletedBucketResponse.result;
	}

	async getCustomDomains(): Promise<string[]> {
		const getCustomDomainResponse = await this.client.getBucketCustomDomains(
			this.name
		);
		return getCustomDomainResponse.result.domains.map((d) => {
			if (d.status.ssl !== "active") {
				return `http://${d.domain}`;
			}
			return `https://${d.domain}`;
		});
	}

	async getObjectPublicURLs(objectKey: string): Promise<string[]> {
		const objectCustomDomains = await this.getCustomDomains();
		const foundObject = await this.getObject(objectKey);

		return !!foundObject
			? objectCustomDomains.map((domain) => `${domain}/${objectKey}`)
			: [];
	}
}
