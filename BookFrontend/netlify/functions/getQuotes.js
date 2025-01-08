const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('BookDatabase');
    const quotationsCollection = database.collection('Quotations');

    const quotes = await quotationsCollection.find().toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(quotes)
    };
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
