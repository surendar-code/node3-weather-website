const forecast= require('./utils/forecast')
const geocode= require('./utils/geocode')


const express = require('express')
const path = require('path')
const hbs = require('hbs')


const { title } = require('process')
const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engines and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Surendar Ram'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name : 'Surendar Ram'

    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpMsg : 'This is a Help Page',
        name:'Surendar Ram'
    })
})

app.get('/help/*',(req,res) => {
   res.render('404',{
       title: '404',
       msg : 'Help article not found !',
       name : 'Surendar Ram'
   })
})

app.get('/weather',(req,res) => {

    const address =req.query.address

    if(!address)
    {
        return res.send('Enter the address to fetch weather information !')
    }
   geocode(address,(error,{latitude,longitude,location}={}) => {
       if(error){
           return res.send({error})
       }
  
      forecast(latitude,longitude, (error, ForecastData) => {
          if(error){
              return res.send(error);
          }
          res.send({              
            location,
            ForecastData: ForecastData,
            address
        });
            
        })
  }) 

    // res.send({
    //     address : address,
    //     forecast: 'Cloudy',
    //     location : 'Madurai'
  })

app.get('/products',(req,res) => {

    if(!req.query.search){
        console.log('Enter search term ')
        return res.send('Enter search term ')
        
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        msg: 'Page not found !',
        name : 'Surendar Ram'
    })
})


app.listen(port,() => {
    console.log('Server is up on port'+port);
})