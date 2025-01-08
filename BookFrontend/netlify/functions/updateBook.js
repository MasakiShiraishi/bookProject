const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async function(event, context) {
  const client = new MongoClient(uri);

  try {
    const requestBody = JSON.parse(event.body);
    console.log('Request Body:', requestBody);

    await client.connect();
    const database = client.db('BookDatabase');
    const booksCollection = database.collection('Books');

    // `_id` フィールドを除外した更新データを作成
    const updateData = { ...requestBody };
    delete updateData._id;

    const result = await booksCollection.updateOne({ id: requestBody.id }, { $set: updateData });
    if (result.matchedCount === 1) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'PUT'
        },
        body: JSON.stringify({ message: 'Book updated successfully' })
      };
    } else {
      console.log('Book Not Found for ID:', requestBody.id);
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'PUT'
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
        'Access-Control-Allow-Methods': 'PUT'
      },
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await client.close();
  }
};
