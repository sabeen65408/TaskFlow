const express=require("express");

const router=express.Router();

const protect=require("../middleware/authMiddleware");

const upload=require("../utils/upload");

const{
uploadAttachment,
getAttachments,
deleteAttachment
}=require("../controllers/attachmentController");

router.post(
"/",
protect,
upload.single("file"),
uploadAttachment
);

router.get(
"/:taskId",
protect,
getAttachments
);

router.delete(
    "/:id",
    protect,
    deleteAttachment
);

module.exports=router;