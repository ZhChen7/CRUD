# CRUD

#### 技术：

###      MongoDB+mongoose



##### 关键文件：

student.js

~~~javascript
let mongoose =require('mongoose')
let Schema =mongoose.Schema

mongoose.connect('mongodb://localhost/Student', {useNewUrlParser: true});

let commentSchema= new Schema({
    name:{
       type:String,
       require:true
    },
    gender:{
        type:Number,
        enum:[0,1],
        default:0
    },
    hobbies:{
        type:String,
    },
    fruits:{
        type:String,
    }
})

module.exports=mongoose.model('Student',commentSchema)

~~~

router.js

~~~javascript
/*
 * 路由模块
 * */
let express = require('express')
let router = express.Router()

let student = require('./student')

router.get('/', function (req, res) {
    student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.render('index.html', {
            students: students
        })
    })
})
router.get('/students', function (req, res) {
    student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.render('index.html', {
            students: students
        })
    })

})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students/new', function (req, res) {
    //获取表单数据----req.body
    new student(req.body).save(function (err, ret) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.redirect('/students')
    })

})

router.get('/students/edit', function (req, res) {
    student.findById(req.query.id.replace(/"/g, ''), function (err, student) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.render('edit.html', {
            student: student
        })

    })

})

router.post('/students/edit', function (req, res) {
    let id = req.body.id.replace(/"/g, '')
    student.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    let id = req.query.id.replace(/"/g, '')
    student.findByIdAndRemove(id, function (err) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.redirect('/students')
    })

})


module.exports = router


~~~

app.js

~~~ javascript
/*
* app.js入口模块
* --启动服务
* --做一些服务相关的配置
* --模板引擎
* --body-parser -解析表单post请求体
* --提供静态资源服务
* --挂在路由--app.use(router)
* --监听端口号启动服务
* */

let express= require('express')
let router=require('./router')
let bodyParser = require('body-parser')

let app=express()

//公开资源
app.use(express.static('public'))
app.use(express.static('node_modules'))

app.engine('html',require('express-art-template'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//把路由容器挂载到app服务中
app.use(router)


app.listen(3000,function () {
    console.log('app is running!')
})

~~~



