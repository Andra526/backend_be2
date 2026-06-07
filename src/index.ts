import express from "express";
import cors from "cors";
// Tambahkan .js di akhir setiap path import untuk konsistensi
import eventRoutes from "./routes/eventRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import pembicaraRoutes from "./routes/pembicaraRoute.js";
import userRoute from './routes/userRoute.js';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Menambahkan route user
app.use('/events', eventRoutes);
app.use('/categories', categoryRoutes);
app.use('/pembicara', pembicaraRoutes);
app.use('/api/users', userRoute);

app.use('/api', userRoute); // Menambahkan /api sebagai prefix agar rapi

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});