const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw { name: 'Unauthorized', message: 'Authentication required' };

        const rawToken = authorization.split(' ');
        const tokenType = rawToken[0];
        const tokenValue = rawToken[1];

        if (tokenType !== 'Bearer' || !tokenValue) {
            throw { name: 'Unauthorized', message: 'Authentication required' };
        }

        const result = verifyToken(tokenValue);
        const user = await User.findByPk(result.id);
        if (!user) {
            throw { name: 'Unauthorized', message: 'Authentication required' };
        }

        req.user = {
            id: user.id,
            email: user.email
        }
        next();

    } catch (error) {
        next(error);
    }
}