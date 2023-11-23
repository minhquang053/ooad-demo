const User = require('./users.mongo');
const { getHashedPassword } = require('../services/bcrypt');

const DEFAULT_USER_ID = 0;

async function getAllUsers(role, location) {
    return await User
        .find({ isAdmin: false });
};

async function getUserById(userId) {
    return await User
        .findOne({ userId: userId })
}

async function getUserByEmail(email) {
    return await User
        .findOne({ "email": email })
}

async function getLatestUserId() {
    const latestUser = await User
        .findOne()
        .sort('-userId');
    if (!latestUser) {
        return DEFAULT_USER_ID;
    }

    return latestUser.userId;
}

async function editUser(user) {
    const oldUser = await getUserById(user.id);
    if (!oldUser) {
        return null;
    }
    console.log("HERE");
    oldUser.name = user.name;
    oldUser.email = user.email;
    oldUser.phone = user.phone;
    oldUser.intro = user.introduction;
    oldUser.save();
    return oldUser;
}

async function saveUser(user) {
    await User.create(user);
}

async function createNewUser(user) {
    const existedUser = await User.findOne({ 'email': `${user.email}` });
    if (existedUser) {
        throw new Error(`The email ${existedUser.email} has already been used for other account`);
    }
    const now = new Date().toLocaleString(); 
    const newUserId = await getLatestUserId() + 1; 
    const newUser = Object.assign(user, {
        userId: newUserId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        intro: user.introduction,
        isAdmin: false,
        createdAt: now,
        password: await getHashedPassword(user.password),
    })
    await saveUser(newUser);
}

async function deleteUserById(userId) {

}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createNewUser,
    editUser,
    deleteUserById,
}