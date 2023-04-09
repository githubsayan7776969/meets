import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb://sayantan_mongo:tqWaDC1wWs3fGvbb@ac-d2aalyt-shard-00-00.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-01.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-02.wvvgihy.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-7bpmjs-shard-0&authSource=admin&retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
