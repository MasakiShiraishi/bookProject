const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

exports.handler = async function(event, context) {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const quotes = data.Quotations;
    return {
      statusCode: 200,
      body: JSON.stringify(quotes)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
