import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'
import uploadconfig from './config/upload'

const upload = multer(uploadconfig);
const routes = Router();

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;