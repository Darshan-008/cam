import express from 'express';
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Add validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // ...existing login logic...
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;