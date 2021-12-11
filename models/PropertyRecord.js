import mongoose from "mongoose";

let propertyRecordScehma = mongoose.Schema(
  {
    clientID: {
      type: String,
    },
    type: {
      type: String,
    },
    societyName: {
      type: String,
    },
    plotNo: {
      type: String,
    },
    block: {
      type: String,
    },
    size: {
      type: String,
    },
    price: {
      type: String,
    },
    documents: [
      {
        type: String,
        default: "",
      },
    ],
    details: [
      {
        type: String,
        default: "N/A",
      },
    ],
    clientName: {
      type: String,
    },
    Photo: {
      type: String,
    },
  },
  { timestamps: true }
);

let PropertyRecordModel = new mongoose.model(
  "PropertyRecord",
  propertyRecordScehma
);

export default PropertyRecordModel;
