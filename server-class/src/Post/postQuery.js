exports.selectPost = `
        SELECT postId, title, email, content, DATE_FORMAT(Post.createdAt, '%Y-%m-%d %H:%i:%s') as createdAt,
            DATE_FORMAT(Post.updatedAt, '%Y-%m-%d %H:%i:%s') as updatedAt, userId
        FROM Post
        INNER JOIN User on Post.userId = User.id
        WHERE status = 1
        `;
exports.insertPost = `
        INSERT INTO Post(title, userId, content) VALUES (?, ?, ?);`;
exports.deletePost = `
        UPDATE Post SET status = 0 WHERE postId = ? and userId = ?;`;
exports.patchPost = `
        UPDATE Post SET `; //title = ?, content = ? WHERE postId = ? and userId = ? and status = 1;
exports.isExistPost = `
        SELECT userId FROM Post where postId = ? and status = 1 limit 1`;

exports.insertComment = `
        INSERT Comment(content, userId, postId, commentId, seq)
        VALUES (?, ?, ?, `; // ?, ?);
exports.selectComments = `
        SELECT
            Comment.id, email, content, commentId, seq, DATE_FORMAT(Comment.createdAt, '%Y-%m-%d %H:%i:%s') as createdAt,
            DATE_FORMAT(Comment.updatedAt, '%Y-%m-%d %H:%i:%s') as updatedAt
        FROM Comment
            INNER JOIN User on Comment.userId = User.id
        WHERE postId = ? and status = 1
        ORDER BY CASE WHEN commentId = 0 THEN Comment.id ELSE commentId END, seq;
        `;
