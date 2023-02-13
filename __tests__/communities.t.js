
const mongoDb = require('../db/connect');
const express = require('express');
const request = require('supertest');
const router = require('../routes')

describe('insert', () => {

  let app;
  let db;

  app = new express();
  app.use('/', router);
  beforeAll(() => {

    return new Promise((resolve, reject) => {
      mongoDb.initDb((err, connection) => {
        if (err) {
          return reject(err);
        }
        db = connection;
        mongoDb.setDb(db);
        resolve();
      });
    });
  });


  afterAll(async () => {
    if (db) {
      await mongoDb.closeDb();
    }
  });

  test('responds to /:id', async () => {
    const res = await request(app).get('/communities/63dbade913752b392318c7fd');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      "_id": "63dbade913752b392318c7fd",
      "communityName": "the best of asian culture",
      "topic": "asian food",
      "usersSubscribed": 15,
      "recipes": [
        "Kung Pao Meatballs",
        "Copycat Panda Express Chow Mein",
        "Tteokbokki: Spicy Korean Rice Cakes",
        "Tempura",
        "Easy Pad Thai"
      ]
      });
  });


  test('responds to topic/:topic', async () => {
    const res = await request(app).get('/communities/topic/drink');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      "_id": "63dbade913752b392318c7fe",
      "communityName": "drinks at all times",
      "topic": "drink",
      "usersSubscribed": 56,
      "recipes": [
        "Carioca",
        "Choco Cayenne",
        "Coco Chanel",
        "Cranberry Kiss",
        "Forest Bull"
      ]
      });
  });
  
  // test('responds to POST /communities', async () => {
  //   const mockCommunity = {
  //     communityName: 'all kinds of burgers',
  //     topic: 'fast food',
  //     usersSubscribed: 65,
  //     recipes: [
  //       'Bacon-and-Kimchi Burgers',
  //       'Ginger-Sesame Pork Burgers with Slaw',
  //       'Cheddar-and-Onion Smashed Burgers'
  //     ]
  //   };
  //   const res = await request(app).post('/communities').set('Content-Type', 'application/json').send(mockCommunity);
  //   expect(res.statusCode).toBe(201);
  //   expect(res.body).toHaveProperty('_id');
  // });

});