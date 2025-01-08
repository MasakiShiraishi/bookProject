const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('BookDatabase');
    const usersCollection = database.collection('Users');

    const users = await usersCollection.find().toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(users)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await client.close();
  }
};
