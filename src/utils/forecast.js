const request = require('request')

const forecast = (longtitude,latitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=72d2f56817750d839eb83984d7726791&query='+longtitude+','+latitude

    request({url, json:true},(error,{body}={}) => {
        if(error){
            callback('Unable to connect to WeatherStack!',undefined)
        }else if(body.error){
            callback('Unable to find the Location',undefined)
        }else{
            callback(undefined,'weather is '+body.current.weather_descriptions+' .It is ' +body.current.temperature +' degrees and it feels like '+body.current.feelslike+' degrees'+' and the humidity is '+body.current.humidity+'.')
        }
    })

}

module.exports = forecast