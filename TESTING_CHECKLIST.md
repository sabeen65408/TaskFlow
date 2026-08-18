# TaskFlow V2 - Testing Checklist

## Backend API Testing

### 1. Authentication & Authorization
- [ ] Admin can login
- [ ] Employee can login
- [ ] Employee cannot access admin endpoints
- [ ] Non-admin gets 403 Forbidden when trying to create employee

### 2. Employee CRUD Operations (Admin Only)
- [ ] POST /api/users/employees - Create employee with new fields
  - Required fields: name, email, phone, password
  - Optional fields: department, designation, joiningDate, status
- [ ] GET /api/users/employees - List all employees
- [ ] GET /api/users/employees/:id - Get employee details with workload
- [ ] PUT /api/users/employees/:id - Update employee including new fields
- [ ] DELETE /api/users/employees/:id - Delete employee

### 3. Department Management (Admin Only)
- [ ] POST /api/departments - Create department
- [ ] GET /api/departments - List all departments
- [ ] GET /api/departments/:id - Get single department
- [ ] PUT /api/departments/:id - Update department
- [ ] DELETE /api/departments/:id - Delete department (should fail if employees assigned)
- [ ] GET /api/departments/:id/employees - Get employees in department

### 4. Employee Fields
- [ ] department field stored correctly in User model
- [ ] designation field stored correctly
- [ ] joiningDate field stored and formatted correctly
- [ ] status field accepts only: Active, Inactive, On Leave, Suspended
- [ ] All new fields have proper defaults

## Frontend Testing

### 1. Employee Management Page
- [ ] Admin can access /employees page
- [ ] Employee cannot access /employees page (should redirect)
- [ ] List shows all employees
- [ ] Search/filter works
- [ ] Add Employee button opens modal

### 2. Employee Modal
- [ ] Create mode shows all fields
  - Full Name, Email, Phone, Password (required)
  - Designation, Department, Joining Date, Status (optional)
- [ ] Edit mode shows all fields
  - Password field hidden
  - All fields can be updated
- [ ] Department dropdown populated from API
- [ ] Status dropdown has correct options
- [ ] Joining Date uses date picker
- [ ] Form validation works
- [ ] Create/Update buttons work

### 3. Employee Drawer (Detail View)
- [ ] Click employee row to open drawer
- [ ] Shows employee name and basic info
- [ ] Shows status badge with color coding
  - Green: Active
  - Gray: Inactive
  - Yellow: On Leave
  - Red: Suspended
- [ ] Shows designation
- [ ] Shows department name
- [ ] Shows joining date
- [ ] Shows task workload and statistics
- [ ] Shows recent activities

### 4. Authentication/Login
- [ ] Admin login works
- [ ] Employee login works
- [ ] Redirects to correct dashboard (admin vs employee)
- [ ] Token stored correctly
- [ ] Role stored correctly

### 5. Existing Features (Regression Testing)
- [ ] Project creation still works
- [ ] Project deletion still works
- [ ] Task creation still works
- [ ] Kanban drag-and-drop still works
- [ ] Task assignment still works
- [ ] Comments still work
- [ ] Attachments still work
- [ ] Dashboard statistics display correctly
- [ ] Recent activity tracking works
- [ ] Calendar view works
- [ ] Employee dashboard shows assigned tasks

### 6. UI/Responsiveness
- [ ] Modal displays properly on desktop
- [ ] Modal responsive on tablet/mobile
- [ ] Drawer opens/closes smoothly
- [ ] Colors match existing TaskFlow design
- [ ] Icons consistent with existing style
- [ ] No layout breaks

## API Testing with Postman/cURL

### Test Sequence

1. **Login as Admin**
```
POST /api/auth/login
{
  "emailOrPhone": "admin@example.com",
  "password": "admin123"
}
Response: { token, role, name, ... }
```

2. **Create Department**
```
POST /api/departments
Authorization: Bearer {token}
{
  "name": "Development",
  "description": "Software Development Team"
}
Response: { _id, name, description, timestamps }
```

3. **Create Employee with Department**
```
POST /api/users/employees
Authorization: Bearer {token}
{
  "name": "John Developer",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "pass123",
  "department": "{departmentId}",
  "designation": "Senior Developer",
  "joiningDate": "2024-01-15",
  "status": "Active"
}
Response: { _id, name, email, phone, department, designation, joiningDate, status }
```

4. **Get Employee Details**
```
GET /api/users/employees/{employeeId}
Authorization: Bearer {token}
Response: {
  employee: { all fields },
  totalTasks: number,
  completedTasks: number,
  pendingTasks: number,
  tasks: [],
  activities: []
}
```

5. **Update Employee**
```
PUT /api/users/employees/{employeeId}
Authorization: Bearer {token}
{
  "name": "John Senior Developer",
  "designation": "Principal Developer",
  "status": "On Leave"
}
Response: { updated employee data }
```

6. **Get Department Employees**
```
GET /api/departments/{departmentId}/employees
Authorization: Bearer {token}
Response: {
  department: {},
  employees: [],
  count: number
}
```

7. **Test Unauthorized Access (Employee User)**
```
POST /api/users/employees (with employee token)
Response: 403 Forbidden - "Access denied. Admin privileges required."
```

## Data Integrity Tests

- [ ] No duplicate emails or phone numbers allowed
- [ ] Department references valid in employees
- [ ] Task counts accurate for each employee
- [ ] Activity history tracks employee actions
- [ ] Deleted employee cannot be accessed
- [ ] Department cannot be deleted if employees assigned

## Security Tests

- [ ] Employee token cannot create/update/delete employees
- [ ] Employee token cannot manage departments
- [ ] Admin token can do all operations
- [ ] Invalid tokens rejected
- [ ] Passwords never exposed in API responses
- [ ] Unauthorized access returns 403, not 401

## Browser Console Checks

- [ ] No JavaScript errors
- [ ] No console warnings
- [ ] API calls show correct headers (Authorization)
- [ ] API responses contain expected data
- [ ] Departments dropdown loads correctly

---

**Test Status**: Ready to execute
**Date**: 2026-08-14
**Version**: TaskFlow V2 - Employee Management (Phase 1)
