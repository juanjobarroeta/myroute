const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Route = require('../models/Route');
const User = require('../models/User');
const crypto = require('crypto');

// @route   POST /api/routes
// @desc    Save a new route
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, origin, destination, waypoints, travelMode, distance, duration, routeData, tags, notes } = req.body;

    const route = await Route.create({
      user: req.user.id,
      name,
      origin,
      destination,
      waypoints: waypoints || [],
      travelMode,
      distance,
      duration,
      routeData,
      tags: tags || [],
      notes
    });

    // Add route to user's savedRoutes
    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedRoutes: route._id }
    });

    res.status(201).json({
      success: true,
      route
    });
  } catch (error) {
    console.error('Save route error:', error);
    res.status(500).json({ error: 'Server error while saving route' });
  }
});

// @route   GET /api/routes
// @desc    Get all routes for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const routes = await Route.find({ user: req.user.id })
      .sort({ lastUsed: -1 });

    res.json({
      success: true,
      count: routes.length,
      routes
    });
  } catch (error) {
    console.error('Get routes error:', error);
    res.status(500).json({ error: 'Server error while fetching routes' });
  }
});

// @route   GET /api/routes/:id
// @desc    Get a specific route
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Check if user owns the route or if it's public
    if (route.user.toString() !== req.user.id && !route.isPublic) {
      return res.status(403).json({ error: 'Not authorized to view this route' });
    }

    // Update lastUsed
    route.lastUsed = Date.now();
    await route.save();

    res.json({
      success: true,
      route
    });
  } catch (error) {
    console.error('Get route error:', error);
    res.status(500).json({ error: 'Server error while fetching route' });
  }
});

// @route   PUT /api/routes/:id
// @desc    Update a route
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Check ownership
    if (route.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this route' });
    }

    route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      route
    });
  } catch (error) {
    console.error('Update route error:', error);
    res.status(500).json({ error: 'Server error while updating route' });
  }
});

// @route   DELETE /api/routes/:id
// @desc    Delete a route
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Check ownership
    if (route.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this route' });
    }

    await route.deleteOne();

    // Remove from user's savedRoutes
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { savedRoutes: route._id }
    });

    res.json({
      success: true,
      message: 'Route deleted'
    });
  } catch (error) {
    console.error('Delete route error:', error);
    res.status(500).json({ error: 'Server error while deleting route' });
  }
});

// @route   POST /api/routes/:id/share
// @desc    Generate shareable link for a route
// @access  Private
router.post('/:id/share', protect, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    // Check ownership
    if (route.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to share this route' });
    }

    // Generate share token if doesn't exist
    if (!route.shareToken) {
      route.shareToken = crypto.randomBytes(16).toString('hex');
      route.isPublic = true;
      await route.save();
    }

    const shareUrl = `${process.env.FRONTEND_URL || 'http://localhost:8000'}/shared/${route.shareToken}`;

    res.json({
      success: true,
      shareUrl,
      shareToken: route.shareToken
    });
  } catch (error) {
    console.error('Share route error:', error);
    res.status(500).json({ error: 'Server error while sharing route' });
  }
});

// @route   GET /api/routes/shared/:token
// @desc    Get a shared route by token
// @access  Public
router.get('/shared/:token', async (req, res) => {
  try {
    const route = await Route.findOne({ shareToken: req.params.token, isPublic: true })
      .populate('user', 'name');

    if (!route) {
      return res.status(404).json({ error: 'Shared route not found or no longer available' });
    }

    res.json({
      success: true,
      route
    });
  } catch (error) {
    console.error('Get shared route error:', error);
    res.status(500).json({ error: 'Server error while fetching shared route' });
  }
});

module.exports = router;

