require('dotenv').config();
const bodyParser= require('body-parser')
const request = require('request');

const getFilms = async (req, res) => {
    try {
            let title = req.body.title;
            let url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${title}`
        
            request(url, function (err, res, body) {
                console.log(`res: ${res}`)
                console.log(`body: ${body}`)
                if(err){
                  res.render('home.pug', {msj: 'no encuentro nada, revisa que no te hayas colado paleto'});
                } else {
                    res.redirect(`/films/${title}`, {Films: res.Search});
                }
              });
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}

const printFilms = async (req,res) =>{
    try{
        res.render('film.pug', {Films: 'ni idea'})
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}

module.exports = {
    getFilms, 
    printFilms
}