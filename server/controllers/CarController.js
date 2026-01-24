const { Car } = require('../models')
const { Op } = require('sequelize')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

module.exports = class CarController {
    static async listCars(req, res, next) {
        try {
            const { search, status } = req.query
            const whereClause = {}

            if (search) {
                whereClause[Op.or] = [
                    { brand: { [Op.iLike]: `%${search}%` } },
                    { model: { [Op.iLike]: `%${search}%` } },
                    { color: { [Op.iLike]: `%${search}%` } }
                ]
            }
            if (status) {
                whereClause.status = status
            }

            const cars = await Car.findAll(
                {
                    where: whereClause,
                    order: [['id', 'ASC']]
                }
            )
            res.json(cars)

        } catch (error) {
            next(error);
        }
    }

    static async insightsCars(req, res, next) {
        try {
            const carId = req.params.id
            const car = await Car.findByPk(carId)

            if (!car) {
                throw { name: 'NotFound', message: 'Car not found' }
            }

            const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

            const prompt = `Berikan insights singkat dan informatif tentang mobil berikut dalam bahasa Indonesia:
            - Merek: ${car.brand}
            - Model: ${car.model}
            - Tahun: ${car.year}
            - Warna: ${car.color}
            
            Berikan informasi dalam format berikut (maksimal 3-4 kalimat):
            1. Keunggulan utama mobil ini
            2. Perkiraan efisiensi bahan bakar
            3. Rekomendasi penggunaan (cocok untuk keluarga/individu/bisnis)
            
            Jawab dengan singkat dan padat.`

            const result = await model.generateContent(prompt);
    
            console.log(result, '<<<<< INSIGHTS RESULT');
            const response = await result.response
            const insights = response.text()

            res.json({
                carId: car.id,
                carInfo: {
                    brand: car.brand,
                    model: car.model,
                    year: car.year,
                    color: car.color
                },
                insights
            })

        } catch (error) {
            console.log(error, '<<<<< INSIGHTS ERROR');
            next(error)
        }
    }

    static async getCarDetails(req, res, next) {
        try {
            const carId = req.params.id;
            const car = await Car.findByPk(carId)
            if (!car) {
                throw { name: 'NotFound', message: 'Car not found' }
            }
            res.json(car)
        } catch (error) {
            next(error)
        }
    }

}