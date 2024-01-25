/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import Category from '../src/interfaces/Category';
import MessageResponse from '../src/types/MessageResponse';

// functios to test succesful cateory routes
const getApiRoot = (url: string | Function): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1')
      .expect(200, {message: 'animals api v1'}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

const getCategories = (url: string | Function): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/category')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const categories: Category[] = response.body;
          categories.forEach((category) => {
            expect(category.category_id).toBeGreaterThan(0);
            expect(category.category_name).not.toBe('');
          });
          resolve(categories);
        }
      });
  });
};

const getCategory = (url: string | Function, id: number): Promise<Category> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/category/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const category: Category = response.body;
          expect(category.category_id).toBeGreaterThan(0);
          expect(category.category_name).not.toBe('');
          resolve(category);
        }
      });
  });
};

const postCategory = (
  url: string | Function,
  category_name: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/category')
      .send({category_name})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const putCategory = (
  url: string | Function,
  id: number,
  category_name: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/category/${id}`)
      .send({category_name})
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteCategory = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/category/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

// functions to test not found 404 for category routes
const getNotFoundCategory = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/category/${id}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const putNotFoundCategory = (
  url: string | Function,
  id: number,
  category_name: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/category/${id}`)
      .send({category_name})
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteNotFoundCategory = (
  url: string | Function,
  id: number
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/category/${id}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

// functions to test invalid data 400 for category routes
const postInvalidCategory = (
  url: string | Function,
  category_name: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/category')
      .send({category_name})
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const putInvalidCategory = (
  url: string | Function,
  id: string,
  category_name: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(`/api/v1/category/${id}`)
      .send({category_name})
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const deleteInvalidCategory = (
  url: string | Function,
  id: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/category/${id}`)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

const getInvalidCategory = (
  url: string | Function,
  id: string
): Promise<MessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/category/${id}`)
      .expect(400, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: MessageResponse = response.body;
          expect(message.message).not.toBe('');
          resolve(message);
        }
      });
  });
};

export {
  getApiRoot,
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
  getNotFoundCategory,
  putNotFoundCategory,
  deleteNotFoundCategory,
  postInvalidCategory,
  putInvalidCategory,
  deleteInvalidCategory,
  getInvalidCategory,
};
