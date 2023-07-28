var express = require('express');
var hbs = require('hbs');
var path = require('path')
const port = 3000

var app = express();

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'))

app.use(express.static(path.join(__dirname, '../public')))

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

app.get('/', function(req, res){
    res.render('register');
});

app.listen(port);
console.log('server is now listening')