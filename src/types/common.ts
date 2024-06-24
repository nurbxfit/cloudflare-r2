export type LocationHint = "apac" | "eeur" | "enam" | "weur" | "wnam";
export type StorageClass = "Standard" | "InfrequentAccess";
export type SortDirection = "asc" | "desc";

export type ResponseError = {
	code: number;
	message: string;
};

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
