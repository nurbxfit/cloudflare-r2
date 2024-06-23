import { CloudflareR2, R2Credentials } from "@nurbxfit/cloudflare-r2-node";
import credentialsJson from "./credentials.json";

async function main() {
	const r2 = new CloudflareR2(credentialsJson as R2Credentials);
	try {
		// const deletedBucket1 = await r2.deleteBucket("created-ok-2");
		// console.log("DeletedBuckets:", deletedBucket1);

		// const newBucket = await r2.createBucket("created-ok-2", "apac");
		// console.log("NewBucket:", newBucket);

		const buckets = await r2.listBuckets();
		console.log("Buckets:", buckets);

		const bucket = await r2.getBucket("example");
		console.log("Bucket:", bucket);

		const bucketObjects = await bucket.getObjects();
		console.log("Objects:", bucketObjects);
	} catch (error) {
		console.log(error);
	}
}

main();
