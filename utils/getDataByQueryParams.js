export function getDataByQueryParams(queryObj, destinations) {
  
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

  return filteredDestinations
}



// export function getDataByQueryParams(locationType, locationName, queryObj, destinations) {
//   const isOpen = queryObj.is_open_to_public
  
//       return destinations.filter((destination) =>{
//         if(isOpen){
//           return destination[locationType].toLowerCase() === locationName.toLowerCase() 
//           &&
//           destination.is_open_to_public.toString().toLowerCase() === isOpen.toLowerCase()
  
//         }else{
//           return destination[locationType].toLowerCase() === locationName.toLowerCase()
//         }
//       })
// }

//  Try adjusting your getDataByQueryParams
//  to accept the full data set and query object,
//  and handle all three filters
//  country, continent, is_open_to_public, together

//  your filter only works when a continent or country is provided.
//  How can you handle any combination of the three query
//  params, including just is_open_to_public