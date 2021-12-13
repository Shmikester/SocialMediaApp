const { ModelUser, ModelThought } = require('../models');

const controllerUser = {
    // get users
    getAllUsers(req, res)
    {
        ModelUser.find({})
            .populate('thoughts')
            .populate('friends')
            .then(usersData => res.json(usersData))
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get user by id
    getOneUser(req, res)
    {
        ModelUser.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .then(userData => res.json(userData)).catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // create user
    createUser(req, res)
    {
        ModelUser.create(req.body)
            .then(userData => res.json(userData))
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // update user by id
    updateUser(req, res)
    {
        ModelUser.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .then(userData =>
            {
                if (!userData)
                {
                    res.status(400).json({ message: 'User not found with provided Id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // delete user by id
    deleteUser(req, res)
    {
        ModelUser.findOneAndDelete(
            {
                _id: req.params.id
            })
            .then(userData =>
            {
                ModelThought.deleteMany(
                    {
                        _id: {
                            $in: userData.thoughts
                        }
                    }
                ).then(thoughtsData =>
                {
                    // bonus delete thoughts
                    res.json(thoughtsData);
                })
            })
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // add friend by id
    addFriend(req, res)
    {
        ModelUser.findOneAndUpdate(
            { _id: req.params.userID },
            {
                $addToSet: {
                    friends: {
                        _id: req.params.friendID
                    }
                }
            },
            { new: true }
        )
            .then(userData => res.json(userData))
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // delete friend by id
    deleteFriend(req, res)
    {
        ModelUser.findOneAndUpdate(
            { _id: req.params.userID },
            {
                $pull: {
                    friends: req.params.friendID
                }
            }
        )
            .then(userData => res.json(userData))
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    }
};

module.exports = controllerUser;