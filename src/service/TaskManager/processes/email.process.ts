import TaskQueue from '../queues/email.queue';
import runDependBot from '../../PackageManagers';
import moment from 'moment';
import { Job } from 'bull';

/**
 * define a task "dependbot" and insert which function invoke for daily mail
 * about repo dependency information
 */

void TaskQueue.process('dependbot', (job: Job) => {
  const { repoAdress, mailList } = job.data;
  runDependBot(String(repoAdress), mailList)
    .then((e) => console.log(e))
    .catch((e) => console.log(e));
});

//create new tasks for daily mail
const addTaskToDependbot = (repoAdress: string, mailList: Array<string> | string) => {
  return TaskQueue.add(
    'dependbot',
    { repoAdress, mailList },
    {
      repeat: {
        cron: `${moment().minute()} ${moment().hour()} * * *`,
      },
    },
  );
};

export default addTaskToDependbot;
