const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Hospital = require('../../models/Hospital');


// @route    POST api/hospitals
// @desc     Create a Hospital
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('mobile', 'Mobile is required').not().isEmpty(),
            check('city', 'City is required').not().isEmpty(),
            check('email', 'Email is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            name,
            area,
            city,
            country,
            mobile,
            email
        } = req.body;

        //Build Hospital object
        const hospitalField = {};
        hospitalField.user = req.user.id;
        if (name) hospitalField.name = name;
        if (area) hospitalField.area = area;
        if (city) hospitalField.city = city;
        if (country) hospitalField.country = country;
        if (mobile) hospitalField.mobile = mobile;
        if (email) hospitalField.email = email;

        try {
              const newHospital = new Hospital(hospitalField);
              const hospital = await newHospital.save();
              res.json(hospital);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
    });

// @route    PUT api/hospitals/:id
// @desc     Update a hospital
// @access   Private

router.put('/:id', auth, async (req, res) => {
    const {
        name,
        area,
        city,
        country,
        mobile,
        email
    } = req.body;

    //Build Hospital object
    const hospitalField = {};
    if (name) hospitalField.name = name;
    if (area) hospitalField.area = area;
    if (city) hospitalField.city = city;
    if (country) hospitalField.country = country;
    if (mobile) hospitalField.mobile = mobile;
    if (email) hospitalField.email = email;
    try {
    let hospital = await Hospital.findOneAndUpdate(
        { _id: req.params.id },
        { $set: hospitalField },
        { new: true, upsert: true }
      );
      res.json(hospital);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/hospitals
// @desc     Get all hospitals
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
      const hospitals = await Hospital.find().sort({ date: -1 });
      res.json(hospitals);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/hospitals/:id
// @desc     Get a hospital by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
      const hospital = await Hospital.findById(req.params.id);

      if (!hospital) {
        return res.status(404).json({ msg: 'Hospital not found' });
      }

      res.json(hospital);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Hospital not found' });
      }
      res.status(500).send('Server Error');
    }
});

// @route    DELETE api/hospitals/:id
// @desc     Delete a hospital
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
      const hospital = await Hospital.findById(req.params.id);

      if (!hospital) {
        return res.status(404).json({ msg: 'Hospital not found' });
      }

      await hospital.remove();

      res.json({ msg: 'Hospital removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Hospital not found' });
      }
      res.status(500).send('Server Error');
    }
});



module.exports = router;