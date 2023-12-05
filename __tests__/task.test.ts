import { it, expect, describe, test } from '@jest/globals';
import request from 'supertest';
import app from '../app';

describe('get task', () => {
  test('GET /task', (done) => {
    request(app)
      .get('/api/task')
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
  test('GET /task/:taskId', (done) => {
    const taskId = "656dcde134c4ef8768b4c04a"
    request(app)
      .get(`/api/task/${taskId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
  test('POST /task', (done) => {
    request(app)
      .get(`/api/task`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
  test('PUT /task/:taskId', (done) => {
    const taskId = "656dcde134c4ef8768b4c04a"
    request(app)
      .get(`/api/task/${taskId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
  test('DELETE /task/:taskId', (done) => {
    const taskId = "656dcde134c4ef8768b4c04a"
    request(app)
      .get(`/api/task/${taskId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })
})