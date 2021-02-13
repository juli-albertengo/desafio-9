import express, {Application, Request, Response} from 'express';
import {productos} from './productos';
import path from 'path'

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = express.Router();


router.get('/productos', (req:Request, res:Response) => {
    let productosListados = productos.getAllProducts();
    res.json(productosListados);
})

router.get('/productos/:id', (req:Request, res:Response) => {
    const {id} = req.params;
    let numberId = Number(id);
    let producto = productos.findProductById(numberId);
    res.json(producto);
})

router.post('/productos', (req:Request, res:Response) => {
    const {id, title, price, thumbnail} = req.body;
    const producto = {
        id,
        title,
        price,
        thumbnail
    }
    productos.addProduct(producto);
    res.sendFile(path.join((__dirname + '/index.html')).replace('src', 'public') )
})

router.put('/productos/:id', (req:Request, res:Response) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    const productoActualizado = {
        title,
        price,
        thumbnail
    }
    let numberId = Number(id);
    let finalProduct = productos.actualizarProduct(numberId, productoActualizado);
    res.json(finalProduct);
})

router.delete('/productos/:id', (req:Request, res:Response) => {
    const {id} = req.params;
    let numberId = Number(id);
    let productoBorrado = productos.deleteProduct(numberId);
    res.json(productoBorrado);
})

export default router;