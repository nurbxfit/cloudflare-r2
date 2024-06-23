export type LocationHint = "apac" | "eeur" | "enam" | "weur" | "wnam";
export type StorageClass = "Standard" | "InfrequentAccess";
export type SortDirection = "asc" | "desc";

export type ResponseError = {
	code: number;
	message: string;
};

// this interface maybe get deleted in future.
// Interface representing a bucket in the storage system
export interface IBucket {
	name: string;
	creationDate: Date;
	location?: string;
	storageClass?: StorageClass;

	// Method to get a list of objects in the bucket
	getObjects(): Promise<IBucketObject[]>;

	// Method to get a specific object from the bucket by its name
	getObject(objectKey: string): Promise<IBucketObject | undefined>;

	// Method to upload an object to the bucket
	uploadObject(objectKey: string, objectBin: BinaryData): Promise<any>;

	// Method to delete a specific object from the bucket by its name
	deleteObject(objectKey: string): Promise<any>;

	// Method to delete multiple objects from the bucket by their names
	deleteObjects(objectKeys: string[]): Promise<any>;

	// Method to get custom domains URL from the bucket
	getCustomDomains(): Promise<string[]>;

	// Method to get object public URLs
	getObjectPublicURLs(objectKey: string): Promise<string[]>;
}

// Interface representing an object within a bucket
export interface IBucketObject {
	key: string;
	etag: string;
	last_modified: Date;
	size: number;
	http_metadata: {
		contentType: string;
	};
	custom_metadata: any;
	storage_class: StorageClass;
}
