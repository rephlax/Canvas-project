const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async (event) => {
  const card = JSON.parse(event.body);
  let client;

  try {
    client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const collection = client.db('canvasDB').collection('cards');
    await collection.insertOne(card);

    return {
      statusCode: 201,
      body: JSON.stringify(card),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
};