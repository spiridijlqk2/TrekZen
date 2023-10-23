const mongoose = require("mongoose");
const Campground = require('../models/campground')
const {places, descriptors} = require('./seedHelpers')
const cities = require('./cities')
const axios = require('axios')

mongoose.connect('mongodb://127.0.0.1:27017/trek-zen');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'hJiuq59FACAiT_OpNmukKgv2G2nTVCLt8010xLR-OvE',
                collections: 1114848,
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {

        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //your user id
            author: '65341322e09609312f2fa4d7',
            // image: await seedImg(),
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi libero maiores? Ad consequuntur dicta dolorem eos, facilis in incidunt iste nostrum nulla officia perspiciatis provident sint sit unde vel.',
            price,
            geolocation: {
                type: 'Point',
                coordinates: [-122.330062, 47.603832]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djqbbytic/image/upload/v1698001633/TrekZen/sf9e7kzrlkxk18agyhya.jpg',
                    filename: 'TrekZen/sf9e7kzrlkxk18agyhya',
                },
                {
                    url: 'https://res.cloudinary.com/djqbbytic/image/upload/v1698001634/TrekZen/rsw3q8amz9j3nttexaap.jpg',
                    filename: 'TrekZen/rsw3q8amz9j3nttexaap',
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});