

module.exports = async (req, res, next) => {
    try {
        const { username, password } = await req.body
        if (!username || !password) {
            next({ message: 'username and password required' })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}