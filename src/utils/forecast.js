const request = require('request') 

const forecast = (latitude,longitude, callback) =>{
    const Url= 'https://api.darksky.net/forecast/9bfacb2e0a58d81c2a8be9c41733330c/' + latitude + ',' + longitude +''

    request({url: Url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to access the Weather API services!' , undefined)
        }else if (body.error){
            callback('No matching results for your request', undefined)
        }
        else {
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.There is a ' + body.currently.precipProbability + '% chance of rain'
          )}          
        
    })

}

module.exports = forecast