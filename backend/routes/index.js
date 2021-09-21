
import express from 'express'
import Score from '../Controller/index'

const routes = express.Router();
routes.post('/results', Score.save)
routes.get('/results',Score.all)

export default routes