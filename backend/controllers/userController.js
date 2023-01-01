const mongoose = require('mongoose');
const Users = require('../models/user');



module.exports = {

  createUser: async function (data) {
    const create = await Users.create({ name: data.name, age: data.age, hobbies: data.hobbies });
    console.log('createUser')
    return create;
  }


}