module.exports = function adminOnlyMiddleware(req, res, next) {
    try {
        if (req.user.role !== 'Admin') {
            throw { name: "Forbidden", message: "Forbidden Access!"}
        }

        next()
    } catch (error) {
        next(error)
    }

}