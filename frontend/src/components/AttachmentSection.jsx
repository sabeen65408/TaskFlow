import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  uploadAttachment,
  getAttachments,
  deleteAttachment,
} from "../services/attachmentService";

import {
  FiUpload,
  FiTrash2,
  FiImage,
  FiFile,
  FiFileText,
} from "react-icons/fi";

function AttachmentSection({ taskId }) {

  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, [taskId]);

  const loadFiles = async () => {
    try {
      const data = await getAttachments(taskId);
      setAttachments(data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load attachments");
    }
  };

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setUploading(true);

      await uploadAttachment(taskId, file);

      toast.success("Attachment Uploaded");

      loadFiles();

    } catch (error) {

      console.log(error);

      toast.error("Upload Failed");

    } finally {

      setUploading(false);

      e.target.value = "";

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this attachment?")) return;

    try {

      await deleteAttachment(id);

      toast.success("Attachment Deleted");

      loadFiles();

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }

  };

  const getIcon = (name) => {

    if (/\.(png|jpg|jpeg|gif|webp)$/i.test(name))
      return <FiImage size={22} color="#10b981" />;

    if (/\.pdf$/i.test(name))
      return <FiFileText size={22} color="#dc2626" />;

    return <FiFile size={22} color="#2563eb"/>;
  };

  return (

<div>

<h2
style={{
marginBottom:"20px"
}}
>
📎 Attachments
</h2>

<label
style={{
display:"inline-flex",
alignItems:"center",
gap:"10px",
padding:"10px 18px",
background:"#4f46e5",
color:"white",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"600"
}}
>

<FiUpload/>

{uploading ? "Uploading..." : "Upload File"}

<input
type="file"
hidden
onChange={handleUpload}
/>

</label>

<div
style={{
marginTop:"25px"
}}
>

{

attachments.length===0 ?

<p
style={{
color:"#9ca3af"
}}
>
No attachments available.
</p>

:

attachments.map(file=>(

<div

key={file._id}

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"12px 15px",

marginBottom:"12px",

border:"1px solid #e5e7eb",

borderRadius:"12px",

background:"#f9fafb"

}}

>

<div
style={{
display:"flex",
alignItems:"center",
gap:"12px",
maxWidth:"70%"
}}
>

{getIcon(file.fileName)}

<span
style={{
overflow:"hidden",
textOverflow:"ellipsis",
whiteSpace:"nowrap"
}}
>
{file.fileName}
</span>

</div>

<div
style={{
display:"flex",
alignItems:"center",
gap:"15px"
}}
>

<a

href={`http://localhost:5000/uploads/${file.fileUrl}`}

target="_blank"

rel="noreferrer"

style={{

textDecoration:"none",

color:"#4f46e5",

fontWeight:"600"

}}

>

View

</a>

<FiTrash2

size={18}

color="#ef4444"

style={{

cursor:"pointer"

}}

onClick={()=>handleDelete(file._id)}

/>

</div>

</div>

))

}

</div>

</div>

  );

}

export default AttachmentSection;