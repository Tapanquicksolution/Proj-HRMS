import { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../auth/authSlice';

// Helper function to determine status class
const getStatusClass = (status: string): string => {
  if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
  if (status === 'approved') return 'bg-green-100 text-green-800';
  return 'bg-red-100 text-red-800';
};

// Mock leave data
const MOCK_LEAVE_REQUESTS = [
  {
    id: '1',
    employeeName: 'John Smith',
    employeeEmail: 'john.smith@company.com',
    employeeAvatar: 'JS',
    leaveType: 'Vacation',
    startDate: '2025-06-15',
    endDate: '2025-06-19',
    days: 5,
    reason: 'Annual family trip',
    status: 'pending',
    applied: '2025-05-20'
  },
  {
    id: '2',
    employeeName: 'Maria Garcia',
    employeeEmail: 'maria.garcia@company.com',
    employeeAvatar: 'MG',
    leaveType: 'Sick Leave',
    startDate: '2025-06-12',
    endDate: '2025-06-13',
    days: 2,
    reason: 'Not feeling well',
    status: 'pending',
    applied: '2025-06-11'
  },
  {
    id: '3',
    employeeName: 'David Johnson',
    employeeEmail: 'david.johnson@company.com',
    employeeAvatar: 'DJ',
    leaveType: 'Personal Leave',
    startDate: '2025-06-25',
    endDate: '2025-06-25',
    days: 1,
    reason: 'Doctor appointment',
    status: 'approved',
    applied: '2025-06-10'
  },
  {
    id: '4',
    employeeName: 'Linda Chen',
    employeeEmail: 'linda.chen@company.com',
    employeeAvatar: 'LC',
    leaveType: 'Vacation',
    startDate: '2025-07-05',
    endDate: '2025-07-15',
    days: 11,
    reason: 'Summer vacation',
    status: 'approved',
    applied: '2025-05-15'
  },
  {
    id: '5',
    employeeName: 'James Brown',
    employeeEmail: 'james.brown@company.com',
    employeeAvatar: 'JB',
    leaveType: 'Work from Home',
    startDate: '2025-06-20',
    endDate: '2025-06-20',
    days: 1,
    reason: 'Home repairs',
    status: 'denied',
    applied: '2025-06-18'
  }
];

// Leave balance for current user
const MOCK_LEAVE_BALANCE = {
  vacation: { total: 20, used: 5, pending: 0, available: 15 },
  sick: { total: 10, used: 2, pending: 0, available: 8 },
  personal: { total: 5, used: 1, pending: 0, available: 4 }
};

export default function LeaveManagement() {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'my-leaves', 'apply'
  const [leaveRequests, setLeaveRequests] = useState(MOCK_LEAVE_REQUESTS);
  const [filterStatus, setFilterStatus] = useState('');
  const currentUser = useAppSelector(selectCurrentUser);
  const isHR = currentUser?.role === 'hr' || currentUser?.role === 'admin';

  const [newLeave, setNewLeave] = useState({
    leaveType: 'Vacation',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Filter leave requests based on status
  useEffect(() => {
    if (filterStatus) {
      setLeaveRequests(MOCK_LEAVE_REQUESTS.filter(leave => leave.status === filterStatus));
    } else {
      setLeaveRequests(MOCK_LEAVE_REQUESTS);
    }
  }, [filterStatus]);

  const handleLeaveAction = (id: string, action: 'approve' | 'deny') => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === id ? { ...leave, status: action === 'approve' ? 'approved' : 'denied' } : leave
      )
    );
  };

  const handleNewLeaveChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLeave(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit to an API
    alert('Leave application submitted!');
    setNewLeave({
      leaveType: 'Vacation',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4 md:mb-0">Leave Management</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'requests' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('requests')}
            >
              Leave Requests
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'my-leaves' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('my-leaves')}
            >
              My Leaves
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'apply' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('apply')}
            >
              Apply for Leave
            </button>
          </div>
        </div>
        
        {activeTab === 'requests' && isHR && (
          <>
            {/* Filter bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-48">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status Filter</label>
                <select
                  id="status"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </select>
              </div>
            </div>
            
            {/* Leave requests table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveRequests.map((leave) => (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium mr-3">
                            {leave.employeeAvatar}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{leave.employeeName}</div>
                            <div className="text-sm text-gray-500">{leave.employeeEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{leave.leaveType}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{leave.days} day(s)</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{leave.reason}</td>
                      <td className="px-6 py-4">                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(leave.status)}`}>
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(leave.applied).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        {leave.status === 'pending' && (
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => handleLeaveAction(leave.id, 'approve')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleLeaveAction(leave.id, 'deny')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Deny
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        
        {activeTab === 'my-leaves' && (
          <div className="space-y-6">
            {/* Leave balance cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800">Vacation Leave</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-sm text-blue-600">Available</span>
                    <span className="text-2xl font-bold text-blue-600">{MOCK_LEAVE_BALANCE.vacation.available}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-blue-600">Used</span>
                    <span className="text-2xl font-bold text-blue-600">{MOCK_LEAVE_BALANCE.vacation.used}</span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(MOCK_LEAVE_BALANCE.vacation.used / MOCK_LEAVE_BALANCE.vacation.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-lg font-medium text-green-800">Sick Leave</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-sm text-green-600">Available</span>
                    <span className="text-2xl font-bold text-green-600">{MOCK_LEAVE_BALANCE.sick.available}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-green-600">Used</span>
                    <span className="text-2xl font-bold text-green-600">{MOCK_LEAVE_BALANCE.sick.used}</span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(MOCK_LEAVE_BALANCE.sick.used / MOCK_LEAVE_BALANCE.sick.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="text-lg font-medium text-purple-800">Personal Leave</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-sm text-purple-600">Available</span>
                    <span className="text-2xl font-bold text-purple-600">{MOCK_LEAVE_BALANCE.personal.available}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-purple-600">Used</span>
                    <span className="text-2xl font-bold text-purple-600">{MOCK_LEAVE_BALANCE.personal.used}</span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(MOCK_LEAVE_BALANCE.personal.used / MOCK_LEAVE_BALANCE.personal.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* My leave history */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">My Leave History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Sick Leave</td>
                      <td className="px-6 py-4 text-sm text-gray-500">May 14 - May 15, 2025</td>
                      <td className="px-6 py-4 text-sm text-gray-500">2</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">May 12, 2025</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Vacation</td>
                      <td className="px-6 py-4 text-sm text-gray-500">March 10 - March 15, 2025</td>
                      <td className="px-6 py-4 text-sm text-gray-500">5</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">Feb 15, 2025</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Personal</td>
                      <td className="px-6 py-4 text-sm text-gray-500">Feb 5, 2025</td>
                      <td className="px-6 py-4 text-sm text-gray-500">1</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Denied</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">Feb 3, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'apply' && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Apply for Leave</h3>
            <form onSubmit={handleSubmitLeave} className="space-y-4 max-w-lg">
              <div>
                <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  id="leaveType"
                  name="leaveType"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={newLeave.leaveType}
                  onChange={handleNewLeaveChange}
                  required
                >
                  <option>Vacation</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Work from Home</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newLeave.startDate}
                    onChange={handleNewLeaveChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newLeave.endDate}
                    onChange={handleNewLeaveChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={newLeave.reason}
                  onChange={handleNewLeaveChange}
                  required
                />
              </div>
              
              <div className="pt-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                >
                  Submit Leave Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
