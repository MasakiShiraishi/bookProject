const fs = require('fs');
const path = require('path');

const tmpDataFilePath = '/tmp/data.json'; 

exports.handler = async function(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    console.log('Request Body:', requestBody);

    let data;
    
    if (fs.existsSync(tmpDataFilePath)) {
      data = JSON.parse(fs.readFileSync(tmpDataFilePath, 'utf-8'));
    } else {
      const originalDataFilePath = path.join(__dirname, 'data.json');
      data = JSON.parse(fs.readFileSync(originalDataFilePath, 'utf-8'));
      fs.writeFileSync(tmpDataFilePath, JSON.stringify(data, null, 2));
    }
    console.log('Data:', data);

    const newBook = {
      ...requestBody,
      id: data.Books.length ? Math.max(...data.Books.map(book => book.id)) + 1 : 1
    };

    console.log('Generated new ID:', newBook.id);

    data.Books.push(newBook);
    fs.writeFileSync(tmpDataFilePath, JSON.stringify(data, null, 2));

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
