#load ../amazon.csx

pvc.Task("push", () => {
	pvc.Source("src/**/*.*")
	   .Pipe(new PvcCloudFront(
		accessKey: keys.accessKey,
		secretKey: keys.secretKey,
		bucketName: "pvcbuild-com",
		distributionId: "E13RNZ6AJTCYUR"
	   ));
});
