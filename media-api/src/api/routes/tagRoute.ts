import express from 'express';
import {
  tagListGet,
  tagMediaGet,
  mediaTagsGet,
  tagPost,
  tagDelete,
} from '../controllers/tagController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.route('/').get(tagListGet).post(authenticate, tagPost);

router.route('/:id').get(tagMediaGet).delete(authenticate, tagDelete);

router.route('/media/:id').get(mediaTagsGet);

export default router;
