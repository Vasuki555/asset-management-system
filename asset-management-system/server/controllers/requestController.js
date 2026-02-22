import Request from '../models/Request.js';
import Asset from '../models/Asset.js';

// @desc    Create asset request
// @route   POST /api/requests
// @access  Private
export const createRequest = async (req, res) => {
  try {
    const { assetId, remarks } = req.body;

    // Check if asset exists and is available
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    if (asset.status !== 'Available') {
      return res.status(400).json({ message: 'Asset is not available' });
    }

    const request = await Request.create({
      userId: req.user._id,
      assetId,
      remarks
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all requests (Admin)
// @route   GET /api/requests
// @access  Private/Admin
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('userId', 'name email department')
      .populate('assetId', 'assetId name category')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user requests
// @route   GET /api/requests/my-requests
// @access  Private
export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user._id })
      .populate('assetId', 'assetId name category status')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve request and assign asset
// @route   PUT /api/requests/:id/approve
// @access  Private/Admin
export const approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update asset status and assign to user
    await Asset.findByIdAndUpdate(request.assetId, {
      status: 'Assigned',
      assignedTo: request.userId
    });

    // Update request status
    request.status = 'Approved';
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject request
// @route   PUT /api/requests/:id/reject
// @access  Private/Admin
export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'Rejected';
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Return asset
// @route   PUT /api/requests/:id/return
// @access  Private
export const returnAsset = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update asset status
    await Asset.findByIdAndUpdate(request.assetId, {
      status: 'Available',
      assignedTo: null
    });

    // Update request
    request.status = 'Returned';
    request.returnDate = Date.now();
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
