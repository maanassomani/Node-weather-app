const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define paths for express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const port= process.env.PORT || 3000

//setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Maanas'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Maanas'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        message:'You have reached help page!',
        name:'Maanas'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help article not found',
        name:'Maanas'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page not found',
        name: 'Maanas'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})