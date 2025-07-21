const User = require('../model/User');

const handleDeleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await User.deleteOne({ name: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: `User ${userId} deleted` });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = { handleDeleteUser };
