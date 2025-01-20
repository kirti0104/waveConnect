import express from 'express';
import http from 'http';
import cors from 'cors';
import sequelize from './config/db';
import router from './routers/authRoutes';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());

app.use('/app', router);



const port = process.env.PORT || 8080;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

syncDatabase();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
