const Document = require('../models/Document');

exports.getDocument = async (req, res) => {
    res.json(req.document);
};

exports.updateDocument = async (req, res) => {
    try {
        const { content, total_time_spent } = req.body;
        console.log('Before update:', req.document.toJSON());
        await req.document.update({ content, total_time_spent });
        console.log('After update:', req.document.toJSON());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
