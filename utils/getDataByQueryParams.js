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