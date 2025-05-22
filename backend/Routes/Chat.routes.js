import express from "express";
import { sendMessage } from "../controllers/Chat.controller.js";

const router = express.Router();

router.post("/send", sendMessage);

export default router;