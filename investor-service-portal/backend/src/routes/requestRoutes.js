const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const {
  createRequest,
  getAllRequests,
  getMyRequests,
  getRequestById,
  updateStatus,
  uploadDocument,
  getSLADashboard
} = require('../controllers/requestController');


//  INVESTOR → Create Request
router.post('/', auth, role("INVESTOR"), createRequest);

//  ADMIN → SLA Dashboard
router.get('/sla', auth, role("ADMIN"), getSLADashboard);

//  ADMIN → Get All Requests
router.get('/all', auth, role("ADMIN"), getAllRequests);

//  INVESTOR → Get My Requests
router.get('/my', auth, role("INVESTOR"), getMyRequests);

//  Get Single Request
router.get('/:id', auth, getRequestById);

//  ADMIN → Update Request
router.put('/:id', auth, role("ADMIN"), updateStatus);

//  Upload Document
router.post('/upload', auth, uploadDocument);



module.exports = router;
