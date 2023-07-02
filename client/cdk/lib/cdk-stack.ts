import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

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
    new cdk.CfnOutput(this, 'BucketLink', {
      value: bucketLink,
      exportName: 'BucketLink',
    });

    // Output the CloudFront link
    const distributionLink = distribution.distributionDomainName;
    new cdk.CfnOutput(this, 'CloudFrontLink', {
      value: distributionLink,
      exportName: 'CloudFrontLink',
    });


    // Define the DynamoDB table
    const table = new dynamodb.Table(this, 'TasksTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN if you want to retain data on stack deletion
    });

    // Create a Lambda function
    const lambdaFn = new lambda.Function(this, 'GetTodosLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lib/lambda'), // Path to your Lambda function code
      environment: {
        TABLE_NAME: table.tableName,  // DynamoDB table name
      },
      timeout: cdk.Duration.seconds(10), // Timeout after 10 seconds
    });

    // Create an AppSync GraphQL API
    const api = new appsync.GraphqlApi(this, 'GetTodosGraphQLAPI', {
      name: 'GetTodosGraphQLAPI',
      schema: appsync.SchemaFile.fromAsset('lib/graphql/schema.graphql'), // Path to your GraphQL schema file
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
    });

    // Create a Lambda data source for the GraphQL API
    const lambdaDs = api.addLambdaDataSource('lambdaDataSource', lambdaFn);

    // Create resolvers for the GraphQL API

    lambdaDs.createResolver('getTasks',{
      typeName: 'Query',
      fieldName: 'getTasks',
    });

    lambdaDs.createResolver('addTaskResolver',{
      typeName: 'Mutation',
      fieldName: 'addTask',
    });
    
    lambdaDs.createResolver('updateTaskStatus',{
      typeName: 'Mutation',
      fieldName: 'updateTaskStatus',
    });

    lambdaDs.createResolver('deleteTask', {
      typeName: 'Mutation',
      fieldName: 'deleteTask',
    });

    // Output the API endpoint URL and API key
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.graphqlUrl,
    });

    new cdk.CfnOutput(this, 'ApiKey', {
      value: api.apiKey!,
    });


    table.grantReadWriteData(lambdaFn);

    // Output the table name
    new cdk.CfnOutput(this, 'TableName', {
      value: table.tableName,
    });
  }
}
