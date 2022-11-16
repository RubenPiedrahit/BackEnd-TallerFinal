import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'
import  fs  from 'fs'



const app = express();

app.use(express.json());
app.use(express.static('src'));

app.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT "Bienvenidos" as RESULT')
    res.json(rows)
  })
  app.get('/cliente', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Cliente')
    res.json(rows)
  })
  app.get('/Productos/:Id_Producto', async (req, res) => {
    const id = req.params.Id_Producto
    let sql = `CALL Producto(?)`;
    const [rows] = await pool.query(sql,id);
      res.json(rows[0][0])
  })
  
  app.get('/Productos', async (req, res) => {
    const id = req.params
    const [rows] = await pool.query('SELECT * FROM Productos')
    res.json(rows);
    
  })

  app.post('/Imagen', async (req, res) => {
    const image= fs.readdirSync(new URL('../src/Imagenes/', import.meta.url));
    res.json(image);
  })


  app.post('/Post', async (req, res) => {
    const data = req.body
    const data1 = Object.values(data)
    let sql = `CALL Insert_Cliente(?,?,?,?)`;
    const [rows] = await pool.query(sql,data1)
    res.json(rows[0][0])
  })

  app.post('/Compra', async (req, res) => {
    const data = req.body
    const data1 = Object.values(data)
    let sql = `CALL Compra(?,?,?,?,?,?,?,?)`;
    const [rows] = await pool.query(sql,data1)
    res.json(rows[0][0])
  })

  app.get('/Facturacion/:IdFactura', async (req, res) => {
    const id = req.params.IdFactura
    let sql = `CALL Facturacion(?)`;
    const [rows] = await pool.query(sql,id)
    res.json(rows[0][0])
  })
  app.get('/Busqueda/:Identificacion', async (req, res) => {
    const id = req.params.Identificacion
    let sql = `CALL Busqueda_Factura(?)`;
    const [rows] = await pool.query(sql,id)
    res.json(rows[0])
  })


  app.listen(PORT)
  console.log('Server on port', PORT)


