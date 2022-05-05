const { findBy } = require('../users/users-model')

module.exports = async (req, res, next) => {

    try {
        const [user] = await findBy({ username: req.body.username })
        if (user) {
            next({ message: 'username taken' })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }

}