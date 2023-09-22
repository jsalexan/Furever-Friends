const router = require('express').Router();
const { Profile } = require('../../models');
const withAuth = require('../../utils/auth');

// Get the current user's own profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!profile) {
      res.status(404).json({ message: 'No profile found for the current user!' });
      return;
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific user's profile by ID
router.get('/:id', withAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!profile) {
      res.status(404).json({ message: 'No profile found with this user ID!' });
      return;
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newProfile = await Profile.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProfile);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!profileData) {
      res.status(404).json({ message: 'No profile found with this id!' });
      return;
    }

    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;