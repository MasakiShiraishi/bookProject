const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

exports.handler = async function(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    
    const newQuote = requestBody;
    newQuote.Id = data.Quotations.length ? Math.max(...data.Quotations.map(quote => quote.Id)) + 1 : 1;
    data.Quotations.push(newQuote);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return {
      statusCode: 200,
      body: JSON.stringify(newQuote)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
