const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const User = require("../models/user.model");
const Course = require("../models/course.model");
const Nbee102 = require("../models/nbee102.model");
const test = require("./mailer.router")



const mongoose = require("mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  // resources: [Course],
  rootPath: "/admin",
  logoutPath: "/admin/exit",
  branding: {
    companyName: "Nutrition Bee",
    logo: "https://course.nutritionbee.net/mainlogo.png",
    softwareBrothers: false,
  },
});

const ADMIN = {
  email: "kar.suvra@gmail.com",
  password: "suvra",
  // email: process.env.ADMIN_EMAIL || 'kar.suvra@gmail.com',
  // password: process.env.ADMIN_PASSWORD || 'suvra',
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
  cookiePassword:
    process.env.ADMIN_COOKIE_PASS ||
    "supersecret-and-long-password-for-a-cookie-in-the-browser",
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
});

module.exports = router;
