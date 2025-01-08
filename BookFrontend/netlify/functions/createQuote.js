const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  const client = new MongoClient(uri);

  try {
    const requestBody = JSON.parse(event.body);
    await client.connect();
    const database = client.db('BookDatabase');
    const quotationsCollection = database.collection('Quotations');

    const newQuote = {
      ...requestBody,
      id: await quotationsCollection.countDocuments() + 1
    };

    const result = await quotationsCollection.insertOne(newQuote);
    console.log(`New quotation inserted with ID: ${result.insertedId}`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(newQuote)
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
