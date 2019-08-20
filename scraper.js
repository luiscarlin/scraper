//request('https://cml.bibliocommons.com/v2/search?query=neal+stephenson&searchType=author', function(err, res, body) {  
//request('https://cml.bibliocommons.com/v2/search?query=brandon+sanderson&searchType=author', function(err, res, body) {  
// https://cml.bibliocommons.com/v2/search?query=cities+of+the+red+night&searchType=title
// request(`https://cml.bibliocommons.com/v2/search?query=${firstName}+${lastName}&searchType=author`, function(err, res, body) {

const request = require('request')
const cheerio = require('cheerio')

const title = "the hobbit"
const authorLastName = "tolkien"
// const authorFirstName = "Neil"

request(`https://cml.bibliocommons.com/v2/search?query=${encodeURI(title)}&searchType=title`, function(err, res, body) { 
    const $ = cheerio.load(body)
    const root = JSON.parse($('script[type="application/json"]')[0].children[0].data)

    const bibs = Object.values(root.entities.bibs)
    const listBooks = [... new Set(bibs.map(item => ({authors: item.briefInfo.authors || [], title: item.briefInfo.title, format: item.briefInfo.format})))]

    const authorFilteredBooks = listBooks.filter(book => book.authors.length > 0 && book.authors[0].toUpperCase().includes(authorLastName.toUpperCase()))
    const formatFilteredBooks = authorFilteredBooks.filter(book => book.format == "BK" || book.format == "AB")

    console.log(formatFilteredBooks)

    // https://cml.bibliocommons.com/v2/search/availability/S105C2258827?query=norse+mythology&searchType=title&sort=author
});