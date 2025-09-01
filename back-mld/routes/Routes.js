const express = require('express');
const router = express.Router();
const {  CreateBook , getBookById} = require("../controllers/book");
const {Contact}=require("../controllers/Contact");

const { CreateUser, verfiTo, loginUser,createU ,getU ,getAUTH} = require("../controllers/Controllers-Usr");

const {getBook , getUser , deleteUser ,getAllBook , countUser ,avtiveBook ,count , deletedAppoinment ,getUserid ,updateAppoinment}=require("../controllers/admin");

router.post("/register", CreateUser); // User registration
router.get('/verify/:token', verfiTo); // Email verification
router.post('/login', loginUser);
router.get('/getBook/:userId', getBookById);
router.post("/create", createU);
router.get("/getU",getU);
router.get("/getAUTH",getAUTH);

router.post("/book", CreateBook);

router.post("/contact",Contact);

router.get('/getBooks/:userId', getBook);
router.get('/getBooks', getUser);
router.delete('/deleteUser/:userId', deleteUser);
router.get('/getAll',getAllBook);
router.get("/getcount",countUser);
router.put('/user/updateStatut/:Id', avtiveBook);
router.get('/countStatus',count);
router.get('/getUserid/:userId',getUserid);


router.delete('/deletedAppoinment/:bookId',deletedAppoinment);
router.put('/updateAppoinment/:bookId/:userId',updateAppoinment)
module.exports=router;