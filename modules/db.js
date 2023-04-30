const mysql = require('mysql')
const con = mysql.createConnection({
    host: '5.189.153.72',
    user: 'jack',
    password: '123456',
    database: 'beer',
    
    // host : 'localhost',
    // user: 'root',
    // password: '123456',
    // database:'Econox',
    // port: 3307
})
con.connect()

function fetch(query, params){
    return new Promise((resolve, reject) =>{
        try{
            con.query(query, params, function(err, result) {
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
        }
        catch(e){
            reject(e)
        }
    })
}
function update(query, params){
    return new Promise((resolve, reject) =>{
        try{
            con.query(query, params, function(err, result) {
                if(err){
                    return reject(err)
                }
                return resolve('Update success')
            })
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports = {fetch, update}