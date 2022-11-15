const chai = require('chai')
    , expect = require('chai').expect;

const applicationUser = require("../db/userContext");

describe("db", () => {
    const username = "test";

    const querySpec = {
        query: `SELECT * 
                FROM root r
                WHERE r.username = @username`,
        parameters: [
            {
                name: "@username",
                value: username,
            },
        ],
    };

    describe("user context", () => {
        it("returns requested item", (done) => {
            setTimeout(async () => {
                await applicationUser
                    .find(querySpec)
                    .then((value) => {
                        expect(value).not.to.be.empty;
                        done();
                    });
            }, 1000);
        });
    });
});
