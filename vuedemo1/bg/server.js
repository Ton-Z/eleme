const express = require("express")
const app = express()
const fs = require("fs")
const qs = require("querystring")
app.listen("3000", function () {
    console.log("welcome")
})
app.all('*', function (req, res, next) {             //设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//注册
app.post("/register", function (req, res) {
    let str = ''
    req.on("data", function (data) {
        str += data
    })
    req.on("end", function () {
        fs.readFile("./user.json", "utf-8", function (err, data) {
            data = JSON.parse(data)
            str = qs.parse(str)
            if (data.length == 0) {
                str.id = 0
            } else {
                str.id = data.length
            }
            let usernameArr = []
            for (let i in data) {
                usernameArr.push(data[i].username)
            }
            if (usernameArr.indexOf(str.username) == -1) {
                data.push(str)
            } else {
                res.send("您已经注册过了")
            }
            fs.writeFile("./user.json", JSON.stringify(data), function (err) {
                res.send("注册成功")
            })
        })
    })
})
//退出登录
app.post("/out", function (req, res) {
    let str = ''
    req.on("data", function (data) {
        str += data
    })
    req.on("end", function () {
        fs.readFile("./user.json", "utf-8", function (err, data) {
            data = JSON.parse(data)
            str = qs.parse(str)
            data.splice(str.id, 1)
            fs.writeFile("./user.json", JSON.stringify(data), function (err) {
                console.log("删除用户信息成功")
            })
        })
    })
})
//获取用户信息判断登录
app.get("/getUser", function (req, res) {
    fs.readFile("./user.json", "utf-8", function (err, data) {
        res.send(data)
    })
})
//获取菜单渲染
app.get("/getMenuArr", function (req, res) {
    fs.readFile("./menuarr.json", "utf-8", function (err, data) {
        res.send(data)
    })
})
// 获取轮播图数据。
app.get("/getBannerArr", function (req, res) {
    fs.readFile("./bannerarr.json", "utf-8", function (err, data) {
        res.send(data)
    })
})
// 向前台发送menu传过来的信息
app.get("/getshop1", function (req, res) {
    fs.readFile("./shop1.json", "utf-8", function (err, data) {
        res.send(data)
    })
})
// 首页主体部分店家渲染
app.get("/getShopList", function (req, res) {
    fs.readFile("./shoplistArr.json", "utf-8", function (err, data) {
        res.send(data)
    })
})
//写入 menu传过来的商品信息
app.post("/shop1", function (req, res) {
    var str = '';
    req.on("data", function (data) {
        str += data
    })
    req.on("end", function () {
        let xianzai = qs.parse(str)
        if(xianzai.shop1 != "undefined"){
            fs.writeFile("./shop1.json", xianzai.shop1, function (err, data) {
                res.send("a")
            })
        }
       
    })
})
//用户信息修改
app.post("/change", function (req, res) {
    var str = '';
    req.on("data", function (data) {
        str += data
    })
    req.on("end", function () {
        fs.readFile("./user.json", "utf-8", function (err, data) {
            data = JSON.parse(data)
            str = qs.parse(str)
            let obj = data[str.id]
            obj.passwordsure = obj.password =str.password
            obj.username=str.username
            data.splice(str.id,1)
            data.push(obj)
            // var arr =data
            fs.writeFile("./user.json",JSON.stringify(data),function(){
                console.log("修改成功")              
                res.send(JSON.stringify(data[str.id]))
            })
        })
    })
})
//向购物车中加数据
var shopcar = [];
var shopcarid = [];
app.post("/addshop",function(req,res){
    var str = '';
    req.on("data",function(data){
        str += data
    })
    req.on("end",function(){
        fs.readFile("./menuarr.json","utf-8",function(err,data){
            data = JSON.parse(data)
            str = qs.parse(str)
            if(shopcarid.indexOf(data[0].shop[str.id].name) == -1){
                shopcarid.push(data[0].shop[str.id].name)
                shopcar.push(data[0].shop[str.id])
            }else{
                shopcar[shopcarid.indexOf(data[0].shop[str.id].name)].count++
            }
            res.send(JSON.stringify(shopcar))
        })
    })
})
//订单页挂在完成后渲染
app.get("/sendshopcar",function(req,res){
    // console.log(shopcar)
    res.send(JSON.stringify(shopcar))
})
//加一
app.post("/addcount",function(req,res){
    var str = ""
    req.on("data",function(data){
        str += data
    })
    req.on("end",function(){
        str = qs.parse(str)
        // console.log("123456",str)
        shopcar = JSON.parse(str.shopcar)
        res.send(JSON.stringify(shopcar))
    })
})
//减一
app.post("/producecount",function(req,res){
    var str = ""
    req.on("data",function(data){
        str += data
    })
    req.on("end",function(){
        str = qs.parse(str)
        // console.log("123456",str)
        shopcar = JSON.parse(str.shopcar)
        res.send(JSON.stringify(shopcar))
    })
})
//删除
app.post("/removeshopi",function(req,res){
    var str = ""
    req.on("data",function(data){
        str += data
    })
    req.on("end",function(){
        str = qs.parse(str)
        shopcar.splice(str.index,1)
        res.send(JSON.stringify(shopcar))
    })
})
