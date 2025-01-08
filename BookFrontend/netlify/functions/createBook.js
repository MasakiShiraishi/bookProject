const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

exports.handler = async function(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    console.log('Request Body:', requestBody);
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    console.log('Data:', data);
    const newBook = {
      ...requestBody,
      id: data.Books.length ? Math.max(...data.Books.map(book => book.id)) + 1 : 1
    };

    console.log('Generated new ID:', newBook.id);

    data.Books.push(newBook);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(newBook)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
