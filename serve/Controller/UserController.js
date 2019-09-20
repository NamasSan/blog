const express = require('express');  
const UserModel = require('../Model/UserModel');
const router = express.Router(); 


router.post('/reg', (req, res)=>{
    console.log(req.body);

    let userModel  = new UserModel(); 
    delete req.body.passwd1;
    req.body.regtimes = new Date();
    userModel.registerUser(req.body, (results)=>{ 
        if(results.insertId){
            res.json({code:1, Msg:'注册成功'});
        }else{
            res.json({code:-1, Msg:'注册失败，请重新操作'});
        }
    });
    router.post('/login', (req, res)=>{
        let userModel  = new UserModel();
        let account = req.body.account;
        let passsword = req.body.passsword;
        // console.log(req.body.passsword);
    console.log(req.body)
        userModel.getUserByUsername(account, (results)=>{
                let ob = {
                    code:1,
                    Msg:'登录成功'
                };
                if(results.length == 0){
                    ob = {
                        code:-1,
                        Msg:'用户不存在'
                    };
                }else if(results[0].passsword != passsword){
                    ob = {
                        code:0,
                        Msg:'密码错误'
                    };
                }
                else{
                    // 登录成功  记录session
                    req.session.account = account;
                    req.session.uid = results[0].uid;
                    // req.session.avatar = 'http://localhost:81/uploads/1567164421519_566606.jpg';
                }
                res.json(ob);
        });
});
});
module.exports = router;