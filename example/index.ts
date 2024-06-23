import { CloudflareR2, R2Credentials } from "@nurbxfit/cloudflare-r2";
import credentialsJson from "./credentials.json";
import fs from "fs";

async function main() {
	const r2 = new CloudflareR2(credentialsJson as R2Credentials);
	try {
		// ======= EXAMPLE DELETE BUCKET =======================
		// const deletedBucket1 = await r2.deleteBucket("created-ok-2");
		// console.log("DeletedBuckets:", deletedBucket1);

		// ======= EXAMPLE CREATE BUCKET =======================
		// const newBucket = await r2.createBucket("created-ok-2", "apac");
		// console.log("NewBucket:", newBucket);

		// ======= EXAMPLE LIST BUCKETS ========================

		// const buckets = await r2.listBuckets();
		// console.log("Buckets:", buckets);

		// ======= EXAMPLE GET BUCKET ==========================

		const bucket = await r2.getBucket("example");
		console.log("Bucket:", bucket);

		// ======= EXAMPLE LIST BUCKET OBJECTS ==================

		// const bucketObjects = await bucket.getObjects();
		// console.log("Objects:", bucketObjects);

		// ======= EXAMPLE GET SINGLE BUCKET OBJECT =============

		// const bucketObject = await bucket.getObject("sorachi-test01.jpg");
		// console.log("Object:", bucketObject);

		// ======= EXAMPLE UPLOAD OBJECT TO BUCKET ===============
		const objectToUpload = fs.createReadStream("./example.txt");

		const uploaded = await bucket.uploadObject(
			"example.txt",
			objectToUpload,
			"text/plain"
		);
		console.log("UploadedText:", uploaded);

		const imageToUpload = fs.createReadStream("./images.jpeg");
		const uploadedImage = await bucket.uploadObject(
			"gintoki.jpeg",
			imageToUpload,
			"image/jpeg"
		);
		console.log("uploadedImage:", uploadedImage);

		// ========= EXAMPLE DELETE OBJECT FROM BUCKET ===========
		// const deletedObject = await bucket.deleteObject("gintoki.jpeg");
		// console.log("Deleted:", deletedObject);

		// ========= EXAMPLE DELETE MULTIPLE OBJECTS FROM BUCKET =====
		// const deletedObjects = await bucket.deleteObjects([
		// 	"gintoki.jpeg",
		// 	"example.txt",
		// ]);

		// console.log("DeletedObjects:", deletedObjects);
	} catch (error) {
		console.log(error);
	}
}

main();
