const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Patient = require('../../models/Patient');
const User = require('../../models/User');


// @route    POST api/patients
// @desc     Create a patient
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('mobile', 'Mobile is required').not().isEmpty(),
            check('age', 'Age is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            name,
            mobile,
            age,
            gender,
            speciality,
            hospital,
            doctor,
            date,
            nationality
        } = req.body;

        //Build Patients object
        const patientField = {};
        patientField.user = req.user.id;
        // if(req.hospital.id) patientField.hospital = req.hospital.id;
        if (name) patientField.name = name;
        if (mobile) patientField.mobile = mobile;
        if (age) patientField.age = age;
        if (gender) patientField.gender = gender;
        if (speciality) patientField.speciality = speciality;
        if (hospital) patientField.hospital = hospital;
        if (doctor) patientField.doctor = doctor;
        if (date) patientField.date = date;
        if (nationality) patientField.nationality = nationality;

        try {
              const newPatient = new Patient(patientField);
              const patient = await newPatient.save();
              res.json(patient);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
    });

// @route    GET api/patients
// @desc     Get all patients
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
      const patients = await Patient.find().sort({ date: -1 });
      res.json(patients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/patients/me
// @desc     Get all patients for the user
// @access   Private
router.get('/me', auth, async (req, res) => {
    console.log(req.user.id);
    try {
      const patients = await Patient.find({ user: req.user.id }).sort({ date: -1 });
      res.json(patients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route    GET api/patients/:id
// @desc     Get patients by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);

      if (!patient) {
        return res.status(404).json({ msg: 'Patient not found' });
      }

      res.json(patient);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Patient not found' });
      }
      res.status(500).send('Server Error');
    }
});

// @route    DELETE api/patients/:id
// @desc     Delete a patient
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);

      if (!patient) {
        return res.status(404).json({ msg: 'Patient not found' });
      }

      // Check user
      if (patient.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      await patient.remove();

      res.json({ msg: 'Patient removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Patient not found' });
      }
      res.status(500).send('Server Error');
    }
});

// @route    PUT api/patients/:id
// @desc     Update a patient
// @access   Private

router.put('/:id', auth, async (req, res) => {
    const {
        name,
        mobile,
        age,
        gender,
        speciality,
        hospital,
        doctor,
        date,
        nationality,
        patientstatus
    } = req.body;

    //Build Patients object
    const patientField = {};
    if (name) patientField.name = name;
    if (mobile) patientField.mobile = mobile;
    if (age) patientField.age = age;
    if (gender) patientField.gender = gender;
    if (speciality) patientField.speciality = speciality;
    if (hospital) patientField.hospital = hospital;
    if (doctor) patientField.doctor = doctor;
    if (date) patientField.date = date;
    if (nationality) patientField.nationality = nationality;
    if (patientstatus) patientField.patientstatus = patientstatus;
    try {
    let patient = await Patient.findOneAndUpdate(
        { _id: req.params.id },
        { $set: patientField },
        { new: true, upsert: true }
      );
      res.json(patient);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;