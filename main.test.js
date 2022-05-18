const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
	 it('should return hello world', async () => {
	 	return request.get('/hello')
	 		.expect(200)
	 		.expect('Content-Type', /text/)
	 		.then(res => {
	 			expect(res.text).toBe('Hello BENR2423');
	 		});
	 })

     it('register', async () => {
		return request
        .post('/register')
        .send({username: 'user1', password: "user1pass" })
        .expect('Content-Type', /json/)
        .expect(200).then(res => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    message: expect.any(String),
                })
            );
        });
	});

    it('register failed', async () => {
		return request
		.post('/register')
		.send({username: 'user1', password: "user1pass" })
		.expect('Content-Type', /json/)
		.expect(401).then(res => {
			expect(res.body).toEqual(
				expect.objectContaining({
                    message: expect.any(String),
				})
			);
		});
	})

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({username: 'user1', password: "user1pass" })
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual(
					expect.objectContaining({
						message: expect.any(String),
					})
				);
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({username: 'user1', password: "123456ABBA" })
			.expect('Content-Type', /json/)
			.expect(401).then(res => {
				expect(res.body).toEqual(
					expect.objectContaining({
                        message: expect.any(String),
					})
				);
			});
	});
});