#load ../amazon.csx

pvc.Task("push", () => {
	pvc.Source("src/**/*.*")
	   .Pipe((streams) => {
		// strip src folder from paths
		var currentDirectory = Directory.GetCurrentDirectory();
		var resultStreams = new List<PvcStream>();
		foreach (var stream in streams) {
			var fullPath = Path.GetFullPath(stream.StreamName);
			var relPath = fullPath.Substring(currentDirectory.Length + "src/".Length + 1);

			resultStreams.Add(new PvcStream(() => stream).As(relPath, stream.OriginalSourcePath));
		}

		return resultStreams;
	   })
	   .Pipe(new PvcCloudFront(
		accessKey: keys.accessKey,
		secretKey: keys.secretKey,
		bucketName: "pvcbuild.com",
		distributionId: "E13RNZ6AJTCYUR"
	   ));
});
