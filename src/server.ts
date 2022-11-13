import app from './app';

const EXPRESS_PORT = process.env.EXPRESS_PORT || 6000;

//start app on port=EXPRESS_PORT
app.listen(EXPRESS_PORT, () => {
  console.log(`server is running on ${EXPRESS_PORT}`);
});
