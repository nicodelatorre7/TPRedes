const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {

    if(event.name) {
        // Handle promise fulfilled/rejected states
        await createName(event.name, event).then(() => {
            callback(null, {
                statusCode: 201,
                body: "{ name: " + event.name + "}",
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
        }).catch((err) => {
            callback(null, {
                statusCode: 400,
                body: 'Bad Request: "name" value :' + event.name +  'already exists',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
            }
        });
            console.error(err);
        });
    } else {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request: POST body must have a "name" value.',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }
};

// Function createName
// Writes name to DynamoDB table Names 
function createName(name, event) {
    const params = {
        TableName: 'Names',
        Item: {
            'name' : name,
            'allData' : event
        }
    }
    return ddb.put(params).promise();
}
