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
  // getDataByQueryParams(queryObj)

  if (urlObj.search === '' && req.method === 'GET') {
    console.log('urlObj.pathname: ', urlObj.pathname)
    const filteredDestinations = destinations
    sendJSONResponse (res, 200, filteredDestinations, 'GET /api requested')

  }else if (queryObj.continent && req.method === 'GET') {
    // ***  WORKING HERE  ***
    console.log('queryObj.continent: ', queryObj.continent)
    const locationType = 'continent'
    const locationName = queryObj.continent
    const filteredDestinations = getDataByQueryParams(locationType, locationName, queryObj, destinations)
    sendJSONResponse (res, 200, filteredDestinations, 'GET /api?continent requested')

    console.log('filteredDestinations: ', filteredDestinations)

  }else if (queryObj.country && req.method === 'GET') {
    console.log('queryObj.country: ', queryObj.country)
    const locationType = 'country'
    const locationName = queryObj.country
    const filteredDestinations = getDataByQueryParams(locationType, locationName, queryObj, destinations)
    sendJSONResponse (res, 200, filteredDestinations, 'GET /api?continent requested')

  }
  
  // if (urlObj.pathname === '/api' && req.method === 'GET'){
  //   let filteredDestinations = destinations
  //   sendJSONResponse (res, 200, filteredDestinations, 'GET /api requested')

  // }else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
  //   const continent = req.url.split('/').pop()
  //   const filteredData = getDataByPathParams (destinations, 'continent', continent)
  //   sendJSONResponse (res, 200, filteredData, 'GET /api/continent requested')

  // }else if (req.url.startsWith('/api/country') && req.method === 'GET') {
  //   const country = req.url.split('/').pop()
  //   const filteredData =  getDataByPathParams (destinations, 'country', country)
  //   sendJSONResponse(res, 200, filteredData, 'GET /api/country requested')

  // }else {
  //   const errObj = {error: "not found", message: "The requested route does not exist"}
  //   sendJSONResponse (res, 404, errObj, 'request not found')
  
  // }
  
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))