const request = require('supertest');
const app = require('../server');
const Category = require('../models/category');

describe('Category Routes', () => {
    beforeEach(async () => {
        await Category.deleteMany({});
    });

    afterAll(async () => {
        await Category.deleteMany({});
    });

    it('should create a new category', async () => {
        const newCategory = { name: 'Electronics', description: 'Gadgets and devices' };

        const res = await request(app)
            .post('/category')
            .send(newCategory);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'Electronics');
        expect(res.body).toHaveProperty('description', 'Gadgets and devices');
    });

    it('should fetch all categories', async () => {
        const categories = [
            { name: 'Electronics', description: 'Gadgets and devices' },
            { name: 'Books', description: 'Various genres of books' }
        ];

        await Category.insertMany(categories);

        const res = await request(app)
            .get('/all');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(2);
    });
});
