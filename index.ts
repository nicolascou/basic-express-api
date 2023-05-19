import express from "express";
import axios, { AxiosError } from 'axios';

const app = express();

app.get('/', async(req, res) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  const { data } = response;
  
  res.json(data);
});

app.get('/:userId', async(req, res) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.userId}`);
    const { data } = response;
    res.json(data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404);
      res.send('User not found');
    } else {
      res.sendStatus(error.response?.status);
    }
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));