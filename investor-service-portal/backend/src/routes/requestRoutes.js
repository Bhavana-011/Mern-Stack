const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const {
  createRequest,
  updateStatus,
  uploadDocument,
  getSLADashboard
} = require('../controllers/requestController');


//  Only INVESTOR can create request
router.post('/', auth, role("INVESTOR"), createRequest);


//  Only ADMIN can update
router.put('/:id', auth, role("ADMIN"), updateStatus);


//  Both can upload document
router.post('/upload', auth, uploadDocument);


//  Only ADMIN can view SLA dashboard
router.get('/sla', auth, role("ADMIN"), getSLADashboard);


module.exports = router;