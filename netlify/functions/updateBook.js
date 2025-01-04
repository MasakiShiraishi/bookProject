const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

exports.handler = async function(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    
    const { id } = event.queryStringParameters;
    const bookIndex = data.Books.findIndex(book => book.Id === requestBody.Id);
    if (bookIndex !== -1) {
      data.Books[bookIndex] = requestBody;
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Book updated successfully' })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Book not found' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
