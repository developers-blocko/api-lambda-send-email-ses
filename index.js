const AWS = require('aws-sdk'),
    SES = new AWS.SES(),
    processResponse = require('./process-response.js'),
    UTF8CHARSET = 'UTF-8';
const axios = require('axios');

const slackUrl = "https://hooks.slack.com/services/sdfsdfsdf";

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return processResponse(true);
  }

  // console.log(event);
  const eventString = JSON.stringify(event);

  try {
    const slackMessage = {
      text: "Queue Trigger - " + eventString
    };
    console.log(slackMessage);
    const res = await axios.post(slackUrl, slackMessage);
    console.log(`res.data: ${res.data}`)
    return processResponse(true);

  } catch (err){
    console.error(err, err.stack);
    const errorResponse = `Error: Execution update, caused a slack post error, please look at your logs.`;
    return processResponse(true, errorResponse, 500);
  }
};

