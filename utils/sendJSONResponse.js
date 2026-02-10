export function sendJSONResponse (res, statusCode, data, log) {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = statusCode
  res.end(JSON.stringify(data), () => console.log(log))
}