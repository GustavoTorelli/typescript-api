import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const port: number = 3001;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send('Hello World!')
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})