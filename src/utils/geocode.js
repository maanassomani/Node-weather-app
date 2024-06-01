const request=require('request')

const geocode = (address, callback) => {
    const url='https://api.geoapify.com/v1/geocode/search?text=' + encodeURIComponent(address) + '&lang=en&limit=1&apiKey=08e0808e377c4257944dc844c4beab79'

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (!body.features[0]) {
            callback('Unable to find location!',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.formatted
            })
        }
    })
}

module.exports=geocode