// const http = require('http')
const fs = require('fs')
const path = require('path')

const movieDbPath = path.join(__dirname, '../db/data.json')


function getAllMovies(req, res){
    
    fs.readFile(movieDbPath, 'utf-8', (err, movie) => {
        if(err){
            res.writeHead(400)
            res.end('Error occurred!!!')
        }
        
        res.writeHead(200)
        res.end(movie)
    })

}

function addMovie(req, res){
const body = []

    req.on('data', (chunk) => {
    body.push(chunk)
})

    req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    let parsedBodyObj = JSON.parse(parsedBody)
    


    fs.readFile(movieDbPath, 'utf-8', (err, data) => {
        if(err){
            res.writeHead(400)
            res.end('Error occurred!!!')
        }
        let dataObj = JSON.parse(data)
        let lastId = dataObj[dataObj.length -1].id
        parsedBodyObj.id = lastId + 1;

        const newMovie = [...dataObj, parsedBodyObj]
        
        fs.writeFile(movieDbPath, JSON.stringify(newMovie), (err)=> {
            if(err){
                res.writeHead(400)
                res.end('Error occurred!!!')
            }
            console.log(newMovie)
            res.end('Movie added successfully!!!')
        })
    })
})
}

function updateMovies(req, res){
const body = []
req.on('data', (chunk) =>{
    body.push(chunk)
})

req.on('end', () =>{
    const parsedData = Buffer.concat(body).toString()
    const parsedDataObj = JSON.parse(parsedData)

    let movieID = parsedDataObj.id

    fs.readFile(movieDbPath, 'utf-8', (err, data) => {
        if(err){
            res.writeHead(400)
            res.end('Error occurred!!!')
        }

        let movieObj = JSON.parse(data)
       let movieIndex =  movieObj.findIndex(movie => movie.id === movieID)
       if(movieIndex === -1){
        res.writeHead(400)
        res.end('Movie with ID not found!!!')
       }

       let updatedMovie = {...movieObj[movieIndex], ...parsedDataObj}
       movieObj[movieIndex] = updatedMovie
       
       fs.writeFile(movieDbPath, JSON.stringify(movieObj), (err) => {
        if(err){
            res.writeHead(404)
            res.end('Movie with ID not found')
        }
        res.end('Movie updated successfully!!!')

       })
        
    })
})
}

function deleteMovie(req, res){

const body = []
req.on('data', (chunk) => {
    body.push(chunk)
})
req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString()
    const parsedBodyObj = JSON.parse(parsedBody)

    let movieId = parsedBodyObj.id

    fs.readFile(movieDbPath, 'utf-8', (err, data) => {
        if(err){
            res.writeHead(404)
            res.end('An error occurred!!!')
        }

        const movieObj = JSON.parse(data)
        let movieIndex = movieObj.findIndex(movie => movie.id === movieId)
        movieObj.splice(movieIndex, 1)
        
        fs.writeFile(movieDbPath, JSON.stringify(movieObj), (err) => {
            if(err){
                res.writeHead(404)
                res.end('Error occurred!!!')
            }

            res.end('Deletion successful!!!')
        })

    })
})
}


module.exports = {
    getAllMovies,
    addMovie,
    updateMovies,
    deleteMovie
}