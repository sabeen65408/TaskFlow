const router=require("express").Router();

const protect=require("../middleware/authMiddleware");

const{

addComment,

getComments

}=require("../controllers/commentController");

router.get("/:taskId",protect,getComments);

router.post("/",protect,addComment);

module.exports=router;