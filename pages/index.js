import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//      { id: 'm1', title: 'A First MeetUp', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Frankfurter_Altstadt_mit_Skyline_2019_%28100MP%29.jpg/1024px-Frankfurter_Altstadt_mit_Skyline_2019_%28100MP%29.jpg',
//      address:'Some Address 64-G Lane',
//      decription:'This is  First MeetUp'
// }
//      ,{ id: 'm1', title: 'A Second MeetUp', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Boston_-_Old_State_House_%2848718568688%29.jpg/800px-Boston_-_Old_State_House_%2848718568688%29.jpg',
//      decription:'This is  Second MeetUp'
// }
// ]
const index = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  )
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb://sayantan_mongo:tqWaDC1wWs3fGvbb@ac-d2aalyt-shard-00-00.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-01.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-02.wvvgihy.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-7bpmjs-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default index
