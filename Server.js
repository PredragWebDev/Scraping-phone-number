const express = require('express');
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const app = express()
const fs = require('fs');
const {getPhone_number, getCount_of_page} = require('./class/Scrap');
const { start } = require('repl');
const { count } = require('console');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
 
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
 
app.post('/', async function (req, res) {

})

app.listen(3000, async function () {
  console.log('app listening on port 3000!')
  let properties = [];
  // const count_of_page = await getCount_of_page();

  const count_of_page = 10;
  const count_of_browser = 6;

  const onetime = Math.floor(count_of_page/count_of_browser);

  // for(let i = 0; i < count_of_browser; i ++) {
    
    const property_data = await getPhone_number(0, 10);
    // getProductFromPOS(0, 10)
    // .then(property_data => {

    //   properties = [...properties, ...property_data];
    // })

    // i += onetime;
  // } 


  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(property_data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  XLSX.writeFile(workbook, 'data.xlsx');

  console.log('the end')

})

