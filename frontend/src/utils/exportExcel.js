import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportTasksExcel = (tasks) => {

    const rows = tasks.map(task => ({
        Title: task.title,
        Priority: task.priority,
        Assigned: task.assignedTo?.name || "Unassigned",
        Status: task.column,
        DueDate: task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "-"
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Tasks"
    );

    const excelBuffer = XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "array"
        }
    );

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    saveAs(file, "TaskFlow_Report.xlsx");
};