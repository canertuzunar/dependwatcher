import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dependbotController from './controllers/dependbot.controller';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//daily mail about repo dependency
app.use('/subscribe/dependbot', dependbotController.subscribeDependBot);
// send mail about repo dependency
app.use('/dependbot', dependbotController.dependbot);

export default app;
