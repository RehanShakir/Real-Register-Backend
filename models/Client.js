import mongoose from "mongoose";

let clientSchema = mongoose.Schema({
  Name: {
    type: String,
  },
  NIC: {
    type: String,
    unique: true,
  },
  PhoneNumber: {
    type: String,
    unique: true,
  },
  BankAccountNo: {
    type: String,
    unique: true,
  },
  NomineeName: {
    type: String,
  },
  BusinessName: {
    type: String,
  },
  Address: {
    type: String,
  },
  Photo: {
    type: String,
  },
});

let ClientModel = new mongoose.model("Client", clientSchema);

export default ClientModel;
