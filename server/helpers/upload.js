//Install Cloudinary
const multer = require('multer')
const cloudinary = require('cloudinary').v2

//menyimpan ke memory untuk upload ke 3rd party (cloudinary)
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//set up api key-nya cloudinary & secret
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = upload;