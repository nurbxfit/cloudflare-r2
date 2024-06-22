import {
	IBucketObject,
	LocationHint,
	ResponseError,
	StorageClass,
} from "./common";

export type BaseResponse = {
	success: boolean;
	errors: ResponseError[];
	messages: string[];
};

export type BucketBase = {
	name: string;
	creation_date: Date;
};

export type BucketResult = BucketBase & {
	location: LocationHint;
	storage_class: StorageClass;
};

export type ListBucketResponse = BaseResponse & {
	result: {
		buckets: BucketBase[];
	};
};

export type GetBucketResponse = BaseResponse & {
	result: BucketResult;
};

export type CreateBucketResponse = BaseResponse & {
	result: BucketResult;
};

export type DeleteBucketResponse = BaseResponse;

export type GetBucketObjectsResponse = BaseResponse & {
	result: IBucketObject[];
};

export type GetBucketObjectResponse = BaseResponse & {
	result: {};
};

export type UploadObjectResponse = BaseResponse & {
	result: {
		key: string;
		size: string;
		etag: string;
		version: string;
		uploaded: Date;
		storage_class: StorageClass;
	};
};

export type DeleteObjectResponse = BaseResponse & {
	result: { key: string }[];
};
