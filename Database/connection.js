import mongoose from "mongoose";

// mongoose
//   .connect("mongodb://srv-captain--real-register/mydatabase?authSource=admin", {
//     user: "realRegister",
//     pass: "realRegister",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connected");
//   })
//   .catch((err) => {
//     console.log("Error Connecting to Database");
//     console.log(err);
//   });

mongoose
  .connect(
    "mongodb+srv://rehan:rehan@cluster0.qhfay.mongodb.net/realresgister?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to Database");
    console.log(error.message);
  });
