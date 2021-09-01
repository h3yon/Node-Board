const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const myCache = require("../config/cache");

chai.use(chaiHttp);

// Allow using with https
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("Post", function () {
  it("[200 success] 1번 게시글 상세 조회", (done) => {
    chai
      .request(`https://localhost:4000`)
      .get("/api/posts/1")
      .end((err, res) => {
        expect(res.body.postId).to.equal(1);
        done();
      });
  });
  it("[403 fail] 존재하지 않는 게시글 상세 조회", (done) => {
    chai
      .request(`https://localhost:4000`)
      .get("/api/posts/5")
      .end((err, res) => {
        expect(res.body.code).to.equal(403);
        done();
      });
  });
});
