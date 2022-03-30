const concat_map = require("concat-map");
const fs = require("fs");

// fs.readFileSync('./data.json')
let data1=fs.promises.readFile('./data.json')
 let data2=fs.promises.readFile('./data2.json')

// console.log(data1[0] + "  data1")
// console.log(data2 +" data 2")
let dataList=[];

data1.then((data)=>{
     data = JSON.parse(data)
     dataList = [...dataList, ...data];
    })

data2.then((data)=>{
    data = JSON.parse(data)
    dataList = [...dataList, ...data];
    fs.writeFileSync('./Mobiles.json',JSON.stringify(dataList));
})