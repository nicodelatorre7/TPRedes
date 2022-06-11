const AWS = require('aws-sdk'); 
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'}); 

exports.handler = async (event, context, callback) => {
    // Handle promise fulfilled/rejected states
    await readNames().then(data => {
        data.Items.forEach(function(item) {
            console.log(item.name);
        });
        callback(null, {
            // If success return 200, and items
            statusCode: 200,
            body: data.Items,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        // If an error occurs write to the console
        console.error(err);
    });
};

// Function readMessage
function readNames() {
    const params = {
        TableName: 'Names',
    };
    return ddb.scan(params).promise();
}
