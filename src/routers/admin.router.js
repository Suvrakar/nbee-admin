const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    companyName: 'Nutrition Bee',
  },
})


const ADMIN = {
  email: 'kar.suvra@gmail.com',
  password: 'suvra',
  // email: process.env.ADMIN_EMAIL || 'kar.suvra@gmail.com',
  // password: process.env.ADMIN_PASSWORD || 'suvra',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})

module.exports = router
