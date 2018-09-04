const AWS = require('aws-sdk');

const options = {
    // endpoint: 'https://8x4k8f8o93.execute-api.us-east-1.amazonaws.com/dev',
    region: 'us-east-1'
}

let lambda = new AWS.Lambda(options);

var params = {
    FunctionName: "getMPG"
};
lambda.getFunction(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    /*
    data = {
     Code: {
      Location: "somelocation", 
      RepositoryType: "S3"
     }, 
     Configuration: {
      CodeSha256: "LQT+0DHxxxxcfwLyQjzoEFKZtdqQjHXanlSdfXBlEW0VA=", 
      CodeSize: 262, 
      Description: "A starter AWS Lambda function.", 
      Environment: {
       Variables: {
        "S3_BUCKET": "test"
       }
      }, 
      FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myFunction", 
      FunctionName: "myFunction", 
      Handler: "index.handler", 
      LastModified: "2016-11-21T19:49:20.006+0000", 
      MemorySize: 128, 
      Role: "arn:aws:iam::123456789012:role/lambda_basic_execution", 
      Runtime: "nodejs4.3", 
      Timeout: 3, 
      Version: "$LATEST", 
      VpcConfig: {
       SecurityGroupIds: [
       ], 
       SubnetIds: [
       ]
      }
     }
    }
    */
});