const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const requestBody = JSON.parse(event.body);
    await client.connect();
    const database = client.db('BookDatabase');
    const booksCollection = database.collection('Books');

    const newBook = {
      ...requestBody,
      id: await booksCollection.countDocuments() + 1
    };

    const result = await booksCollection.insertOne(newBook);
    console.log(`New book inserted with ID: ${result.insertedId}`);

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
  } finally {
    await client.close();
  }
};
