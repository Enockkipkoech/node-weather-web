const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index.hbs',{
        title:'Weather',
        name: 'Enock'
    })
})

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        title: 'About Me',
        name: 'Enock'
    })
})

app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        helpText:"Need Help? Just go to navbar above and browse the site.",
        name: 'Enock',
        title: 'Help'

    })
})

app.get('/Weather', (req,res)=>{
    if (!req.query.address) {
       return res.send({
            error: "Provide an address!"
        })
    }

    geocode(req.query.address,(error, { latitude,longitude, location} = {})=>{
        if (error) {
            return res.send({error})
        }
        forecast( latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if (!req.query.search){
    return res.send({
            error: 'you must provide search term'
         })        
       
    }
    console.log(req.query.search)
        res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        title: '404:',
        name: 'Enock',
        errorMessage: 'Help Article not found!'
    })
})

app.get('*',(req, res)=>{
    res.render('404.hbs',{
        title: "404 page",
        name: 'Enock',
        errorMessage: 'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up and running on port 3000')
})