import { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../auth/authSlice';

// Mock attendance data
const MOCK_ATTENDANCE = [
  {
    id: '1',
    employeeId: '3',
    employeeName: 'John Employee',
    date: '2025-06-10',
    timeIn: '09:05:23',
    timeOut: '17:30:45',
    status: 'present',
    workHours: '8:25'
  },
  {
    id: '2',
    employeeId: '3',
    employeeName: 'John Employee',
    date: '2025-06-09',
    timeIn: '08:58:10',
    timeOut: '17:15:30',
    status: 'present',
    workHours: '8:17'
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'John Employee',
    date: '2025-06-06',
    timeIn: '09:10:05',
    timeOut: '17:05:12',
    status: 'present',
    workHours: '7:55'
  },
  {
    id: '4',
    employeeId: '3',
    employeeName: 'John Employee',
    date: '2025-06-05',
    timeIn: '08:45:33',
    timeOut: '17:30:20',
    status: 'present',
    workHours: '8:45'
  },
  {
    id: '5',
    employeeId: '3',
    employeeName: 'John Employee',
    date: '2025-06-04',
    timeIn: null,
    timeOut: null,
    status: 'absent',
    workHours: '0:00'
  },
  {
    id: '6',
    employeeId: '2',
    employeeName: 'HR Manager',
    date: '2025-06-10',
    timeIn: '08:30:00',
    timeOut: '17:00:00',
    status: 'present',
    workHours: '8:30'
  }
];

// Mock team attendance for managers/HR
const MOCK_TEAM_ATTENDANCE = [
  {
    id: '1',
    employeeId: '3',
    employeeName: 'John Employee',
    employeeAvatar: 'JE',
    department: 'Engineering',
    date: '2025-06-10',
    timeIn: '09:05:23',
    timeOut: '17:30:45',
    status: 'present',
    workHours: '8:25'
  },
  {
    id: '2',
    employeeId: '4',
    employeeName: 'Sarah Wilson',
    employeeAvatar: 'SW',
    department: 'Marketing',
    date: '2025-06-10',
    timeIn: '08:55:10',
    timeOut: '17:15:30',
    status: 'present',
    workHours: '8:20'
  },
  {
    id: '3',
    employeeId: '5',
    employeeName: 'Michael Roberts',
    employeeAvatar: 'MR',
    department: 'Engineering',
    date: '2025-06-10',
    timeIn: null,
    timeOut: null,
    status: 'absent',
    workHours: '0:00'
  },
  {
    id: '4',
    employeeId: '6',
    employeeName: 'Emily Johnson',
    employeeAvatar: 'EJ',
    department: 'Design',
    date: '2025-06-10',
    timeIn: '09:30:33',
    timeOut: '17:45:20',
    status: 'present',
    workHours: '8:15'
  },
  {
    id: '5',
    employeeId: '7',
    employeeName: 'David Brown',
    employeeAvatar: 'DB',
    department: 'Finance',
    date: '2025-06-10',
    timeIn: '08:10:45',
    timeOut: '17:05:12',
    status: 'present',
    workHours: '8:55'
  }
];

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'my-attendance', 'team'
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [myAttendance, setMyAttendance] = useState<typeof MOCK_ATTENDANCE>([]);
  const [teamAttendance, setTeamAttendance] = useState<typeof MOCK_TEAM_ATTENDANCE>([]);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  
  const currentUser = useAppSelector(selectCurrentUser);
  const isHRorManager = currentUser?.role === 'hr' || currentUser?.role === 'admin' || currentUser?.role === 'manager';

  // Filter attendance data based on date and current user
  useEffect(() => {
    // For my attendance, filter by user ID and sort by date (descending)
    const filteredMyAttendance = MOCK_ATTENDANCE
      .filter(record => record.employeeId === currentUser?.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setMyAttendance(filteredMyAttendance);
    
    // For today's check-in status
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = MOCK_ATTENDANCE.find(
      record => record.employeeId === currentUser?.id && record.date === today
    );
    
    if (todayRecord && todayRecord.timeIn) {
      setCheckInTime(todayRecord.timeIn);
    }
    
    // For team attendance (if manager/HR), filter by selected date
    if (isHRorManager) {
      const filteredTeamAttendance = MOCK_TEAM_ATTENDANCE.filter(
        record => record.date === attendanceDate
      );
      setTeamAttendance(filteredTeamAttendance);
    }
  }, [currentUser, attendanceDate]);

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    });
    setCheckInTime(timeString);
    
    // Here you would make an API call to record the check-in
    alert(`Checked in at ${timeString}`);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    });
    
    // Here you would make an API call to record the check-out
    alert(`Checked out at ${timeString}`);
  };

  const getAttendanceStats = () => {
    const total = myAttendance.length;
    const present = myAttendance.filter(record => record.status === 'present').length;
    const absent = myAttendance.filter(record => record.status === 'absent').length;
    const late = myAttendance.filter(
      record => record.status === 'present' && record.timeIn && 
      record.timeIn > '09:00:00'
    ).length;
    
    const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, late, presentPercentage };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4 md:mb-0">Attendance Management</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'overview' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'my-attendance' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('my-attendance')}
            >
              My Attendance
            </button>
            {isHRorManager && (
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'team' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('team')}
              >
                Team Attendance
              </button>
            )}
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Today's check-in section */}
            <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-medium text-indigo-800 mb-4">Today's Attendance</h3>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <p className="text-gray-700 mb-2">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  {checkInTime ? (
                    <p className="text-green-700">
                      You checked in at <span className="font-semibold">{checkInTime}</span>
                    </p>
                  ) : (
                    <p className="text-gray-500">You haven't checked in today</p>
                  )}
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={handleCheckIn}
                    disabled={!!checkInTime}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      checkInTime 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Check In
                  </button>
                  
                  <button
                    onClick={handleCheckOut}
                    disabled={!checkInTime}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      !checkInTime 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
            
            {/* Attendance stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Attendance Rate</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.presentPercentage}%</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${stats.presentPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Days Present</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.present}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Days Absent</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.absent}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Late Check-ins</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.late}</p>
              </div>
            </div>
            
            {/* Recent attendance records */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Attendance</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myAttendance.slice(0, 5).map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.timeIn ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.timeOut ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.workHours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status === 'present' ? 'Present' : 'Absent'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'my-attendance' && (
          <div className="space-y-6">
            {/* Calendar view would go here */}
            <p className="text-gray-500 italic">A calendar view would be implemented here showing attendance for each day.</p>
            
            {/* Full attendance history */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Attendance History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myAttendance.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.timeIn ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.timeOut ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.workHours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status === 'present' ? 'Present' : 'Absent'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'team' && isHRorManager && (
          <div className="space-y-6">
            {/* Date selector */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-48">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input
                  type="date"
                  id="date"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                />
              </div>
            </div>
            
            {/* Team attendance summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Team Size</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{teamAttendance.length}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Present</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {teamAttendance.filter(record => record.status === 'present').length}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Absent</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {teamAttendance.filter(record => record.status === 'absent').length}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Late</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {teamAttendance.filter(record => 
                    record.status === 'present' && record.timeIn && record.timeIn > '09:00:00'
                  ).length}
                </p>
              </div>
            </div>
            
            {/* Team attendance table */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Team Attendance for {new Date(attendanceDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamAttendance.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium mr-3">
                              {record.employeeAvatar}
                            </div>
                            <div className="font-medium text-gray-900">{record.employeeName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.timeIn ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.timeOut ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.workHours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status === 'present' ? 'Present' : 'Absent'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
