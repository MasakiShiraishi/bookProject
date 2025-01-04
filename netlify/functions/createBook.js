const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

exports.handler = async function(event, context) {
  try {
    const requestBody = JSON.parse(event.body);
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    
    const newBook = requestBody;
    newBook.Id = data.Books.length ? Math.max(...data.Books.map(book => book.Id)) + 1 : 1;
    data.Books.push(newBook);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return {
      statusCode: 200,
      body: JSON.stringify(newBook)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
