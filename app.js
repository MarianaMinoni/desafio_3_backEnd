import { clear } from "console";
import productManager from "./productManager.js";
import express from "express";

const app = express()
const port = 3000

app.get('/ping', (req, res) => {
  res.send('pong');
  
  
 
 
})

//app.get('/products', (req, res) => {

  

    //req: analizar el req del usuario, si esta todo ok, y si tiene sentido

    //llamar a las funciones del modelo de negocio para resolver la consulta del cliente
    //let productos = productManager.traerProductos()
    //res: enviar respuesta de lo que solicito el cliente
    //res.send(productos)

//})



app.get('/products', async (req, res) => {

  if(req.query.limit){

    //envio al usuario la cantidad de productos que especifica
    
    res.send(productManager.limiteProductos(req.query.limit))
  
  } else{

    
    try {
      // Llama a traerProductos y espera a que la promesa se resuelva
      let productos = await productManager.traerProductos();
      
      //envio todos los productos al  usuario
      res.send(productos);
  } catch (error) {
    
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }

  }

 

 
});

app.get('/products/:id', async (req, res) => {

  const id = req.params.id;

  try {
    const productId= parseInt(id);
    
    let productoPorId =  await productManager.getProductbyId(productId);
    
    // envio la respuesta con los productos
    res.send(productoPorId);
} catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
}
});
 







app.listen(port, () => {
  console.log(`aplicacion funcionando en puerto ${port}`)
})