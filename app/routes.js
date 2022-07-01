const express = require('express')
const router = express.Router()
var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

// Add your routes here - above the module.exports line

// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/juggling-balls-answer', function (req, res) {

    // Make a variable and give it the value from 'how-many-balls'
    var howManyBalls = req.session.data['how-many-balls']

    // Check whether the variable matches a condition
    if (howManyBalls == "3 or more") {
        // Send user to next page
        res.redirect('/juggling-trick')
    } else {
        // Send user to ineligible page
        res.redirect('/ineligible')
    }

})

// router.get('/juggling-trick', function (req, res) {
//     res.render('juggling-trick', { balls: req.session.data["how-many-balls"] })
// })

router.get('/juggling-trick', function (req, res) {
    res.render('juggling-trick', { data: req.session.data })
})

// The URL here needs to match the URL of the page that the user is on
// when they type in their email address
router.post('/email-address-page', function (req, res) {

    notify.sendEmail(
      // this long string is the template ID, copy it from the template
      // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
      // in your code.
      '4d834c8b-d1c0-4634-857d-c19b7f6f7086',
      // `emailAddress` here needs to match the name of the form field in
      // your HTML page
      req.body.emailAddress
    );
  
    // This is the URL the users will be redirected to once the email
    // has been sent
    res.redirect('/confirmation-page');
  
  });

module.exports = router
