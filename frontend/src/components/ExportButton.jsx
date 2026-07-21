import jsPDF from "jspdf";

function ExportButton({project}){

const exportPDF=()=>{

const doc=new jsPDF();

doc.setFontSize(20);

doc.text(project.title,20,20);

doc.setFontSize(12);

doc.text(project.description,20,40);

doc.save(project.title+".pdf");

};

return(

<button

onClick={exportPDF}

style={{

background:"#16a34a",

color:"white",

padding:"10px 18px",

border:"none",

borderRadius:"8px",

cursor:"pointer"

}}

>

Export PDF

</button>

);

}

export default ExportButton;