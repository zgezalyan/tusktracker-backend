const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const expect = chai.expect;
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzY2ZhM2NhNDBmYjM0NzcwMjkyMDk5In0sImlhdCI6MTY5OTc5MDYwNSwiZXhwIjoxNzAyMzgyNjA1fQ.IVsfYlWDgTlgIJP2KcHawHSR1-0vZZHHxaTQuI_qxJE';

chai.use(chaiHttp);

describe('Tasks API', () => {
  describe('GET /users/current-user', () => {
    it('should get a user ID by its token', (done) => {      
      chai
        .request(app)
        .get(`/users/current-user`)
        .set('x-auth-token', testToken)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal('653cfa3ca40fb34770292099');  
          done();
        });
    }).timeout(10000);
  });

  // Add more test cases for other endpoints (e.g., POST, PUT, DELETE)
});