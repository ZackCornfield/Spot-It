const express = require('express');
const app = express();  

const path = require('path');
const coookieParser = require('cookie-parser'); 
const logger = require('morgan');   
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');   
const prisma = new PrismaClient();  

const indexRouter = require('./routes/index');
const gameRouter = require('./routes/game');    

app.use(cors());
app.use(logger("dev"));     
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(coookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/game', gameRouter);

// error handler
app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    res.status(err.status || 500);
    res.json({ error: err.message });
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });