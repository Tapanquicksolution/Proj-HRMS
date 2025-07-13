import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../auth/authSlice';

// Mock payroll data
const MOCK_PAYROLL_HISTORY = [
  {
    id: '1',
    period: 'May 2025',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    payDate: '2025-06-05',
    grossPay: 5000,
    netPay: 3750,
    status: 'processed',
    currency: 'USD'
  },
  {
    id: '2',
    period: 'April 2025',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    payDate: '2025-05-05',
    grossPay: 5000,
    netPay: 3750,
    status: 'processed',
    currency: 'USD'
  },
  {
    id: '3',
    period: 'March 2025',
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    payDate: '2025-04-05',
    grossPay: 5000,
    netPay: 3750,
    status: 'processed',
    currency: 'USD'
  },
  {
    id: '4',
    period: 'February 2025',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    payDate: '2025-03-05',
    grossPay: 4800,
    netPay: 3600,
    status: 'processed',
    currency: 'USD'
  },
  {
    id: '5',
    period: 'January 2025',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    payDate: '2025-02-05',
    grossPay: 4800,
    netPay: 3600,
    status: 'processed',
    currency: 'USD'
  }
];

// Mock payslip details
const MOCK_PAYSLIP_DETAILS = {
  employeeName: 'John Employee',
  employeeId: '3',
  department: 'Engineering',
  designation: 'Senior Developer',
  bankAccount: '****4567',
  period: 'May 2025',
  payDate: '2025-06-05',
  
  earnings: [
    { label: 'Basic Salary', amount: 4000 },
    { label: 'Housing Allowance', amount: 500 },
    { label: 'Transport Allowance', amount: 300 },
    { label: 'Performance Bonus', amount: 200 }
  ],
  
  deductions: [
    { label: 'Income Tax', amount: 800 },
    { label: 'Social Security', amount: 250 },
    { label: 'Healthcare', amount: 150 },
    { label: 'Retirement Fund', amount: 50 }
  ],
  
  totalEarnings: 5000,
  totalDeductions: 1250,
  netPay: 3750
};

// Mock company employees for HR/Admin
const MOCK_EMPLOYEES_PAYROLL = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Senior Developer',
    department: 'Engineering',
    salary: 4800,
    paymentStatus: 'Paid',
    lastPaymentDate: '2025-06-05'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    position: 'UX Designer',
    department: 'Design',
    salary: 4200,
    paymentStatus: 'Paid',
    lastPaymentDate: '2025-06-05'
  },
  {
    id: '3',
    name: 'David Johnson',
    position: 'Product Manager',
    department: 'Product',
    salary: 5500,
    paymentStatus: 'Paid',
    lastPaymentDate: '2025-06-05'
  },
  {
    id: '4',
    name: 'Linda Chen',
    position: 'Marketing Specialist',
    department: 'Marketing',
    salary: 3800,
    paymentStatus: 'Paid',
    lastPaymentDate: '2025-06-05'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    position: 'HR Manager',
    department: 'Human Resources',
    salary: 4500,
    paymentStatus: 'Pending',
    lastPaymentDate: '2025-05-05'
  }
];

