const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const myCache = require("../config/cache");

chai.use(chaiHttp);

// Allow using with https
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * CUD 부분 주석처리
 */

// describe("Auth", () => {
//   it("[401 error] pw - 6글자 최소 하나의 문자, 숫자, 특수문자의 조합", (done) => {
//     chai
//       .request(`https://localhost:4000`)
//       .post("/api/users/signup")
//       .send({ email: "aaa@naver.com", password: "aaaaa1" })
//       .end((err, res) => {
//         expect(res.body.code).to.equal(401);
//         done();
//       });
//   });
//   it("[401 error] 올바르지 않은 email 형식", (done) => {
//     chai
//       .request(`https://localhost:4000`)
//       .post("/api/users/signup")
//       .send({ email: "aaa", password: "aaaaa1!" })
//       .end((err, res) => {
//         expect(res.body.code).to.equal(401);
//         done();
//       });
//   });
//   it("[200 success] 올바른 회원가입", (done) => {
//     chai
//       .request(`https://localhost:4000`)
//       .post("/api/users/signup")
//       .send({ email: "aaa@naver.com", password: "aaaaa1!" })
//       .end((err, res) => {
//         expect(res.body.code).to.equal(200);
//         console.log("jwt 토큰: ", res.body.result);
//         done();
//       });
//   });
// });

describe("Post", function () {
  // it("[200 success] 토큰으로 글 쓰기", (done) => {
  //   chai
  //     .request(`https://localhost:4000`)
  //     .post("/api/posts")
  //     .set(
  //       "x-access-token",
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzMDQ2Njg2MywiZXhwIjoxNjMwNzI2MDYzLCJzdWIiOiJ1c2VySW5mbyJ9.BohuUuw61CpavHGnaoyXImWoJz5QXjQNCtYM1MZYkt4"
  //     )
  //     .send({ title: "ttest", content: "ttest" })
  //     .end((err, res) => {
  //       expect(res.body.code).to.equal(200);
  //       done();
  //     });
  // });
  it("[200 success] 1페이지 글 조회(10개)", (done) => {
    chai
      .request(`https://localhost:4000`)
      .get("/api/posts?page=1")
      .end((err, res) => {
        expect(res.body.code).to.equal(200);
        done();
      });
  });
  it("[200 success] 2페이지 글 조회(10개) - 없음", (done) => {
    chai
      .request(`https://localhost:4000`)
      .get("/api/posts?page=2")
      .end((err, res) => {
        expect(res.body.result).to.have.length(0);
        done();
      });
  });
  it("[200 success] 게시글 검색(제목, ttest)", (done) => {
    chai
      .request(`https://localhost:4000`)
      .get("/api/posts?page=1&option=1&keyword=ttest")
      .end((err, res) => {
        console.log(res.body.result);
        expect(res.body.code).to.equal(200);
        done();
      });
  });
  it("[200 success] 2번 게시글 상세 조회", (done) => {
    chai
      .request(`https://localhost:4000`)
      .get("/api/posts/2")
      .end((err, res) => {
        // console.log(res.body.result.postId);
        expect(res.body.code).to.equal(200);
        done();
      });
  });
  it("[300 error] 2번 게시글 수정(토큰을 입력하지 않았을 때)", (done) => {
    chai
      .request(`https://localhost:4000`)
      .patch("/api/posts/2/edit")
      .send({ title: "changed2" })
      .end((err, res) => {
        expect(res.body.code).to.equal(300);
        done();
      });
  });
  it("[200 success] 2번 게시글 수정(토큰 입력)", (done) => {
    chai
      .request(`https://localhost:4000`)
      .patch("/api/posts/2/edit")
      .set(
        "x-access-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzMDQ2ODk4NywiZXhwIjoxNjMwNzI4MTg3LCJzdWIiOiJ1c2VySW5mbyJ9.y-nboeNHu36k35dMiK-73FVIyBwMuZq4xEzajUFWHPU"
      )
      .send({ title: "change2" })
      .end((err, res) => {
        expect(res.body.code).to.equal(200);
        done();
      });
  });
  it("[403 fail] 없는 게시글 comment 작성", (done) => {
    chai
      .request(`https://localhost:4000`)
      .post("/api/posts/100/comments")
      .set(
        "x-access-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYzMDQ2ODk4NywiZXhwIjoxNjMwNzI4MTg3LCJzdWIiOiJ1c2VySW5mbyJ9.y-nboeNHu36k35dMiK-73FVIyBwMuZq4xEzajUFWHPU"
      )
      .send({ content: "not exist?" })
      .end((err, res) => {
        expect(res.body.code).to.equal(403);
        done();
      });
  });
  it("[200 success] comment 조회", (done) => {
    chai
      .request(`https://localhost:4000`)
      .get("/api/posts/1/comments")
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.code).to.equal(200);
        done();
      });
  });
});
