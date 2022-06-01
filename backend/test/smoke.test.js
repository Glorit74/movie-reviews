
const app = require('../app.js');
const mockserver = require('supertest');



function sum(a, b) {
    return a + b;
  }

test('adds 1 + 2 to equal 3', () => {
    //given
    // no setup required
    //when
    const result = sum(1,2);
    //then

    expect(sum(1, 2)).toBe(3);
});
test('/akármi 404-et ad vissza', async () => {
    //given
    const server = mockserver(app);

    //when
    const response = await server.get('/api/random')
    //than
    
    expect(response.status).toBe(404);
});