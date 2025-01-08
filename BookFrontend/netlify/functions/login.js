const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const generateToken = (username) => {
  const secretKey = process.env.JWT_KEY;
  const issuer = process.env.JWT_ISSUER;
  const audience = process.env.JWT_AUDIENCE;

  const token = jwt.sign({ username }, secretKey, {
    expiresIn: '15m',
    issuer: issuer,
    audience: audience,
  });

  return token;
};

exports.handler = async function(event, context) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    const { username, password } = JSON.parse(event.body);

    await client.connect();
    const database = client.db('BookDatabase');
    const usersCollection = database.collection('Users');

    const user = await usersCollection.findOne({ username: username, password: password });

    if (user) {
      const token = generateToken(username);
      console.log("Token generated:", token);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ message: 'Login successful', token })
      };
    } else {
      console.log("Invalid username or password");
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({ error: 'Invalid username or password' })
      };
    }
  } catch (error) {
    console.error("Error:", error);
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
