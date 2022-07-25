//routes are the pathway were the controller actions will be effected. That is where the corresponding action the user takes will show. This is the job events route
const express = require('express')
const router = express.Router()

const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobs')

//actions that follow the same routes are combined
router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router