
app.post('/login', [
  // Validate the email address
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  // Validate the password
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .trim()
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Find the user with the matching email address
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(401).send('Email or password is incorrect');
    }
    // Compare the provided password with the hashed password in the database
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!isMatch) {
        return res.status(401).send('Email or password is incorrect');
      }
      // Create a JSON web token
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.send({ auth: true, token });
    });
  });
});