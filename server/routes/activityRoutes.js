const router = require("express").Router();

const protect = require("../middleware/authMiddleware");

const {

    getActivities

}=require("../controllers/activityController");

router.get(

    "/:projectId",

    protect,

    getActivities

);

module.exports=router;