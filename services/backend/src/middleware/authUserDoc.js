const Document = require('../models/Document');

const verifyOwner = async (req, res, next) => {
    try {
        const docId = req.params.id;
        const userId = req.user.id;

        const doc = await Document.findOne({ where: { id: docId, user_id: userId } });

        if (!doc) {
            return res.status(403).json({ message: "Not for this user." });
        }

        req.document = doc;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = verifyOwner;
