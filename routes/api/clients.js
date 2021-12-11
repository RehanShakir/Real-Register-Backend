import express from "express";
import multer from "multer";
const router = express.Router();
import fs from "fs";
import { promisify } from "util";
import ClientModel from "../../models/Client.js";
import { uploadFile, getFileStream } from "../../utils/s3.js";
const upload = multer({ dest: "uploads/" });

const unLinkFile = promisify(fs.unlink);

//get all clients
router.get("/getClients", async (req, res) => {
  let clients = await ClientModel.find();
  return res.json({ clients: clients });
});
//get one client
router.get("/getClient/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let client = await ClientModel.findById(req.params.id);
    return res.json({ client: client });
  } catch (err) {
    console.error(err);
  }
});

router.get("/images/:key", (req, res) => {
  try {
    const key = req.params.key;

    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
  }
});
router.post("/addClient", upload.single("Photo"), async (req, res) => {
  try {
    const file1 = req.file;

    // console.log("file1");
    // console.log(file1);
    let {
      Name,
      NIC,
      PhoneNumber,
      BankAccountNo,
      NomineeName,
      BusinessName,
      Address,
    } = req.body;
    // console.log(Name);
    console.log(Name);

    let client = await ClientModel.findOne({ NIC });

    if (client) {
      return res
        .status(400)
        .json({ message: "Client Already in the Database" });
    }

    // if (!Name || !NIC || !PhoneNumber) {
    //   return res
    //     .status(404)
    //     .json({ message: "Name, NIC And Phone Must Be Provided" });
    // }
    const result = await uploadFile(file1);

    console.log("result");
    console.log(result);

    const imageURL = `${req.protocol}://${req.get("host")}/api/clients/images/${
      result.key
    }`;
    await unLinkFile(file1.path);

    let clientData = new ClientModel();
    clientData.Name = Name;
    clientData.NIC = NIC;
    clientData.PhoneNumber = PhoneNumber;
    clientData.BankAccountNo = BankAccountNo;
    clientData.NomineeName = NomineeName;
    clientData.BusinessName = BusinessName;
    clientData.Address = Address;
    clientData.Photo = imageURL;

    await clientData.save();

    return res.json({ message: "Data Saved" });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteClient/:id", async (req, res) => {
  try {
    let client = await ClientModel.findByIdAndDelete(req.params.id);
    return res.json({ Message: "Deleted" });
  } catch (err) {
    console.log(err);
  }
});

export default router;
