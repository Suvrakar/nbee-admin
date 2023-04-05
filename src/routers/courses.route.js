const { Router } = require('express')
const paginate = require('../services/paginate.service')
const User = require('../models/user.model')
const Courses = require('../models/course.model')


const router = new Router()

const serializer = (user) => {
  return user.toObject({ versionKey: false })
}


router.get('/', async (req, res) => {
  const users = await paginate(Courses.find({}), req)
  res.send(users.map(serializer))
})

router.post('/', async (req, res) => {
  const user = await new Courses(req.body.user).save()
  res.send(serializer(user))
})

module.exports = router
