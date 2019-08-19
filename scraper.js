const request = require('request');
const cheerio = require('cheerio')

//request('https://cml.bibliocommons.com/v2/search?query=neal+stephenson&searchType=author', function(err, res, body) {  

//request('https://cml.bibliocommons.com/v2/search?query=brandon+sanderson&searchType=author', function(err, res, body) {  

const firstName = "stephen"
const lastName = "king"

request(`https://cml.bibliocommons.com/v2/search?query=${firstName}+${lastName}&searchType=author`, function(err, res, body) {  
    const $ = cheerio.load(body)
    const root = JSON.parse($('script[type="application/json"]')[0].children[0].data)
    const bibs = Object.values(root.entities.bibs)

    console.log(bibs.map(item => item.briefInfo.title))
});