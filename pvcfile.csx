pvc.Task("push", () => {
	pvc.Source("src/**/*.*")
	   .Pipe(new PvcCloudFront(
		accessKey: "AKIAJSXIWWRKEKH5RTZQ",
		secretKey: "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",
		bucketName: "pvcbuild-com",
		distributionId: "E13RNZ6AJTCYUR"
	   ));
});
