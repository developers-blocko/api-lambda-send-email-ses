const AWS = require('aws-sdk'),
    SES = new AWS.SES(),
    processResponse = require('./process-response.js'),
    UTF8CHARSET = 'UTF-8';
const axios = require('axios');

const slackUrlProd = "https://hooks.slack.com/services/asdfa";
const slackUrlTest = "https://hooks.slack.com/services/asdf2";

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return processResponse(true);
  }

  // console.log(event);
  const eventString = JSON.stringify(event);
  let slackUrl = slackUrlTest;
  if (eventString && eventString.length > 0 && eventString.contains('"prod-')){
    slackUrl = slackUrlProd;
  }

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

