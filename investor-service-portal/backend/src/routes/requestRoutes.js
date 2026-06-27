const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');

const {
  createRequest,
  updateStatus,
  uploadDocument,
  getSLADashboard
} = require('../controllers/requestController');


//  CREATE REQUEST
router.post('/', auth, createRequest);


//  UPDATE STATUS (ADMIN)
router.put('/:id', auth, updateStatus);


//  UPLOAD DOCUMENT
router.post('/upload', auth, uploadDocument);


//  SLA DASHBOARD
router.get('/sla', auth, getSLADashboard);


module.exports = router;