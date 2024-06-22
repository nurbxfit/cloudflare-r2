export type TokenPermission =
	| "ADMIN_READ_WRITE"
	| "ADMIN_READ"
	| "OBJECT_READ_WRITE"
	| "OBJECT_READ";

export type R2Credentials = {
	accountId: string;
	token: string;
	permission: TokenPermission;
	bucket: string | undefined;
};
