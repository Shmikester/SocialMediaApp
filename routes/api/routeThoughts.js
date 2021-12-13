const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/controllerThoughts');

// get/create thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// get/update/delete thought by id
router.route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// create reaction on thought id
router.route('/:thoughtID/reactions')
    .post(createReaction);

// delete reaction by reaction id on thought id
router.route('/:thoughtID/reactions/:reactionID')
    .delete(deleteReaction);

module.exports = router;