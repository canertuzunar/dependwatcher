import { Response, Request } from 'express';
import runDependBot from '../service/PackageManagers';
import addTaskToDependbot from '../service/TaskManager/processes/email.process';

const subscribeDependBot = (req: Request, res: Response) => {
  const { repoAdress, mailList } = req.body;
  addTaskToDependbot(repoAdress, mailList)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

const dependbot = (req: Request, res: Response) => {
  const { repoAdress, mailList } = req.body;
  runDependBot(repoAdress, mailList)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export { subscribeDependBot, dependbot };
