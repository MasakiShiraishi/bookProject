const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const id = parseInt(event.path.split('/').pop(), 10);
    console.log('Book ID to delete:', id);

    await client.connect();
    const database = client.db('BookDatabase');
    const booksCollection = database.collection('Books');

    const result = await booksCollection.deleteOne({ id: id });
    if (result.deletedCount === 1) {
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
  } finally {
    await client.close();
  }
};
