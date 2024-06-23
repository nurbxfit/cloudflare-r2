# Cloudflare-R2 Node Client SDK

This is a minimal node.js client for cloudflare R2 API. I try to make a simple minimal http client for R2.
Some example use the AWS-sdk to manage R2, but I decided to create one using just node.js fetch.

# Installation

npm

```
npm install @nurbxfit/cloudflare-r2
```

yarn

```
yarn add @nurbxfit/cloudflare-r2
```

# Usage

Note:
To use the create/delete/list bucket method, we need a token that been given ADMIN READ WRITE permission.

## Basic Usage

```ts
import { CloudflareR2 } from "cloudflare-r2-sdk";

async function main() {
	const r2 = new cloudflareR2({
		permission: "ADMIN_READ_WRITE",
		accountId: "c4vnx32e0excxx9f7c79c6xxxx24a482f",
		token: "xxxWpSFbGEWxhWxxxxeJwxxxxxdGJGJLQjlqX",
		bucket: "example",
	});

	// will return list of [object] bucket
	const buckets = await r2.listBuckets();
	console.log("BucketList:", buckets);
}
```

## Create Bucket

this will create a new bucket

```ts
const bucketName = "example";
const location = "apac";
const storageClass = "Standard";

try {
	// note: storageClass is optional, by default is set to Standard,
	// will return createdBucket if success, else throw an error
	const createdBucket = await r2.createBucket(
		bucketName,
		location,
		storageClass
	);
} catch (error) {
	// .... handle error
}
```

## Delete Bucket

this will delete bucket

```ts
const bucketName = "example";
try {
	// this will return true i success, else will throw errors;
	const deletedBucket = await r2.deleteBucket(bucketName);
} catch (error) {
	//... handle errors
}
```

## Get Bucket

this will return a bucket,
we can use this object to list the bucket object (content)

```ts
const bucketName = "example";

const bucket = await r2.getBucket(bucketName);
console.log("Bucket:", bucket);

// List bucket objects
const bucketObjects = await bucket.getObjects();

// we can also get a single bucket object
// replace BUCKET_OBJECT_KEY with the object name eg format: foldername/filename.extension
const bucketObject = await bucket.getObject("<BUCKET_OBJECT_KEY>");
```

Note: the bucketObjects structure look like this,
Bucket and BucketObject is two different things.
BucketObject is the content of the bucket

```ts
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
```

## Upload object to bucket

```ts
const objectKey = "mypicture.jpg";
const myObject = getData(); // Replace with your binary data

try {
	const uploaded = await bucket.uploadObject(objectKey, myObject);
} catch (error) {
	//... handle the error
}
```

## Delete object from bucket

```ts
const objectKey = "mypicture.jpg";
try {
	const deleted = await bucket.deleteObject(objectKey);
} catch (error) {
	// ... handle the error
}
```

## Delete multiple objects from bucket

```ts
const objectKeys = ["mypicture.jpg", "myResume.pdf", "myVideo.mp4"];
try {
	const deleted = await bucket.deleteObject(objectKeys);
} catch (error) {
	// ... handle the error
}
```
