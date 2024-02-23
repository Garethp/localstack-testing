import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { promises as fs } from "fs";
import path from "path";

void (async () => {
  const s3Client = new S3Client({
    endpoint: "https://localhost.localstack.cloud:4566",
    region: "eu-west-2",
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
  });

  const presignedUpload = await createPresignedPost(s3Client, {
    Bucket: "test-bucket",
    Key: "package.json",
  });

  const file = await fs.readFile(path.join(__dirname, "./package.json"));
  const form = new FormData();
  for (const key of Object.keys(presignedUpload.fields)) {
    form.append(key, presignedUpload.fields[key]);
  }
  // @ts-ignore
  form.append("file", file);

  await fetch("https://s3.localhost.localstack.cloud:4566/test-bucket/", {
    method: "POST",
    body: form,
  });
})();
