import jwt from 'jsonwebtoken';

export default function tokenHandler(req, res, next) {
	const { authorization } = req.headers;

	try {
		const token = authorization.split(' ')[1];
		jwt.verify(token, 'appsecret');
		next();
	} catch (err) {
		res.status(401).json({ error: 'Your token is either invalid or expired.' });
	}
}
