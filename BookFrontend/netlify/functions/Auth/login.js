const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const dataFilePath = path.join(__dirname, 'data.json');

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
  const { username, password } = JSON.parse(event.body);

  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const user = data.Users.find(user => user.username === username && user.password === password);

    if (user) {
      const token = generateToken(user.username);
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
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