export default function Payroll() {
  const [activeTab, setActiveTab] = useState('history');  // 'history', 'payslip', 'run-payroll'
  const [selectedPayslip, setSelectedPayslip] = useState<string | null>(null);
  const currentUser = useAppSelector(selectCurrentUser);
  const isHRorAdmin = currentUser?.role === 'hr' || currentUser?.role === 'admin';

  const viewPayslip = (payrollId: string) => {
    setSelectedPayslip(payrollId);
    setActiveTab('payslip');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4 md:mb-0">Payroll Management</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'history' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('history')}
            >
              {isHRorAdmin ? 'Payroll History' : 'My Paychecks'}
            </button>
            {selectedPayslip && (
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'payslip' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('payslip')}
              >
                View Payslip
              </button>
            )}
            {isHRorAdmin && (
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'run-payroll' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('run-payroll')}
              >
                Run Payroll
              </button>
            )}
          </div>
        </div>
        
        {/* Payroll history / My paychecks */}
        {activeTab === 'history' && !isHRorAdmin && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_PAYROLL_HISTORY.map((payroll) => (
                    <tr key={payroll.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payroll.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payroll.payDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${payroll.grossPay.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${payroll.netPay.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                          onClick={() => viewPayslip(payroll.id)}>
                        View Payslip
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HR/Admin payroll history view */}
        {activeTab === 'history' && isHRorAdmin && (
          <div className="space-y-6">
            {/* Payroll periods */}
            <div className="mb-6">
              <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">Select Period</label>
              <select
                id="period"
                className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>May 2025</option>
                <option>April 2025</option>
                <option>March 2025</option>
                <option>February 2025</option>
                <option>January 2025</option>
              </select>
            </div>
            
            {/* Employee payroll table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_EMPLOYEES_PAYROLL.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${employee.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {employee.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(employee.lastPaymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                        View Details
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Payslip view */}
        {activeTab === 'payslip' && selectedPayslip && (
          <div className="space-y-6">
            <div className="text-right mb-4">
              <button className="text-sm font-medium text-white">
                Download PDF
              </button>
            </div>
            
            {/* Payslip header */}
            <div className="flex flex-col md:flex-row justify-between border-b pb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Payslip for {MOCK_PAYSLIP_DETAILS.period}</h3>
                <p className="text-gray-500">Pay Date: {new Date(MOCK_PAYSLIP_DETAILS.payDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-gray-900 font-medium">{MOCK_PAYSLIP_DETAILS.employeeName}</p>
                <p className="text-gray-500">{MOCK_PAYSLIP_DETAILS.department} • {MOCK_PAYSLIP_DETAILS.designation}</p>
                <p className="text-gray-500">Employee ID: {MOCK_PAYSLIP_DETAILS.employeeId}</p>
              </div>
            </div>
            
            {/* Earnings and deductions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-3">Earnings</h4>
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">                    {MOCK_PAYSLIP_DETAILS.earnings.map((item) => (
                      <tr key={`earning-${item.label}`} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{item.label}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-4 py-2 text-sm text-gray-900">Total Earnings</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-right">${MOCK_PAYSLIP_DETAILS.totalEarnings.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-3">Deductions</h4>
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">                    {MOCK_PAYSLIP_DETAILS.deductions.map((item) => (
                      <tr key={`deduction-${item.label}`} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{item.label}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-4 py-2 text-sm text-gray-900">Total Deductions</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-right">${MOCK_PAYSLIP_DETAILS.totalDeductions.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Net pay */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Net Pay</h3>
                <p className="text-2xl font-bold text-indigo-600">${MOCK_PAYSLIP_DETAILS.netPay.toLocaleString()}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">Paid to account ending in {MOCK_PAYSLIP_DETAILS.bankAccount}</p>
            </div>
          </div>
        )}
        
        {/* Run payroll view - for HR/Admin */}
        {activeTab === 'run-payroll' && isHRorAdmin && (
          <div className="space-y-6">
            <form className="space-y-6">
              {/* Payroll period selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="payrollName" className="block text-sm font-medium text-gray-700 mb-1">Payroll Name</label>
                  <input
                    type="text"
                    id="payrollName"
                    defaultValue="June 2025 Payroll"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="payDate" className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
                  <input
                    type="date"
                    id="payDate"
                    defaultValue="2025-07-05"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Period Start</label>
                  <input
                    type="date"
                    id="startDate"
                    defaultValue="2025-06-01"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Period End</label>
                  <input
                    type="date"
                    id="endDate"
                    defaultValue="2025-06-30"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Payroll summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-md font-medium text-gray-800 mb-3">Payroll Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Employees</p>
                    <p className="text-xl font-medium text-gray-900 mt-1">5</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Gross Pay</p>
                    <p className="text-xl font-medium text-gray-900 mt-1">$22,800</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Net Pay</p>
                    <p className="text-xl font-medium text-gray-900 mt-1">$17,050</p>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-6">
                <button type="button" className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Preview
                </button>
                <button type="button" className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
                  Process Payroll
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
