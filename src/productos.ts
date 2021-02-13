interface Producto{
    id: Number,
    title: String,
    price: Number,
    thumbnail:String
}

class Producto implements Producto {
    id: Number;
    title: String;
    price: Number;
    thumbnail: String;

    constructor(id:Number, title:String, price:Number, thumbnail:String){
        this.id = id;
        this.title = title;
        this.price = price,
        this.thumbnail = thumbnail;
    }   
}

class Productos{
    productos: Array<Producto>;

    constructor(arrayProductos:Array<Producto>){
        this.productos = arrayProductos;
    }

    getAllProducts(){
        return this.productos;
    }

    findProductById(id:Number){
        let producto = this.productos.find(producto => {
            return producto.id === id;
        })
        if(!producto){
            return {error : 'producto no encontrado'}
        }
        return producto;
    }

    addProduct(producto:Producto){
        let ids:Array<any> = [];
        this.productos.map(product => {
            ids.push(product.id)
        });
        let maxId = Math.max(...ids);
        let id = maxId + 1;
        producto.id = id;
        this.productos = [... this.productos, producto];
        return producto;
    }

    actualizarProduct(id:Number, productoActualizado:any){
        let producto = this.productos.find(producto => {
            return producto.id === id;
        })
        if(!producto){
            return {error : 'producto no encontrado'}
        }
        producto.price = productoActualizado.price;
        producto.thumbnail = productoActualizado.thumbnail;
        producto.title = productoActualizado.title;
        return producto;
    }

    deleteProduct(id:Number){
        let producto = this.productos.find(producto => {
            return producto.id === id;
        })
        if(!producto){
            return {error : 'producto no encontrado'}
        }
        let newProductos = this.productos.filter(producto => {
            return producto.id !== id
        })
        this.productos = newProductos;
        return producto;
    }

}

export const productos = new Productos([
    {id:1, title: 'Escuadra', price: 233, thumbnail: '../../img/escuadra.png'},
    {id: 2, title: 'Calculadora', price: 300, thumbnail: '../../img/calculadora.png'},
    {id: 3, title: 'Globo Terráqueo', price: 250, thumbnail: '../../img/globoTerraqueo.png'}
]);