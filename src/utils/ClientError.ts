type CloudflareError = {
	code: number;
	message: string;
};
export default class ClientError extends Error {
	errors: CloudflareError[];
	constructor(message: string, errors: CloudflareError[]) {
		super(message);
		this.errors = errors;
	}
}
