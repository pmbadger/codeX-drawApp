const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("download", function() {
  it("should return file on /download GET", function(done) {
    chai
      .request("http://localhost:3001")
      .get("/download")
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
});

describe("createCanvas", function() {
  it("should return new canvas array 7x7 on /createCanvas POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/createCanvas")
      .send({ widthCanvas: "5", heightCanvas: "5" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(7);
        res.body[0].length.should.equal(7);
        done();
      });
  });

  it("should return new canvas array 22x44 on /createCanvas POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/createCanvas")
      .send({ widthCanvas: "20", heightCanvas: "42" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(44);
        res.body[0].length.should.equal(22);
        done();
      });
  });

  it("should return error (Bad input) on /createCanvas POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/createCanvas")
      .send({ widthCanvas: "0", heightCanvas: "0" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });
});

describe("command C", function() {
  it("should return new canvas array 12x17 on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "C 15\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(12);
        res.body[0].length.should.equal(17);
        done();
      });
  });

  it("should return new canvas array 12x12 on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "C\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(12);
        res.body[0].length.should.equal(12);
        done();
      });
  });

  it("should return error (Bad input) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "C -1 2\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });
});

describe("command L", function() {
  it("should draw line (1,1)->(5,1) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "L 1 1 5 1\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(12);
        res.body[0].length.should.equal(12);
        res.body[1][1].should.equal("x");
        res.body[1][2].should.equal("x");
        res.body[1][3].should.equal("x");
        res.body[1][4].should.equal("x");
        res.body[1][5].should.equal("x");
        done();
      });
  });

  it("should draw line (7,2)->(5,2) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "L 2 7 2 5\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(12);
        res.body[0].length.should.equal(12);
        res.body[5][2].should.equal("x");
        res.body[6][2].should.equal("x");
        res.body[7][2].should.equal("x");
        done();
      });
  });

  it("should return error (Line is diagonal) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "L 1 1 2 4\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });

  it("should return error (Bad input) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "L 1 1 2\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });

  it("should return error (Bad input) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "L 1 5 0 5\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });

  it("should return error (Bad input) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "L 1 5 0 a\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });
});

describe("command R", function() {
  it("should draw rectangle (6,5)->(8,7) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "R 6 5 8 7\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(12);
        res.body[0].length.should.equal(12);
        res.body[5][6].should.equal("x");
        res.body[6][6].should.equal("x");
        res.body[7][6].should.equal("x");
        res.body[5][8].should.equal("x");
        res.body[6][8].should.equal("x");
        res.body[7][8].should.equal("x");
        res.body[5][6].should.equal("x");
        res.body[5][7].should.equal("x");
        res.body[5][8].should.equal("x");
        res.body[7][6].should.equal("x");
        res.body[7][7].should.equal("x");
        res.body[7][8].should.equal("x");
        done();
      });
  });

  it("should return error (Bad input) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "R 1 5 2 0\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });

  it("should return error (Bad input) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "R 1 5 2\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });

  it("should return error (Bad input) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "R 1 5 -2 5\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });
});

describe("command B", function() {
  it("should make fill (8, 3, c) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "B 8 3 c\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(12);
        res.body[0].length.should.equal(12);
        res.body[5][2].should.equal("x");
        res.body[6][2].should.equal("x");
        res.body[7][2].should.equal("x");
        res.body[4][4].should.equal("c");
        res.body[9][8].should.equal("c");
        res.body[7][4].should.equal("c");
        done();
      });
  });

  it("should make fill (8, 1, k) on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "B 8 1 kct\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.have.json;
        res.body.should.be.instanceof(Array);
        res.body.length.should.equal(12);
        res.body[0].length.should.equal(12);
        res.body[5][2].should.equal("x");
        res.body[6][2].should.equal("x");
        res.body[7][2].should.equal("x");
        res.body[4][4].should.equal("k");
        res.body[9][8].should.equal("k");
        res.body[7][4].should.equal("k");
        done();
      });
  });

  it("should return error (bad input)  on /command POST", function(done) {
    chai
      .request("http://localhost:3001")
      .post("/command")
      .send({ line: "B 8 1\n" })
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(500);
        done();
      });
  });
});
