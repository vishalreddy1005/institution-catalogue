import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            const client = await MongoClient.connect(process.env.MONGO_URI);
            const db = client.db(process.env.DB_NAME);

            const user = await db.collection('users').findOne({ email });
            if (!user) {
                client.close();
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            client.close();

            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ error: 'Database connection failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
