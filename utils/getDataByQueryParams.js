export function getDataByQueryParams(locationType, locationName, queryObj, destinations) {
  const isOpen = queryObj.is_open_to_public
  
      return destinations.filter((destination) =>{
        if(isOpen){
          return destination[locationType].toLowerCase() === locationName.toLowerCase() 
          &&
          destination.is_open_to_public.toString().toLowerCase() === isOpen.toLowerCase()
  
        }else{
          return destination[locationType].toLowerCase() === locationName.toLowerCase()
        }
      })
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