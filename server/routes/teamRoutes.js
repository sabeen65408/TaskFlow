const router=require("express").Router();

const protect=require("../middleware/authMiddleware");

const{

getMembers,
addMember,
removeMember

}=require("../controllers/teamController");

router.get(
"/:projectId",
protect,
getMembers
);

router.post(
"/:projectId",
protect,
addMember
);

router.delete(
"/:id",
protect,
removeMember
);

module.exports=router;