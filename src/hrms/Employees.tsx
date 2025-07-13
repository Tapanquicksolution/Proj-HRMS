import { useState, useEffect } from 'react';

// Component for displaying employee status with appropriate styling
const EmployeeStatusBadge = ({ status }: { status: string }) => {
  // Helper function to determine badge color class based on status
  const getStatusColorClass = (statusValue: string): string => {
    if (statusValue === 'Active') return 'bg-green-100 text-green-800';
    if (statusValue === 'On Leave') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(status)}`}>
      {status}
    </span>
  );
};

// Mock employee data
const MOCK_EMPLOYEES = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    position: 'Senior Developer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2023-01-15',
    avatar: 'JS'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    position: 'UX Designer',
    department: 'Design',
    status: 'Active',
    joinDate: '2022-11-03',
    avatar: 'MG'
  },
  {
    id: '3',
    name: 'David Johnson',
    email: 'david.johnson@company.com',
    position: 'Product Manager',
    department: 'Product',
    status: 'Active',
    joinDate: '2021-06-22',
    avatar: 'DJ'
  },
  {
    id: '4',
    name: 'Linda Chen',
    email: 'linda.chen@company.com',
    position: 'Marketing Specialist',
    department: 'Marketing',
    status: 'On Leave',
    joinDate: '2022-03-10',
    avatar: 'LC'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@company.com',
    position: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2020-09-15',
    avatar: 'RW'
  },
  {
    id: '6',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@company.com',
    position: 'Financial Analyst',
    department: 'Finance',
    status: 'Active',
    joinDate: '2022-08-04',
    avatar: 'ST'
  },
  {
    id: '7',
    name: 'James Brown',
    email: 'james.brown@company.com',
    position: 'DevOps Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2023-02-01',
    avatar: 'JB'
  },
  {
    id: '8',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    position: 'Customer Success Rep',
    department: 'Customer Support',
    status: 'On Leave',
    joinDate: '2021-11-08',
    avatar: 'ED'
  }
];

function exportToCSV(data: any[], filename: string) {
  if (!data.length) return;
  const csvRows = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
  ];
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function Employees() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '', email: '', position: '', department: '', status: 'Active', joinDate: '', avatar: ''
  });

  const departments = [...new Set(MOCK_EMPLOYEES.map(emp => emp.department))];
  const statuses = [...new Set(MOCK_EMPLOYEES.map(emp => emp.status))];

  // Filter employees based on search term and filters
  useEffect(() => {
    let filtered = [...MOCK_EMPLOYEES];
    
    if (searchTerm) {
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterDepartment) {
      filtered = filtered.filter(emp => emp.department === filterDepartment);
    }
    
    if (filterStatus) {
      filtered = filtered.filter(emp => emp.status === filterStatus);
    }
    
    setEmployees(filtered);
  }, [searchTerm, filterDepartment, filterStatus]);

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.department || !newEmployee.joinDate) return;
    setEmployees(prev => [
      {
        ...newEmployee,
        id: Date.now().toString(),
        avatar: newEmployee.name.split(' ').map(n => n[0]).join('').toUpperCase()
      },
      ...prev
    ]);
    setShowAddModal(false);
    setNewEmployee({ name: '', email: '', position: '', department: '', status: 'Active', joinDate: '', avatar: '' });
  };

  const handleEditEmployee = () => {
    setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? selectedEmployee : emp));
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4 md:mb-0">Employee Directory</h2>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
              onClick={() => setShowAddModal(true)}
            >
              + Add Employee
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              onClick={() => setShowAddModal(true)}
            >
              Quick Add
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
              onClick={() => exportToCSV(employees, 'employees.csv')}
            >
              Export CSV
            </button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, email or position"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              id="department"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium mr-3">
                        {employee.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">                    <EmployeeStatusBadge status={employee.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(employee.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3" onClick={() => { setSelectedEmployee(employee); setShowEditModal(true); }}>Edit</button>
                    <button className="text-red-600 hover:text-red-900 mr-3" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                    <button className="text-gray-600 hover:text-gray-900" onClick={() => { setSelectedEmployee(employee); setShowPreviewModal(true); }}>Preview</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-5">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{employees.length}</span> of <span className="font-medium">{MOCK_EMPLOYEES.length}</span> employees
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-indigo-50 border border-indigo-300 rounded-md text-sm hover:bg-indigo-100">1</button>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">Add Employee</h3>
              <div className="space-y-3">
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Full Name"
                  value={newEmployee.name}
                  onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Position"
                  value={newEmployee.position}
                  onChange={e => setNewEmployee({ ...newEmployee, position: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Department"
                  value={newEmployee.department}
                  onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })}
                />
                <select
                  className="w-full border rounded px-3 py-2"
                  value={newEmployee.status}
                  onChange={e => setNewEmployee({ ...newEmployee, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="date"
                  value={newEmployee.joinDate}
                  onChange={e => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={handleAddEmployee}>Add</button>
              </div>
            </div>
          </div>
        )}
        {/* Edit Employee Modal */}
        {showEditModal && selectedEmployee && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">Edit Employee</h3>
              <div className="space-y-3">
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Full Name"
                  value={selectedEmployee.name}
                  onChange={e => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Email"
                  value={selectedEmployee.email}
                  onChange={e => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Position"
                  value={selectedEmployee.position}
                  onChange={e => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })}
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Department"
                  value={selectedEmployee.department}
                  onChange={e => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}
                />
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedEmployee.status}
                  onChange={e => setSelectedEmployee({ ...selectedEmployee, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="date"
                  value={selectedEmployee.joinDate}
                  onChange={e => setSelectedEmployee({ ...selectedEmployee, joinDate: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={handleEditEmployee}>Save</button>
              </div>
            </div>
          </div>
        )}
        {/* Preview Employee Modal */}
        {showPreviewModal && selectedEmployee && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">Employee Details</h3>
              <div className="space-y-2">
                <div className="flex items-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3 text-lg">
                    {selectedEmployee.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-lg">{selectedEmployee.name}</div>
                    <div className="text-sm text-gray-500">{selectedEmployee.email}</div>
                  </div>
                </div>
                <div className="text-sm"><b>Position:</b> {selectedEmployee.position}</div>
                <div className="text-sm"><b>Department:</b> {selectedEmployee.department}</div>
                <div className="text-sm"><b>Status:</b> {selectedEmployee.status}</div>
                <div className="text-sm"><b>Join Date:</b> {new Date(selectedEmployee.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowPreviewModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
