const { ModelThought, ModelUser } = require('../models');

const controllerThought = {
    // get thoughts
    getAllThoughts(req, res)
    {
        ModelThought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get thought by id
    getOneThought(req, res)
    {
        ModelThought.findOne({ _id: req.params.id })
            .then(thoughtData => res.json(thoughtData))
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // create thought
    createThought(req, res)
    {
        ModelThought.create(req.body)
            .then(({ _id }) =>
            ModelUser.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            )
            .then(userData =>
            {
                res.json(userData);
            })
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // update thought by id
    updateThought(req, res)
    {
        ModelThought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .then(thoughtData =>
            {
                if (!thoughtData)
                {
                    res.status(404).json({ message: 'Thought not found with provided Id' });
                    return;
                }

                res.json(thoughtData)
            })
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // delete thought by id
    deleteThought(req, res)
    {
        ModelThought.findOneAndDelete({ _id: req.params.id })
            .then(thoughtData =>
            {
                ModelUser.findOneAndDelete(
                    { username: thoughtData.username },
                    { $pull: { thoughts: { _id: req.params.id } } }
                )
                res.json(thoughtData)
            })
            .catch(err =>
            {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // create reaction on thought id
    createReaction(req, res)
    {
        ModelThought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            {
                $addToSet: {
                    reactions: req.body
                }
            },
            {
                runValidators: true,
                new: true
            }
        )
            .then(thoughtData =>
            {
                if (!thoughtData)
                {
                    return res.status(404).json({ message: 'Thought not found with provided Id' });
                }

                res.json(thoughtData);
            })
            .catch(err =>
            {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update reaction by id on thought id
    deleteReaction(req, res)
    {
        ModelThought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            {
                $pull: {
                    reactions: {
                        reactionID: req.params.reactionID
                    }
                }
            },
            {
                runValidators: true,
                new: true
            }
        )
            .then(thoughtData =>
            {
                if (!thoughtData)
                {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                res.json(thoughtData);
            })
            .catch(err =>
            {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = controllerThought;