const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    // Handle promise fulfilled/rejected states
    const dbName = event.some_name;

    await getName(dbName).then(data => {
        callback(null, {
            // If success return 200, and item
            statusCode: 200,
            body: data.Item,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        // If an error occurs write to the console
        console.error(err);
    });
};


// Function getName
// Get one name of DynamoDB table Names 
function getName(dbName) {
    const params = {
        TableName: 'Names',
        Key: {
            name: dbName
        }
    };
    
    return ddb.get(params).promise();
}
