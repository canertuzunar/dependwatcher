import Queue from 'bull';

//queue for daily mail task
const TaskQueue = new Queue('TaskQueue', {
  redis: {
    host: process.env.REDIS_URL,
    port: Number(process.env.REDIS_URL_PORT),
  },
});

//if queue throw any error this listenet print log
TaskQueue.on('error', (err) => {
  console.log(err);
});
export default TaskQueue;
