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
      destination.is_open_to_public === JSON.parse(isOpen.toLowerCase())
    )
    console.log('isOpen: ', isOpen.toLowerCase())
  }

  return filteredDestinations
}
