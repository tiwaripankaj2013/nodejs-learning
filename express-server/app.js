const { fail } = require("assert");
const express = require("express");
const fs = require("fs");
const morgan = require('morgan');
const mongoose = require('mongoose')
const connectDB = require('./server')

const app = express();
connectDB()
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use((req,res,next)=>{
    console.log('Hellow working as a middleware');
    next();
});

/* app.get('/', (req, res) => {
    res.status(200)
    .json({ message: "Welcome" });
})

app.get('/users', (req, res) => {
    res.json({ message: "users" })
})

app.post('/users/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    res.json({ body, id })
}) */
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`));
const getAllTours = (req, res) => {
    res.status(200).json({
      status: "sucess",
      results: tours.length,
      data: {
        tours,
      },
    });
  }

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id == id);
  
 if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  
    res.status(200).json({
      status: "sucess",
    });
  };
const addTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data.json`,
      JSON.stringify(tours),
      (error) => {
        res.status(201).json({
          status: "success",
          data: {
            tour: newTour,
          },
        });
      }
    );
  }; 
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        tour: "<Updated tour here ...>",
      },
    });
  }
const deleteTour =  (req, res) => {
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        tour: "<data deleted ...>",
      },
    });
  };

app
.route("/api/v1/tours")
.get(getAllTours)
.post(addTour);

app
.route("/api/v1/tours/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

const port = 5000;
app.listen(port, () => console.log(`app runing on port ${port}`));
