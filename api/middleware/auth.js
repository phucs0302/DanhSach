
    const jwt = require('jsonwebtoken');
    require('dotenv').config();

    function authMiddleware(req, res, next) {
    const hdr = req.headers.authorization;
    if (!hdr) return res.status(401).json({ error: 'No token' });
    const token = hdr.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // { id, username, role }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    }

    function requireRole(role) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'No user' });
        if (Array.isArray(role)) {
        if (!role.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
        } else {
        if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
    }

    module.exports = { authMiddleware, requireRole };
