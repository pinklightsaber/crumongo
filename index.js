const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const app = express();

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes, url
app.use('/api/tasks', require('./src/routes/task.routes'));

//static files

app.use(express.static(path.join(__dirname, 'src/public')))


//starting server
app.listen(app.get('port'), () => {
    console.log('Estoy conectado en el server 3000')
});