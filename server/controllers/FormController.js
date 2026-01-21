// Membuat form submission (peminjaman mobil)
const { Form, Car, User } = require('../models');

module.exports = class FormController{
    static async createForm(req, res, next) {
        try {
            const userId = req.user.id;
            const { carId, borrowDate, returnDate } = req.body;

            // Cek ketersediaan mobil
            const car = await Car.findByPk(carId);
            if (!car) {
                throw { name: 'NotFound', message: 'Car not found' };
            }
            if (car.status !== 'Available') {
                throw { name: 'Conflict', message: 'Car is not available for borrowing' };
            }

            // Cek apakah tanggal peminjaman valid
            const now = new Date();
            const borrow = new Date(borrowDate);
            const returnD = new Date(returnDate);
            if (borrow < now) {
                throw { name: 'BadRequest', message: 'Borrow date must be in the future' };
            }
            if (returnD <= borrow) {
                throw { name: 'BadRequest', message: 'Return date must be after borrow date' };
            }
            // Buat form peminjaman
            const form = await Form.create({
                userId,
                carId,
                borrowDate,
                returnDate,
                status: 'Pending'
            });
            res.status(201).json(form);

        } catch (error) {
            console.log(error);
            
            next(error);
        }
    }

    // Untuk admin: Melihat semua form peminjaman
    static async listForms(req, res, next) {
        try {
            const forms = await Form.findAll({
                include: [Car, User]
            });
            res.json(forms);
        } catch (error) {
            next(error);
        }
    } 

    // Untuk user: Melihat form peminjaman miliknya sendiri
    static async listUserForms(req, res, next) {
        try {
            const userId = req.user.id;
            const forms = await Form.findAll({
                where: { userId },
                include: [Car]
            });
            res.json(forms);
        } catch (error) {
            next(error);
        }
    }

}