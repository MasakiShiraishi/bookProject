const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

exports.handler = async function (event, context) {
  try {
    const id = Number(event.path.split('/').pop());
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const quoteIndex = data.Quotations.findIndex((quote) => quote.id === id);

    if (quoteIndex !== -1) {
      data.Quotations.splice(quoteIndex, 1);
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Quotation deleted successfully' }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Quotation not found' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
