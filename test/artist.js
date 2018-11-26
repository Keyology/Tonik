const chai = require('chai');
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../server")
const Artist = require('../app/models/artist')

chai.use(chaiHttp);

const fakeUser = {
    email: 'Johnadams123@gmail.com',
    password: '1234567',
    artist_name: 'John & the crew',
    description: 'local EDM group based out of brooklyn NY ',
    location: "New York",
    age: 20

}

describe("testing artist signup route", () => {
    it("should create a new user account", done => {
        Artist.findOneAndRemove(fakeUser, () => {
            Artist.find((err, artists) => {

                chai
                    .request(app)
                    .post('/signup')
                    .send(fakeUser)
                    .then(res => {
                        Artist.find((err, artists) => {
                            res.should.have.status(200);
                            return done
                        });
                    }).catch(err => {
                        return done(err)
                    });
            });
        });

    });

});