const { Car } = require('../models');

module.exports = class CarController {
    static async listCars(req, res, next) {
        try {
            const cars = await Car.findAll();
            res.json(cars);
            
        } catch (error) {
            next(error);
        }
    }

    static async getCarDetails(req, res, next) {
        try {
            const carId = req.params.id;
            const car = await Car.findByPk(carId);
            if (!car) {
                throw { name: 'NotFound', message: 'Car not found' };
            }
            res.json(car);
        } catch (error) {
            next(error);
        }
    }

}