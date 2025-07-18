import express from 'express';
import http from 'http';
import cors from 'cors';
import sequelize from './config/db';
import router from './routes/authRoutes';
import dotenv from "dotenv";
import allRoutes from './routes';
dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

app.use('/api', allRoutes);



const port = process.env.PORT || 8080;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log("Database synced successfully");
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

syncDatabase();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
