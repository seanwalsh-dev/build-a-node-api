export function getDataByPathParams (req, destinations) {
  
  const parameter = req.url.split('/')[2]
  const value = req.url.split('/').pop()
  
  const filteredData = destinations.filter((destination) => 
    destination[parameter].toLowerCase() === value.toLowerCase()
  )
  return filteredData
}