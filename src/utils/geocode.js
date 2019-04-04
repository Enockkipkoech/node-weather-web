const request = require('request') 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2ZW5vY2siLCJhIjoiY2p0c29wc2d6MHF3ODN5bDh4dDVkY2VycCJ9.qgI-1tQtS-VEghBYOwTrcA&limit=1'

    request({url, json: true}, (error,{body})=>{
        if (error){
            callback('Unable to access the location services!' , undefined)
        }else if (body.features.length === 0){
            callback('Unable to find location. Try another Search', undefined)
        }
        else {
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude:  body.features[0].center[1],
                location:  body.features[0].place_name

            })
           
        }
    })
}

module.exports = geocode