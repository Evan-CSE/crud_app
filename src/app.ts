import express, { Application } from 'express';
import routeV1 from './Routes/api/apiRoutes';

const app: Application = express();

app.use(express.json());
app.use('/', (req, res) => {
    return 'main';
})
app.use('/api', routeV1);

export default app;