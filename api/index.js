const express = require('express')
const routerApi = require('./routes/index')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// app.use((req, res, next) => {
//   const userAgent = req.get('user-agent');
//   // Registro de información en la consola
//   console.log('Solicitud recibida:');
//   console.log('Desde:', req); // Dirección IP del cliente
//   console.log('URL:', req.url); // URL a la que se hizo la solicitud
//   console.log('Método:', req.method); // Método HTTP de la solicitud
//   console.log('User-Agent:', userAgent)

//   // Si la solicitud es POST y tiene datos en el cuerpo
//   if (req.method === 'POST' && req.body) {
//     console.log('Data:', req.body); // Mostrar la data del cuerpo de la solicitud
//   }

//   next(); // Pasar al siguiente middleware o enrutador
// });

const whiteList = ['http://127.0.0.1:9000', 'https://miapp.com']
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No esta permitido'))
    }
  }
}

app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
})

routerApi(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`running in port ${port}`)
})
