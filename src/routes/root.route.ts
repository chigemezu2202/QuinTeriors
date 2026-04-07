//Hack: Package Imports
import express from "express";

//Hack: Local Imports
import {
    root,
} from "../controllers/root.controller.js";

//Hack: Express Router for Making different End point entry
const router = express.Router();

//TODO: Implementing Root Route
router.get("/", root)

export default router;