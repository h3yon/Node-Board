exports.insertUser = `INSERT INTO User(email, password) VALUES(?, ?);`;
exports.selectUser = `SELECT id FROM User where email = ?;`;
exports.loginUser = `SELECT id FROM User where email = ? and password = ?;`;
