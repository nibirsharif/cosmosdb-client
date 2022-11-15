const chai = require('chai')
    , expect = require('chai').expect
    , chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require("../app");

describe("base route", () => {
    describe("GET /", () => {
        it("should get response code 200 when call the base endpoint", (done) => {
            chai
                .request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});

let accessToken;
let refreshToken;

describe("routes", () => {
    const user = { 'username': 'test', 'password': 'test' };
    before(done => {
        setTimeout(() => {
            chai
                .request(app)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.property('secret')
                    accessToken = res.body.secret.accessToken;
                    refreshToken = res.body.secret.refreshToken;
                    done();
                });
        }, 1000);
    })

    describe("POST /", () => {
        it("should get response code 200 when call the token endpoint", (done) => {
            chai
                .request(app)
                .post('/token')
                .send({
                    "token": refreshToken
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.property('secret')
                    accessToken = res.body.secret.accessToken;
                    done();
                });
        });
    });
});
