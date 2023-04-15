import { connect } from 'mongoose';
import { remoteUrl } from './dbconfig';

const databaseUrl = (process.env.DATABASE_URL as string) || remoteUrl;
console.log(databaseUrl);

// Connection to database
connect('mongodb://chefier:chefierapi@172.16.27.2:27017/chefier?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connection to MongoDB server established');
  })
  .catch((err) => {
    console.log(err);
  });
