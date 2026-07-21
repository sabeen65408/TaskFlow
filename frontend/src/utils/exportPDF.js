import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportTasksPDF = (tasks) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("TaskFlow Project Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Title", "Priority", "Assigned", "Status", "Due Date"]],
    body: tasks.map(task => [
      task.title,
      task.priority,
      task.assignedTo?.name || "Unassigned",
      task.column,
      task.dueDate
        ? new Date(task.dueDate).toLocaleDateString()
        : "-"
    ])
  });

  doc.save("TaskFlow_Report.pdf");
};