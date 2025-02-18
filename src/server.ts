import 'dotenv/config';
import app from './app';
import { connectDB } from './config/database';
import { PORT } from './constants/env';

app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
