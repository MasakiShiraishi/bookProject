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
  try {
    console.log("Event body:", event.body);
    console.log("Data file path:", dataFilePath);
    const { username, password } = JSON.parse(event.body);

    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    console.log("Data loaded:", data);
    const user = data.Users.find(user => user.username === username && user.password === password);

    if (user) {
      const token = generateToken(user.username);
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
  }
};

