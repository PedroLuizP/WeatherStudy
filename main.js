require('dotenv').config()

function teste(lat, lan){
    console.log(process.env.CONNECTIONSTRING)
    console.log(process.env.LAT)
}

teste(123, 123)
