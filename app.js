const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('view engine', handlebars)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
        res.render('home.handlebars', { post: posts })
    })
})

app.get('/cad', function (req, res) {
    res.render('form.handlebars')
})

app.post('/publicacao', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.redirect('/')
    }).catch(function (error) {
        res.send('Post não teve sucesso' + error)
    })
})

app.get('/deletar/:id', (req, res)=>{
    Post.destroy({where: {'id': req.params.id}})
    .then(()=>{
        res.redirect('/')
    })
    .catch((error)=>{
        res.send('Post não excluído ' + error)
    })
})

app.listen(8581, function () {
    console.log('Servidor ligado!')
})