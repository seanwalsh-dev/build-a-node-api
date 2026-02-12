import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  console.log('URL OBJ: ', urlObj)
  console.log('urlObj.searchParams: ', urlObj.searchParams)

  const queryObj = Object.fromEntries(urlObj.searchParams)
  console.log('QUERY OBJ: ', queryObj)
  
  if (req.url === '/api' && req.method === 'GET'){

    sendJSONResponse (res, 200, destinations, 'GET /api requested')

  }else if (req.url.startsWith('/api/continent') && req.method === 'GET') {

    const continent = req.url.split('/').pop()
    const filteredData = getDataByPathParams (destinations, 'continent', continent)
    sendJSONResponse (res, 200, filteredData, 'GET /api/continent requested')

  }else if (req.url.startsWith('/api/country') && req.method === 'GET') {

    const country = req.url.split('/').pop()
    const filteredData =  getDataByPathParams (destinations, 'country', country)
    sendJSONResponse(res, 200, filteredData, 'GET /api/country requested')

  }else {

    const errObj = {error: "not found", message: "The requested route does not exist"}
    sendJSONResponse (res, 404, errObj, 'request not found')
  
  }
  
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))