var express = require('express');
var router = express.Router();              // get an instance of the express Router

//
 router.route('/consultations')

  // create a consultation (accessed at POST http://localhost:8080/api/consultations)
  .post(function(req, res) {

      var consultation = new Consultation();   // create a new instance of the Consultation model
      consultation.description = req.body.description;  // set the consultation description (comes from the request)
      consultation.patientID = req.body.patientID; //pass in id as string eg.JSON in request body = {"description":"TEST2", "patientID": "563a1a850d5fa4860f26d81c"}
      consultation.drID = req.body.drID;

      console.log(consultation);

      // save the consultation and check for errors
      consultation.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Consultation created!' });
      });
  })

  // get all the consultations (accessed at GET http://localhost:8080/api/consultations)
  .get(function(req, res) {
    Consultation.find(function(err, consultations) {
        if (err)
          res.send(err);

        res.json(consultations);
    });
  });

router.route('/consultations/:consultation_id')

  // get the consultation with that id (accessed at GET http://localhost:8080/api/consultations/:consultation_id)
  .get(function(req, res) {
    Consultation.findById(req.params.consultation_id, function(err, consultation) {
      if (err)
        res.send(err);
      res.json(consultation);
    });
  })

  // update the consultation with this id (accessed at PUT http://localhost:8080/api/consultations/:consultation_id)
  .put(function(req, res) {

    // use our consultation model to find the consultation we want
    Consultation.findById(req.params.consultation_id, function(err, consultation) {
      if (err)
        res.send(err);
      consultation.description = req.body.description; //update consultation data
      consultation.patientID = req.body.patientID;
      consultation.drID = req.body.drID;

    // save the consultation
      consultation.save(function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Consultation updated!' });
      });
    });
  })

  // delete the consultation with this id (accessed at DELETE http://localhost:8080/api/consultations/:consultation_id)
  .delete(function(req, res) {

    Consultation.remove({
      _id: req.params.consultation_id
    }, function(err, consultation) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });
