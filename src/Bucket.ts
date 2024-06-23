import CloudflareR2Client from "./services/CloudflareR2Client";
import { IBucket, IBucketObject, StorageClass } from "./types/common";
import { BucketBase, BucketResult } from "./types/rawResponse";

export default class Bucket implements IBucket {
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

	async deleteObject(objectKey: string): Promise<any> {}
	async deleteObjects(objectKeys: string[]): Promise<any> {}
}
