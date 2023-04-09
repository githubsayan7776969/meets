import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb://sayantan_mongo:tqWaDC1wWs3fGvbb@ac-d2aalyt-shard-00-00.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-01.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-02.wvvgihy.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-7bpmjs-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb://sayantan_mongo:tqWaDC1wWs3fGvbb@ac-d2aalyt-shard-00-00.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-01.wvvgihy.mongodb.net:27017,ac-d2aalyt-shard-00-02.wvvgihy.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-7bpmjs-shard-0&authSource=admin&retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  })


  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
