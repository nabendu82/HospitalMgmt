const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Employee = require('../../models/Employee');
const User = require('../../models/User');

// @route    GET api/employees/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Employee.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar', 'email']
      );

      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    POST api/employees
// @desc     Create or update user profile
// @access   Private
router.post(
    '/',
    [
      auth, [check('mobile', 'Mobile is required').not().isEmpty()]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { mobile, role } = req.body;

      // Build profile object
      const profileFields = {};
      profileFields.user = req.user.id;
      if (mobile) profileFields.mobile = mobile;
      if (role) profileFields.role = role;

      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Employee.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route    GET api/employees
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
      const profiles = await Employee.find().populate('user', ['name', 'avatar', 'email']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/employees/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
      const profile = await Employee.findOne({
        user: req.params.user_id
      }).populate('user', ['name', 'avatar', 'email']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found' });
      }
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/employees
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
      // Remove profile
      await Employee.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;