import express, {Application, Request, Response} from 'express';
import router from './router';
import path from 'path'
//import handlebars from 'express-handlebars';
import pug from 'pug';
import {productos} from './productos';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('views', './public/views');
app.set('view engine', 'pug');


/*Vista de tabla*/
app.get('/productos/vista', (req:Request, res: Response) => {
    const misProductos = productos.getAllProducts()
    if(misProductos.length === 0){
        res.render('tabla.pug', {mensaje: 'No hay productos'})
    } else {
        res.render('tabla.pug', {misProductos});
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