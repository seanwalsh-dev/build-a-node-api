export function getDataByQueryParams(queryObj, destinations) {
  
  const continent = queryObj.continent
  const country = queryObj.country
  const isOpen = queryObj.is_open_to_public
  
  let filteredDestinations = destinations

 
  
  


  if(continent){
    const continentLower = continent.toLowerCase()
    filteredDestinations = filteredDestinations.filter((destination) => 
      destination.continent.toLowerCase() === continentLower
    )
  }

  if(country){
    const countryLower = country.toLowerCase()
    filteredDestinations = filteredDestinations.filter((destination) => 
      destination.country.toLowerCase() === countryLower
    )
  }

  if(isOpen){
    const isOpenLower = isOpen.toLowerCase()
    if(isOpenLower === 'true' || isOpenLower === 'false'){
      filteredDestinations = filteredDestinations.filter((destination) => 
      destination.is_open_to_public === JSON.parse(isOpenLower)
    )

    }else{
      filteredDestinations = []
    }
    
  }

  return filteredDestinations
}
