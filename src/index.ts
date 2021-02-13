import express, {Application, Request, Response} from 'express';
import router from './router';
import path from 'path'
import handlebars from 'express-handlebars';
import {productos} from './productos';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

/* Desafio Clase 10 - Motores de plantilla */
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    /*Esta parte no sabia como resolverla, hice esto y funciona */
    layoutsDir: path.join((__dirname + '/views/layouts')).replace('src', 'public'),
    partialsDir: path.join((__dirname + '/views/partials')).replace('src', 'public')  
    })
);

app.set('view engine', 'hbs');
app.set('views', './public/views');

/*Vista de tabla*/
app.get('/productos/vista', (req:Request, res: Response) => {
    const misProductos = productos.getAllProducts()
    if(misProductos.length === 0){
        res.render('main', {mensaje: 'No hay productos'})
    } else {
        res.render('main', {misProductos});
    }
})

/*Vista de formulario */
app.get('/', (req:Request, res:Response) => {
    res.sendFile(__dirname+'/index.html')
})

/*Ejercicios anteriores*/
app.use('/api', router);


app.listen('8080', () => {
    console.log('App is listening on port 8080');
})