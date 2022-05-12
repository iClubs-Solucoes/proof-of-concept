import * as AWS from 'aws-sdk';

export declare namespace IDynamoDb {
  export interface PutItemInput {
    Item: unknown;
    Expected?: AWS.DynamoDB.ExpectedAttributeMap;
    ReturnValues?: AWS.DynamoDB.ReturnValue;
    ReturnConsumedCapacity?: AWS.DynamoDB.ReturnConsumedCapacity;
    ReturnItemCollectionMetrics?: AWS.DynamoDB.ReturnItemCollectionMetrics;
    ConditionalOperator?: AWS.DynamoDB.ConditionalOperator;
    ConditionExpression?: AWS.DynamoDB.ConditionExpression;
    ExpressionAttributeNames?: AWS.DynamoDB.ExpressionAttributeNameMap;
    ExpressionAttributeValues?: AWS.DynamoDB.ExpressionAttributeValueMap;
  }

  export interface ScanItemInput {
    IndexName?: AWS.DynamoDB.IndexName;
    AttributesToGet?: AWS.DynamoDB.AttributeNameList;
    Limit?: AWS.DynamoDB.PositiveIntegerObject;
    Select?: AWS.DynamoDB.Select;
    ScanFilter?: AWS.DynamoDB.FilterConditionMap;
    ConditionalOperator?: AWS.DynamoDB.ConditionalOperator;
    ExclusiveStartKey?: AWS.DynamoDB.Key;
    ReturnConsumedCapacity?: AWS.DynamoDB.ReturnConsumedCapacity;
    TotalSegments?: AWS.DynamoDB.ScanTotalSegments;
    Segment?: AWS.DynamoDB.ScanSegment;
    ProjectionExpression?: AWS.DynamoDB.ProjectionExpression;
    FilterExpression?: AWS.DynamoDB.ConditionExpression;
    ExpressionAttributeNames?: AWS.DynamoDB.ExpressionAttributeNameMap;
    ExpressionAttributeValues?: AWS.DynamoDB.ExpressionAttributeValueMap;
    ConsistentRead?: AWS.DynamoDB.ConsistentRead;
  }
}