const express = require('express');
const router = express.Router();
const user_controller = require('../controller/userController');


router.post('/createUser', async (req, res) => {

  const name = req.body.name;
  const age = req.body.age;
  const hobbies = req.body.hobbies
  console.log(req.body)

  try {

    const createUser = await user_controller.createUser({ name: name, age: age, hobbies: hobbies })

    res.json({ data: createUser })
    res.status(200);


  } catch (error) {
    res.status(404);
    console.log(error, 'error from routesPage')

  }


})


module.exports = router;