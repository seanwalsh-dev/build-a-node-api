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

  }else {

    //  *** MOVE TO getDataByQueryParams.js ***

    const continent = queryObj.continent
    const country = queryObj.country
    const isOpen = queryObj.is_open_to_public

    let filteredDestinations = destinations

    if(continent){
      filteredDestinations = filteredDestinations.filter((destination) => 
        destination.continent.toLowerCase() === continent.toLowerCase()
      )
    }

    if(country){
      filteredDestinations = filteredDestinations.filter((destination) => 
        destination.country.toLowerCase() === country.toLowerCase()
      )
    }

    if(isOpen){
      filteredDestinations = filteredDestinations.filter((destination) => 
        destination.is_open_to_public.toString().toLowerCase() === isOpen.toLowerCase()
      )
      console.log('isOpen: ', isOpen.toLowerCase())
    }

    if(filteredDestinations.length === 0){
      filteredDestinations = {error: "not found", message: "The requested route does not exist"}
    }

    sendJSONResponse (res, 200, filteredDestinations, 'GET /api requested')
  }

  //  *** MOVE TO getDataByQueryParams.js ***
  
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))












  // if (urlObj.search === '' && req.method === 'GET') {
  //   console.log('urlObj.pathname: ', urlObj.pathname)
  //   const filteredDestinations = destinations
  //   sendJSONResponse (res, 200, filteredDestinations, 'GET /api requested')

  // }else if (queryObj.continent && req.method === 'GET') {
  //   // ***  WORKING HERE  ***
  //   console.log('queryObj.continent: ', queryObj.continent)
  //   const locationType = 'continent'
  //   const locationName = queryObj.continent
  //   const filteredDestinations = getDataByQueryParams(locationType, locationName, queryObj, destinations)
  //   sendJSONResponse (res, 200, filteredDestinations, 'GET /api?continent requested')

  //   console.log('filteredDestinations: ', filteredDestinations)

  // }else if (queryObj.country && req.method === 'GET') {
  //   console.log('queryObj.country: ', queryObj.country)
  //   const locationType = 'country'
  //   const locationName = queryObj.country
  //   const filteredDestinations = getDataByQueryParams(locationType, locationName, queryObj, destinations)
  //   sendJSONResponse (res, 200, filteredDestinations, 'GET /api?continent requested')

  // }else {
  //   const errObj = {error: "not found", message: "The requested route does not exist"}
  //   sendJSONResponse (res, 404, errObj, 'request not found')
  // }