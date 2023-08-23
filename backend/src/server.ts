import express, { Request, Response } from 'express'

import cors from 'cors'
import axios from 'axios';

const app = express()

app.use(express.json());
app.use(cors())

app.get('/asteroids', async (request: Request, response: Response) => {
  const { startDate, endDate } = request.query

  try {
    const responseNeo = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=v0lEbK9LYsslpR6QUf4wYzoJOrMSVd9IcNKQ45X8`);

    return response.json(responseNeo.data)
  } catch (err: any) {
    return response.status(500).json({ message: 'Error fetching asteroids', error: err.message })
  }
})

app.listen(4000, () => console.log('Server is running on port 4000'))