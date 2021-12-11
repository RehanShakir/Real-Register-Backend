import express from "express";
import multer from "multer";
const router = express.Router();
import fs from "fs";
import { promisify } from "util";
import PropertyRecordModel from "../../models/PropertyRecord.js";
import { uploadFile, getFileStream } from "../../utils/s3.js";
const upload = multer({ dest: "uploads/" });
const unLinkFile = promisify(fs.unlink);

router.get("/getRecords", async (req, res) => {
  let records = await PropertyRecordModel.find();
  return res.json({ Records: records });
});
//Get All Records of One Clinent
router.get("/getRecord/:id", async (req, res) => {
  let record = await PropertyRecordModel.find({ clientID: req.params.id });
  return res.json({ Record: record });
});

//Get One Records
router.get("/getOneRecord/:id", async (req, res) => {
  let record = await PropertyRecordModel.findById({ _id: req.params.id });
  return res.json({ Record: record });
});

router.post("/addRecord", upload.array("Documents"), async (req, res) => {
  const file = req.files;
  console.log(file);
  let {
    clientID,
    type,
    societyName,
    plotNo,
    block,
    size,
    price,
    remarks,
    clientName,
    Photo,
  } = req.body;

  let imageURLs = [];

  console.log("clientID");

  for (let i = 0; i < file.length; i++) {
    const result = await uploadFile(file[i]);
    imageURLs.push(
      `${req.protocol}://${req.get("host")}/api/clients/images/${result.key}`
    );

    await unLinkFile(file[i].path);
  }

  console.log(imageURLs);
  // let record = PropertyRecordModel.findOne({ plotNo });
  //   const imageURL = `${req.protocol}://${req.get("host")}/api/clients/images/${
  //     result.key
  //   }`;

  let record = new PropertyRecordModel({
    clientID,
    type,
    societyName,
    plotNo,
    block,
    size,
    price,
    documents: imageURLs,
    remarks,
    clientName,
    Photo,
  });

  await record.save();
  return res.status(200).json({ Msg: "Data Saved" });
});

//Delete a Record

router.delete("/deleteRecord/:id", async (req, res) => {
  try {
    let record = await PropertyRecordModel.findByIdAndDelete(req.params.id);
    return res.json({ Message: "Deleted" });
  } catch (err) {
    console.log(err);
  }
});

//Update Details
router.put("/updateDetails/:id", async (req, res) => {
  console.log("put");
  console.log(req.params.id);
  console.log(req.body.details);
  try {
    let details = await PropertyRecordModel.findByIdAndUpdate(req.params.id, {
      $push: { details: req.body.details },
    });
    await details.save();
    return res.send("Details saved");
  } catch (err) {
    console.log(err);
  }
});

export default router;
