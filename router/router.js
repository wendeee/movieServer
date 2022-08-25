const http = require('http')
const url = require('url')
const { getAllMovies, addMovie, updateMovies, deleteMovie} = require('../controller/controller')

function requestHandler(req, res){
    //GET Movie
    if(req.url === '/movies' && req.method === 'GET'){
     getAllMovies(req, res)
    }
    else if(req.url === '/movies' && req.method === 'POST'){
     addMovie(req, res)
    }
    else if(req.url === '/movies' && req.method === 'PUT'){
     updateMovies(req, res)
    }
 
    else if(req.url === '/movies' && req.method === 'DELETE'){
     deleteMovie(req, res)
    }
    
 }
 module.exports = {
    requestHandler
 }