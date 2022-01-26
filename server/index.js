const express = require('express')
const fs = require('fs')
var cors = require('cors')
const app = express()
const port = 8000
app.use(express.json())
app.use(cors())

let voters = [
    {
        "address":"0x0AB61108422bB3Fdc728eCF146ddf8574FeaaE40",
        "voted":false
    },
    {
        "address":"0x6BCed0254b84f675e47192D34E72a073B2673D4f",
        "voted":false
    },
    {
        "address":"0xC8e162e6553f3B525d7290531a6c9B5E95a5D7d8",
        "voted":false
    },
    {
        "address":"0xa847C135155652DE826387280Df29A64bC1a0704",
        "voted":false
    },
    {
        "address":"0xccB3295e1764B4d97faE876D5AD5e59178CC1E57",
        "voted":false
    },
    {
        "address":"0x0C0A4D9Bced819D5546631A8f3A0752b696919C7",
        "voted":false
    },
    {
        "address":"0x74fa574B76E3190Afa59BaE3C989000d0032B2a8",
        "voted":false
    },
    {
        "address":"0x63A9c3EF1acC74ABDD96Be480728f8186fCa9b77",
        "voted":false
    },
    {
        "address":"0x25875B346e8DBdAa702d5853D3878f2F38CC4F22",
        "voted":false
    },
]
app.post("/updatefile",(req,res,next)=>{
    console.log(req.body.index)
    res.set('Access-Control-Allow-Origin','http://localhost:3000')
    res.json({"message":"success"})
    voters[req.body.index].voted = true
    fs.writeFileSync("../client/src/data.json",JSON.stringify(voters))
    console.log("Done")
})

app.listen(port,()=>{
    console.log("Listening...")
})