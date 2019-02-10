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

