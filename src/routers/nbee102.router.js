const { Router } = require('express')
const paginate = require('../services/paginate.service')
const User = require('../models/user.model')
const Users_Nbee102 = require('../models/nbee102.model')


const router = new Router()

const serializer = (user) => {
  return user.toObject({ versionKey: false })
}


router.get('/', async (req, res) => {
  const users = await paginate(Users_Nbee102.find({}), req)
  res.send(users.map(serializer))
})


router.get('/test', async (req, res) => {
    res.send("test")
  })

router.post('/', async (req, res) => {
  const user = await new Users_Nbee102(req.body.user).save()
  res.send(serializer(user))
})

module.exports = router
