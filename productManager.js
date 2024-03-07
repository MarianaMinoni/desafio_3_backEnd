// hacer una clase productManager

import fs from "fs"

class ProductManager {
    constructor(path){
        this.productos = [];
        this.id = 0;
        this.path = path;
        this.traerProductos();
       
       

    }

  

    //funcion para pasar los datos a string
    async guardarProductos() {

        try{
           await  fs.promises.writeFile((this.path, null, "\t"), 'utf-8')
            console.log('Productos guardados correctamente.');

        }
        
        catch(err) {
            console.log(err)
        }
    }

    //funcion para parsear de nuevo los datos
    async traerProductos(){

        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.productos = JSON.parse(data);
            return this.productos
        }

        catch(err){
            console.log(err);
        }
        
    }

    //metodo para limitar la cantidad de prod que muestro en pantalla

    limiteProductos(limit){
     const productosLimitados = this.productos.slice(0, limit);
     return productosLimitados
     
    }

   

// obtener los poductos
getProducts(){
  this.traerProductos()
    }






// obtener un producto por ID
    getProductbyId(productId){
        let producto = this.productos.find(producto => producto.id === productId);
        
        if (producto) {
            return producto
        } else {
            console.log('Not found');
        }
    }

// metodo agregar producto con las validaciones
   async addproduct(title, description, price, thumbnail, code, stock){

        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('todos los datos son obligatorios');
        }

        let codeExist = this.productos.some(producto => producto.code === code);



        if(codeExist){
            console.log('el codigo ingresado es incorrecto');
        } else{

        
        let producto = {
            id:this.id,
            title:title,
            description:description,
            price:price,
            thumbnail: thumbnail,
            code:code,
            stock:stock,
    
        }
        this.productos.push(producto);
        this.id ++;

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos))
            console.log('Producto agregado y archivo actualizado correctamente')

        }

        catch (err){
           console.log(err)

        }



        }
    }

    // borra un producto por id
    deleteProduct(id){
        let idExist = this.productos.some(producto => producto.id === id);

        if(idExist){
            this.productos = this.productos.filter(producto => producto.id != id);
            console.log(`el producto con id:  ${id} se eliminó exitosamente`);
            this.guardarProductos();

        } else{
            console.log(`el id: ${id} no existe`);
        }



    }

  //actualizar producto
upDateProduct(id, propAmodificar, cambio){
    let producto = this.productos.find(producto => producto.id === id);
    if(producto){
        if(propAmodificar in producto){
            producto[propAmodificar]= cambio;
            console.log('cambio realizado con exito');
            this.guardarProductos();
        }else{
            console.log('la propiedad a modificar no existe');

        }
    } else{
        console.log('el Id indicado no existe');
    }

}

}







const productManager = new ProductManager('./productos.json');





productManager.addproduct('t-shirt', 'white t-shirt', '100', 'img1.jpeg','1100', '10');
productManager.addproduct('shoe', 'sports shoes', '250', 'img2.jpeg','1101', '5');
productManager.addproduct('jeans', 'fashion white jeans', '200', 'img3.jpeg','1102', '3');
productManager.addproduct('skirt', 'long skirt', '150', 'img4.jpeg','1103', '16');
productManager.addproduct('socks', 'sports socks', '70', 'img5.jpeg', '1104', '3');


//productManager.deleteProduct(1)  //FUNCIONA OK
console.log(productManager.productos); //FUNCIONA OK
//console.log(productManager.getProductbyId(0)); //FUNCIONA OK
//productManager.upDateProduct(0, 'stock', '5'  ) //FUNCIONA OK


export default productManager;