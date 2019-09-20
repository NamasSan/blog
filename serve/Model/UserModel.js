const DbBase  = require('./DbBase');
class UserModel extends DbBase{
    constructor(){
        super();
        this.table = 'user'; 
    }
    registerUser(userinfo, callback){
        let fieldstr ='';
        let field = '';
        let data = [];
        let isFirst = true;
        for (const f in userinfo) {
            if (userinfo.hasOwnProperty(f)) {
                fieldstr += (isFirst ? '':', ') + f;  
                field += (isFirst ? '':', ') + '?';       
                data.push(userinfo[f]);                 
            }
            isFirst = false;
        }
        let sql = `INSERT INTO ${this.table}(${fieldstr}) VALUES (${field}) `; 
        this.mydb.query(sql, data, (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                callback(results);
            }
            this.mydb.end();  
        });
    }

    getUserByUsername(account, callback){
        let sql = `SELECT * FROM ${this.table} WHERE account = ? LIMIt 1`;
        this.mydb.query(sql, [account], (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                callback(results);
            }
            this.mydb.end();
        });
    }

}

module.exports = UserModel;