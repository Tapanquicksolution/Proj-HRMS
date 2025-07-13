import { useState } from 'react';
import { PageHeader, DataTable } from '../components/ui/Dashboard';
import { Button } from '../components/ui/Form';
import { Badge } from '../components/ui/Notifications';

// Mock expense data
const initialExpenses = [
  {
    id: '1',
    title: 'Business Trip - London Conference',
    amount: 1250.00,
    date: '2025-05-12',
    category: 'Travel',
    status: 'Pending'
  },
  {
    id: '2',
    title: 'Team Lunch',
    amount: 187.50,
    date: '2025-05-08',
    category: 'Meals',
    status: 'Approved'
  },
  {
    id: '3',
    title: 'Office Supplies',
    amount: 75.25,
    date: '2025-05-05',
    category: 'Supplies',
    status: 'Reimbursed'
  },
  {
    id: '4',
    title: 'Software Subscription',
    amount: 49.99,
    date: '2025-05-01',
    category: 'Subscription',
    status: 'Rejected'
  }
];

// Column definitions for the expense table
const expenseColumns = [
  { key: 'title', label: 'Description' },
  { key: 'amount', label: 'Amount' },
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' }
];

export default function Expenses() {
  const [expenses] = useState(initialExpenses);

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Format date values
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render expense status with appropriate styling
  const renderExpenseStatus = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="warning" rounded>{status}</Badge>;
      case 'Approved':
        return <Badge variant="info" rounded>{status}</Badge>;
      case 'Reimbursed':
        return <Badge variant="success" rounded>{status}</Badge>;
      case 'Rejected':
        return <Badge variant="danger" rounded>{status}</Badge>;
      default:
        return <Badge variant="secondary" rounded>{status}</Badge>;
    }
  };

  // Format data for the table, including formatted date, amount and status
  const formattedExpenses = expenses.map(expense => ({
    ...expense,
    amount: formatCurrency(expense.amount),
    date: formatDate(expense.date),
    status: renderExpenseStatus(expense.status)
  }));

  const renderExpenseActions = (_expense: Record<string, any>) => (
    <div className="flex space-x-2">
      <button className="text-blue-600 hover:text-blue-800 text-sm">
        View
      </button>
      <button className="text-green-600 hover:text-green-800 text-sm">
        Edit
      </button>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Expense Claims & Reimbursements"
        subtitle="Manage expense reports and reimbursement requests"
        actionButton={
          <Button>Submit New Expense</Button>
        }
      />

      <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
        <DataTable
          columns={expenseColumns}
          data={formattedExpenses}
          actions={renderExpenseActions}
        />
      </div>
    </div>
  );
}
