const fs = require('fs');
const path = require('path');

const tmpDataFilePath = '/tmp/data.json'; 

exports.handler = async function(event, context) {
  try {
    const id = parseInt(event.path.split('/').pop(), 10);
    console.log('Book ID to delete:', id);

    let data;
    if (fs.existsSync(tmpDataFilePath)) {
      data = JSON.parse(fs.readFileSync(tmpDataFilePath, 'utf-8'));
    } else {
      const originalDataFilePath = path.join(__dirname, 'data.json');
      data = JSON.parse(fs.readFileSync(originalDataFilePath, 'utf-8'));
      fs.writeFileSync(tmpDataFilePath, JSON.stringify(data, null, 2));
    }
    console.log('Data:', data);

    const bookIndex = data.Books.findIndex(book => book.id === id);
    console.log('Book Index:', bookIndex);

    if (bookIndex !== -1) {
      data.Books.splice(bookIndex, 1);
      fs.writeFileSync(tmpDataFilePath, JSON.stringify(data, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Book deleted successfully' })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Book not found' })
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
