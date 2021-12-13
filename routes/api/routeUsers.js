const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/controllerUsers');

// get/create users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// get/update/delete user by id
router.route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// add/delete friend by id on uer id
router.route('/:userID/friends/:friendID')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;