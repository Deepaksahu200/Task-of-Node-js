const mysql = require("mysql");
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"mysql",
    port:3306
});

con.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("conneted to mysql");
});

module.exports.con=con;