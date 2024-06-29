import express from 'express';
import dotnev from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js'; 
import userRoute from './routes/userRoutes.js';
import contactRoute from './routes/contactRoutes.js';
import locationRoute from './routes/locationRoutes.js';
import salaryRoute from './routes/salaryRoutes.js';
import experienceRoute from './routes/experienceRoutes.js';
import categorieRoute from './routes/categorieRoutes.js';
import jobRoute from './routes/jobRoutes.js';
import cookieParser from 'cookie-parser';
const app = express();
dotnev.config();

//mongo connect
connectDb();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:"https://ghkgfj-bob08t7o5-tapader13s-projects.vercel.app/",
    exposedHeaders: ['total'],
  })
);

//api
app.use('/api', userRoute);
app.use('/contact', contactRoute);
app.use('/location', locationRoute);
app.use('/salary', salaryRoute);
app.use('/experience', experienceRoute);
app.use('/categorie', categorieRoute);
app.use('/job', jobRoute);

//default routes
app.get('/', (req, res) => {
  res.send('server work fine');
});
//error handler
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`server start at ${process.env.PORT}`)
);
