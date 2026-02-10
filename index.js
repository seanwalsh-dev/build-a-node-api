import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
  
  const destinations = await getDataFromDB()
  
  if (req.url === '/api' && req.method === 'GET'){

    sendJSONResponse (res, 200, destinations, 'GET /api requested')

  } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {

    const continent = req.url.split('/').pop()
    const filteredData = destinations.filter((destination) => 
      destination.continent.toLowerCase() === continent.toLowerCase()
    )
    sendJSONResponse (res, 200, filteredData, 'GET /api/continent requested')

  } else {

    const errObj = {error: "not found", message: "The requested route does not exist"}
    sendJSONResponse (res, 404, errObj, 'request not found')
  
  }
  
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))