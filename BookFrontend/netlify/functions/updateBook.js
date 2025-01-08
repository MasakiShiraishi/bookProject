const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

exports.handler = async function(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    console.log('Request Body:', requestBody);

    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    console.log('Data:', data);
    const bookIndex = data.Books.findIndex(book => book.id === requestBody.id);
    console.log('Book Index:', bookIndex);
    
    if (bookIndex !== -1) {
      data.Books[bookIndex] = requestBody;
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'PUT'
        },
        body: JSON.stringify({ message: 'Book updated successfully' })
      };
    } else {
      console.log('Book Not Found for ID:', requestBody.id);
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'PUT'
        },
        body: JSON.stringify({ message: 'Book not found' })
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
