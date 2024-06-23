<center><img src="https://capsule-render.vercel.app/api?type=rounded&height=300&color=gradient&text=Cloudflare-R2&textBg=false&section=header&reversal=false&animation=fadeIn" /></center>

# Cloudflare-R2 Node Client SDK

This is a minimal Node.js client for Cloudflare R2 API. It provides a simple HTTP client to interact with R2 using Node.js fetch. I Try to make it as minimal with 0 dependencies.

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
const objectKey = "gintoki.jpeg";
const myObject = fs.createReadStream("./images.jpeg"); // Replace with your binary data

try {
	const uploaded = await bucket.uploadObject(objectKey, myObject, "image/jpeg");
	console.log("uploadedImage:", uploadedImage);
} catch (error) {
	//... handle the error
}
```

## Delete object from bucket

```ts
const objectKey = "mypicture.jpg";
try {
	const deleted = await bucket.deleteObject(objectKey);
	console.log("Deleted:", deletedObject);
} catch (error) {
	// ... handle the error
}
```

## Delete multiple objects from bucket

```ts
const objectKeys = ["mypicture.jpg", "myResume.pdf", "myVideo.mp4"];
try {
	const deleted = await bucket.deleteObjects(objectKeys);
	console.log("DeletedObjects:", deletedObjects);
} catch (error) {
	// ... handle the error
}
```

## Get Bucket Custom Domain URL

If custom domain was enabled in the R2 Bucket settings.
We can get the custom domain url using this method

### R2 level

Using R2 to get custom domain by specifying the bucket name as parameter.

```ts
const bucketName = "example";
const bucketCustomDomains = await r2.getBucketCustomDomainsURL(bucketName);
console.log(bucketCustomDomains); // result:  [ 'https://custom.domain.com' ]
```

### Bucket level

using bucket level without having to specify the bucket name

```ts
const customDomains = await bucket.getCustomDomains();
console.log(customDomains); // result:  [ 'https://custom.domain.com' ]
```

## Get Object Public URL

when we setup the custom domain, we are able to access our object publicly using the custom domain URL.
We can get this domain URL using the following method in bucket level.

```ts
const objectKey = "24749830.jpeg";
const publicURLs = await bucket.getObjectPublicURLs(objectKey);
console.log(publicURLs); // result : [ 'https://custom.domain.com/24749830.jpeg' ]
```

# More Example Usage

Check the `/example/index.ts` for some example usage.
