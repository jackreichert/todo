import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
const fs = require('fs');

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'DemoTodoAppBucketTest', {
      versioned: true,
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    });

    const distribution = new cloudfront.Distribution(this, 'CdkDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED, // to override the default managed policy
      },
    });

    // Output the bucket link
    const bucketLink = bucket.bucketDomainName;
    const bucketLinkOutput = new cdk.CfnOutput(this, 'BucketLink', {
      value: bucketLink,
      exportName: 'BucketLink',
    });

    fs.writeFileSync('cdk.out/bucketLink.txt', bucketLinkOutput.value.toString());

    // Output the CloudFront link
    const distributionLink = distribution.distributionDomainName;
    const distributionLinkOutput = new cdk.CfnOutput(this, 'CloudFrontLink', {
      value: distributionLink,
      exportName: 'CloudFrontLink',
    });

    fs.writeFileSync('cdk.out/distributionLink.txt', distributionLinkOutput.value.toString());
  }
}
