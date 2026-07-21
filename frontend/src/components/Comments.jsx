import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getComments,
    addComment
} from "../services/commentService";

function Comments({ taskId }) {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {

        loadComments();

    }, [taskId]);

    const loadComments = async () => {

        try {

            const data = await getComments(taskId);

            setComments(data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleAdd = async () => {

    if (!text.trim()) return;

    try {

        await addComment({

            task: taskId,

            text

        });

        toast.success("Comment Added");

        setText("");

        loadComments();

    }

    catch (err) {

        toast.error("Unable to add comment");

    }

};

    return (

<div
style={{
marginTop:"30px",
borderTop:"1px solid #e5e7eb",
paddingTop:"20px"
}}
>

<h3
style={{
marginBottom:"18px",
fontSize:"18px",
fontWeight:"600"
}}
>
💬 Comments
</h3>

<div
style={{
maxHeight:"220px",
overflowY:"auto",
marginBottom:"20px",
paddingRight:"8px"
}}
>

{

comments.length===0 ?

(

<p
style={{
color:"#9ca3af",
textAlign:"center"
}}
>
No comments yet.
</p>

)

:

comments.map(comment=>(

<div

key={comment._id}

style={{

background:"#f8fafc",

border:"1px solid #e5e7eb",

borderRadius:"12px",

padding:"12px",

marginBottom:"12px"

}}

>

<div

style={{

display:"flex",

justifyContent:"space-between",

marginBottom:"8px"

}}

>

<b
style={{
color:"#4f46e5"
}}
>

{comment.user.name}

</b>

<span
style={{
fontSize:"12px",
color:"#9ca3af"
}}
>

{

new Date(comment.createdAt)
.toLocaleString()

}

</span>

</div>

<p
style={{
margin:0,
color:"#374151"
}}
>

{comment.text}

</p>

</div>

))

}

</div>

<div
style={{
display:"flex",
gap:"10px"
}}
>

<input

type="text"

placeholder="Write a comment..."

value={text}

onChange={(e)=>setText(e.target.value)}

style={{

flex:1,

padding:"12px",

borderRadius:"10px",

border:"1px solid #d1d5db",

outline:"none"

}}

/>

<button

onClick={handleAdd}

style={{

background:"#4f46e5",

color:"white",

border:"none",

padding:"0 22px",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"600"

}}

>

Send

</button>

</div>

</div>

);

}

export default Comments;