const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const id = parseInt(event.path.split('/').pop(), 10);
    await client.connect();
    const database = client.db('BookDatabase');
    const booksCollection = database.collection('Books');

    const book = await booksCollection.findOne({ id: id });
    if (book) {
      console.log('Found Book:', book);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify(book)
      };
    } else {
      console.log('Book Not Found for ID:', id);
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
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
      },
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await client.close();
  }
};
