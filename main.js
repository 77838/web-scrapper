// const pupeteer = require("pupeteer")
// const request = require("request")
// const cheerio = require("cheerio")

// const url="https://www.amazon.in/s?k=macbook+pro&sprefix=mac%2Caps%2C463&ref=nb_sb_ss_ts-doa-p_2_3"

// request(url,resp)

// function resp(err,response,html){
//     if(err)
//     console.log(err)
//     else
//     extracthtm(html)
// }



// function extracthtm(html){

//      let parsehtml= cheerio.load(html)

//      let contentarr = parsehtml(".a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2")

//      let laptopname = parsehtml(contentarr[0]).text()

//      let contentarr2 = parsehtml(".a-row.a-size-base.a-color-base")

//      let price = parsehtml(contentarr2[3]).text()

//      console.log(`
//      Laptop name = ${laptopname}
//      `)

//      console.log(`
//      price = ${price}
//      `)

// }




// const url2="https://www.flipkart.com/apple-2021-macbook-pro-m1-16-gb-1-tb-ssd-mac-os-monterey-mk1f3hn-a/p/itm4ebc9965a16d9?pid=COMG7X7H2BDZFGET&lid=LSTCOMG7X7H2BDZFGETKW1BOV&marketplace=FLIPKART&q=2021+Apple+MacBook+Pro+16-inch&store=6bo%2Fb5g&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=cbedec69-cfd3-4111-a21b-30c5b555382b.COMG7X7H2BDZFGET.SEARCH&ppt=sp&ppn=sp&ssid=oqb8dwmf5s0000001648132435020&qH=34df846abcc5489e"

// request(url2,resp2)

// function resp2(err,response,html){
//     if(err)
//     console.log(err)
//     else
//     extracthtm2(html)
// }

// function extracthtm2(html){

//     let parsehtml= cheerio.load(html)

//     let laptopname2 = parsehtml(".B_NuCI").text()
//     let price2 = parsehtml("._25b18c").text()

//      console.log(`
//      Laptop name2 = ${laptopname2}
//      `)

//      console.log(`
//      price2 = ${price2}
//      `)

// }

const request = require("request")
const cheerio = require("cheerio")
const puppeteer = require('puppeteer');
const fs = require("fs");



(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.amazon.in/s?k=iphone+13&sprefix=ip%2Caps%2C347&ref=nb_sb_ss_ts-doa-p_1_2');

  const linksarray = await page.evaluate(() => {

    let mobile = document.querySelectorAll(".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal")
    const mobilelist = [...mobile]

    let res = mobilelist.map((lnk, vval) => vval % 2 == 0 ? lnk.href : null)

    let fres = res.filter(checkNull)

    return fres
    function checkNull(res) {
      return res != null
    }

  })
let arr=[]

  for (let i = 0; i < linksarray.length; i++) {

    let newlink = linksarray[i]
    const url = newlink

    request(url, resp)

    function resp(err, response, html) {
      if (err)
        console.log(err)
      else
        extracthtm(html)
    }



    function extracthtm(html) {

      let parsehtml = cheerio.load(html)

      let names = parsehtml(".a-size-large.product-title-word-break")
      let tempname = parsehtml(names[0]).text().trim()
            let mobname = tempname.split("(")
             let Storage = tempname.split("(")
             let color = tempname.split("-")
      let price = parsehtml(".a-offscreen")
      // let Specs = parsehtml(".a-section.a-spacing-medium.a-spacing-top-small")
      let rating = parsehtml(".a-size-medium.a-color-base").text()
     
      
      // let mobname = parsehtml(names[0]).text().trim()
      let mobprice = parsehtml(price[0]).text()


      let internal = Storage[1].slice(0,3)
      let clr = color[1]
      let nam = mobname[0]
    //   console.log(`AMAZON
    //         `)
    //   console.log(`Mobile name =  ${mobname[0]}`)
    //   console.log(`Mobile Storage = ${Storage[1].slice(0,3)} GB`)
    //   console.log(`Mobile Color = ${color[1]}`)
    //  console.log(`Mobile price = ${mobprice}`)
    //  console.log(`Mobile Specs = ${Specs}`)
//      console.log(`Mobile Rating = ${rating}
// _________________________`)
     
let mobileprice =mobprice.slice(1,mobprice.indexOf(".")).split(",").join('')
arr.push({nam,mobileprice,internal,clr,rating})
fs.writeFileSync('./data.json',JSON.stringify(arr))
// console.log(arr)

    }
  }


  await browser.close();
})();