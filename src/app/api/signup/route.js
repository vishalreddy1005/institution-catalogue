import { connectMongo } from "@/libs/mongodb";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const client = await MongoClient.connect(process.env.MONGO_URI);
            const db = client.db(process.env.DB_NAME);

            const existingUser = await db.collection('users').findOne({ email });
            if (existingUser) {
                client.close();
                return res.status(400).json({ error: 'User already exists' });
            }

            await db.collection('users').insertOne({ name, email, password: hashedPassword });
            client.close();

            res.status(201).json({ success: true });
        } catch (err) {
            res.status(500).json({ error: 'Database connection failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
