const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

exports.handler = async () => {
  let client;

  try {
    client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const collection = client.db('canvasDB').collection('cards');
    const cards = await collection.find().toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(cards),
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