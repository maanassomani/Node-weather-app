const request=require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(long) + '&appid=618fa0dc88482530dd55061607362a4f&units=metric'

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather services',undefined)
        }
        else if (body.message) {
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined,body.weather[0].description + '. It is currently ' + (body.main.temp) + ' degrees out. It feels like ' + (body.main.feels_like) + ' degrees out.')
        }
    })
}

module.exports=forecast