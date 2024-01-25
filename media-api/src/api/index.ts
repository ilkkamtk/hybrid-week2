import express, {Request, Response} from 'express';

import mediaRoute from './routes/mediaRoute';
import tagRoute from './routes/tagRoute';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'media api v1',
  });
});

router.use('/media', mediaRoute);
router.use('/tags', tagRoute);

export default router;
