import { LocationHint, SortDirection, StorageClass } from "./common";

export type ListBucketsPathParams = {
	account_id: string;
};

export type ListBucketsQueryParams = {
	cursor: string;
	direction: SortDirection;
	name_contains: string;
	order: "name";
	per_page: number;
	start_after: string;
};

export type CreateBucketBody = {
	locationHint: string & LocationHint;
	name: string;
	storageClass: string & StorageClass;
};

type BaseBucketPathParams = {
	account_id: string;
	bucket_name: string;
};

export type DeleteBucketPathParams = BaseBucketPathParams;
export type GetBucketPathParams = BaseBucketPathParams;
