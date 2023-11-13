const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const expect = chai.expect;
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzY2ZhM2NhNDBmYjM0NzcwMjkyMDk5In0sImlhdCI6MTY5OTc5MDYwNSwiZXhwIjoxNzAyMzgyNjA1fQ.IVsfYlWDgTlgIJP2KcHawHSR1-0vZZHHxaTQuI_qxJE';

chai.use(chaiHttp);

describe('Tasks API', () => {
    describe('GET /api/tasks/:taskId', () => {
        it('correct task id - should get a single task by ID', (done) => {
            const taskId = '653cfaf1a40fb3477029209e';
            chai
              .request(app)
              .get(`/api/tasks/${taskId}`)
              .set('x-auth-token', testToken)
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('object');
                  expect(res.body.title).to.equal('Test task 1');
                  expect(res.body.user).to.equal('653cfa3ca40fb34770292099');
                  expect(res.body._id).to.equal('653cfaf1a40fb3477029209e');
                  done();
              });
        }).timeout(10000);

        it('incorrect task id - should get an incorrect id error', (done) => {
            const taskId = '653cfaf1a40fb3477029209ezzz';
            chai
              .request(app)
              .get(`/api/tasks/${taskId}`)
              .set('x-auth-token', testToken)
              .end((err, res) => {
                  expect(res).to.have.status(404);
                  expect(res.body).to.be.an('object');
                  expect(res.body.error).to.equal('Invalid task id');          
                  done();
              });
        }).timeout(10000);
    });

    describe('GET /api/tasks/:taskId/children', () => {
        it('correct task id - should get all task children by ID', (done) => {
            const taskId = '653cfaf1a40fb3477029209e';
            chai
              .request(app)
              .get(`/api/tasks/${taskId}/children`)
              .set('x-auth-token', testToken)
              .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('array');          
                  done();
              });
        }).timeout(10000);

        it('incorrect task id - should get an incorrect id error', (done) => {
            const taskId = '653cfaf1a40fb3477029209ezzz';
            chai
              .request(app)
              .get(`/api/tasks/${taskId}/children`)
              .set('x-auth-token', testToken)
              .end((err, res) => {
                  expect(res).to.have.status(404);
                  expect(res.body).to.be.an('object');
                  expect(res.body.error).to.equal('Invalid task id');          
                  done();
              });
        }).timeout(10000);
    });
});