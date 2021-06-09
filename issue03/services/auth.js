const { JsonWebTokenError } = require('jsonwebtoken');
const UserRepository = require('../integration/UserRepository');


exports.authenticate = (loginObject) => {
    const user = UserRepository.getUserByUsername(loginObject.username); // throws if user does not exists.
    if (user.password === loginObject.password) {// use bycript
        return JWT.sign({ name: user.name }, process.env.SECRET);
    }
    throw Error('Not authenticated');
}