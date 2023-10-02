const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'storedb'
})

db.connect((err) => {
    if (err) {
        console.log('Lỗi kết nối đến CSDL: ' + err)
        return
    } else {
        console.log('Kết nối thành công đến CSDL')
    }
});

// const mysql = require('mysql2/promise');

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'storedb'
// });

module.exports = db


