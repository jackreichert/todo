const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

exports.handler = async (event) => {
  console.log('Environment variables:', process.env);
  console.log('Received event:', JSON.stringify(event, null, 2));

  switch (event.info.fieldName) {
    case 'addTask': {
      console.log('Handling "addTask" mutation');

      const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
          id: uuid.v4(),
          title: event.arguments.title,
          status: event.arguments.status,
        },
      };

      console.log('DynamoDB put params:', JSON.stringify(params, null, 2));

      const response = await dynamoDb.put(params).promise();

      console.log('DynamoDB put response:', JSON.stringify(response, null, 2));

      return params.Item;
    }

    case 'getTasks': {
      console.log('Handling "getTasks" query');

      const params = {
        TableName: process.env.TABLE_NAME,
      };

      try {
        const result = await dynamoDb.scan(params).promise();
        return result.Items;
      } catch (error) {
        console.error('Error retrieving tasks:', error);
        throw new Error('Failed to retrieve tasks');
      }
    }

    case 'updateTaskStatus': {
      console.log('Handling "updateTaskStatus" mutation');

      const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          id: event.arguments.id,
        },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': event.arguments.status,
        },
        ReturnValues: 'ALL_NEW',
      };

      try {
        const result = await dynamoDb.update(params).promise();
        return result.Attributes;
      } catch (error) {
        console.error('Error updating task status:', error);
        throw new Error('Failed to update task status');
      }
    }

    default: {
      console.log(`Unknown field: ${event.info.fieldName}`);
      break;
    }
  }
};
