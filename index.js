import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  console.log('URL OBJ: ', urlObj)

  const queryObj = Object.fromEntries(urlObj.searchParams)
  console.log('QUERY OBJ: ', queryObj)

  // Array of allowed query parameters
  const allowedKeys = ['country', 'continent', 'is_open_to_public']
  
  // keys from the query object
  const queryObjKeys = Object.keys(queryObj)

  // No other keys exist
  const hasOnlyAllowedKeys = queryObjKeys.every((key) => allowedKeys.includes(key))

  const pathname = urlObj.pathname.replace(/\/$/, '')

  if (urlObj.search === '' && req.method === 'GET' && pathname === '/api') {
    console.log('urlObj.pathname: ', urlObj.pathname)
    const filteredDestinations = destinations
    sendJSONResponse (res, 200, filteredDestinations, 'GET /api requested')

  }else if (queryObjKeys.length > 0 && hasOnlyAllowedKeys){
    const filteredDestinations = getDataByQueryParams(queryObj, destinations)

    if(filteredDestinations.length > 0){
      sendJSONResponse (res, 200, filteredDestinations, 'GET /api requested')

    }else{
      const errObj = {error: "not found", message: "There are no destinations with these parameters"}
    sendJSONResponse (res, 404, errObj, 'request has no results')
    }

  }else {
    const errObj = {error: "not found", message: "The requested route does not exist"}
    sendJSONResponse (res, 404, errObj, 'request not found')
  }
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))