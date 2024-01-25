import {Request, Response, NextFunction} from 'express';
import {
  deleteTag,
  fetchAllTags,
  fetchMediaByTag,
  fetchTagsByMediaId,
  postTag,
} from '../models/tagModel';
import CustomError from '../../classes/CustomError';
import {MessageResponse} from '@sharedTypes/MessageTypes';
import {TagResult} from '@sharedTypes/DBTypes';

// list of tags
const tagListGet = async (
  req: Request,
  res: Response<TagResult[]>,
  next: NextFunction
) => {
  try {
    const tags = await fetchAllTags();
    if (tags === null) {
      const error = new CustomError('No tags found', 404);
      next(error);
      return;
    }
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// list of media items by tag
const tagMediaGet = async (
  req: Request<{tag: string}>,
  res: Response<TagResult[]>,
  next: NextFunction
) => {
  try {
    const media = await fetchMediaByTag(req.params.tag);
    if (media === null) {
      const error = new CustomError('No media found', 404);
      next(error);
      return;
    }
    res.json(media);
  } catch (error) {
    next(error);
  }
};

// list of tags by media item id
const mediaTagsGet = async (
  req: Request<{id: string}>,
  res: Response<TagResult[]>,
  next: NextFunction
) => {
  try {
    const tags = await fetchTagsByMediaId(Number(req.params.id));
    if (tags === null) {
      const error = new CustomError('No tags found', 404);
      next(error);
      return;
    }
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// Post a new tag
const tagPost = async (
  req: Request<{}, {}, Omit<TagResult, 'tag_id'>>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const newTag = await postTag(req.body);
    if (newTag === null) {
      const error = new CustomError('Tag not created', 500);
      next(error);
      return;
    }
    res.json(newTag);
  } catch (error) {
    next(error);
  }
};

// Delete a tag
const tagDelete = async (
  req: Request<{id: string}>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const tag = await deleteTag(Number(req.params.id));
    if (tag === null) {
      const error = new CustomError('Tag not found', 404);
      next(error);
      return;
    }
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

export {tagListGet, tagMediaGet, mediaTagsGet, tagPost, tagDelete};
