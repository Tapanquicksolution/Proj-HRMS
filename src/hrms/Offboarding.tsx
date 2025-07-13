import { useState } from 'react';
import { PageHeader, DataTable } from '../components/ui/Dashboard';
import { Button } from '../components/ui/Form';
import { Badge } from '../components/ui/Notifications';

// Mock offboarding data
const initialOffboardingData = [
	{
		id: '1',
		name: 'Jessica Parker',
		position: 'Marketing Manager',
		department: 'Marketing',
		lastDay: '2025-06-30',
		status: 'In Progress',
		progress: 40,
		reason: 'New Opportunity',
	},
	{
		id: '2',
		name: 'Michael Chen',
		position: 'Frontend Developer',
		department: 'Engineering',
		lastDay: '2025-06-15',
		status: 'In Progress',
		progress: 75,
		reason: 'Relocation',
	},
	{
		id: '3',
		name: 'David Rodriguez',
		position: 'Account Manager',
		department: 'Sales',
		lastDay: '2025-05-31',
		status: 'Completed',
		progress: 100,
		reason: 'Retirement',
	},
	{
		id: '4',
		name: 'Amanda Lewis',
		position: 'HR Coordinator',
		department: 'Human Resources',
		lastDay: '2025-05-15',
		status: 'Completed',
		progress: 100,
		reason: 'New Opportunity',
	},
];

// Mock offboarding tasks
const offboardingTasks = [
	{ id: 'task1', name: 'Schedule exit interview', category: 'HR', assignedTo: 'HR Department' },
	{ id: 'task2', name: 'Return company equipment', category: 'Equipment', assignedTo: 'IT Department' },
	{ id: 'task3', name: 'Revoke system access', category: 'IT', assignedTo: 'IT Department' },
	{ id: 'task4', name: 'Prepare final settlement', category: 'Finance', assignedTo: 'Finance Department' },
	{ id: 'task5', name: 'Knowledge transfer sessions', category: 'Team', assignedTo: 'Department Manager' },
	{ id: 'task6', name: 'Update organizational chart', category: 'HR', assignedTo: 'HR Department' },
	{ id: 'task7', name: 'Issue relieving letter', category: 'Documentation', assignedTo: 'HR Department' },
	{ id: 'task8', name: 'Collect company property', category: 'Admin', assignedTo: 'Admin Department' },
];

// Column definitions for the offboarding table
const offboardingColumns = [
	{ key: 'name', label: 'Name' },
	{ key: 'position', label: 'Position' },
	{ key: 'department', label: 'Department' },
	{ key: 'lastDay', label: 'Last Working Day' },
	{ key: 'reason', label: 'Exit Reason' },
	{ key: 'status', label: 'Status' },
	{ key: 'progress', label: 'Progress' },
];

export default function Offboarding() {
	const [offboardingData] = useState(initialOffboardingData);
	const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

	// Format date values
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	// Render offboarding status with appropriate styling
	const renderStatus = (status: string) => {
		switch (status) {
			case 'Not Started':
				return <Badge variant="secondary" rounded>{status}</Badge>;
			case 'In Progress':
				return <Badge variant="info" rounded>{status}</Badge>;
			case 'Completed':
				return <Badge variant="success" rounded>{status}</Badge>;
			default:
				return <Badge variant="secondary" rounded>{status}</Badge>;
		}
	};
	// Render progress bar
	const renderProgress = (progress: number) => {
		// Extract nested ternary into a function that determines color based on progress
		const getColorClass = (value: number): string => {
			if (value < 50) return 'bg-red-500';
			if (value < 80) return 'bg-yellow-500';
			return 'bg-green-500';
		};

		return (
			<div className="w-full bg-gray-200 rounded-full h-2">
				<div
					className={`h-2 rounded-full ${getColorClass(progress)}`}
					style={{ width: `${progress}%` }}
				></div>
			</div>
		);
	};

	// Format offboarding data for display
	const formattedOffboardingData = offboardingData.map((employee) => ({
		...employee,
		lastDay: formatDate(employee.lastDay),
		status: renderStatus(employee.status),
		progress: renderProgress(employee.progress),
	}));

	const handleRowClick = (employee: Record<string, any>) => {
		setSelectedEmployee(employee.id);
	};

	// Get tasks for selected employee
	const getEmployeeTasks = () => {
		if (!selectedEmployee) return [];

		// In a real application, you would fetch tasks for the specific employee
		return offboardingTasks.map((task) => {
			// Simulate task status - in real app this would come from API
			let status = 'Not Started';
			const employee = offboardingData.find((e) => e.id === selectedEmployee);

			if (employee) {
				const taskIndex = offboardingTasks.findIndex((t) => t.id === task.id);
				const totalTasks = offboardingTasks.length;
				const completedTasksCount = Math.floor((employee.progress / 100) * totalTasks);

				if (taskIndex < completedTasksCount) {
					status = 'Completed';
				} else if (taskIndex === completedTasksCount) {
					status = 'In Progress';
				}
			}

			return { ...task, status };
		});
	};

	// Get selected employee data
	const getSelectedEmployeeData = () => {
		return offboardingData.find((employee) => employee.id === selectedEmployee);
	};

	// Calculate days remaining until last day
	const getDaysRemaining = (lastDay: string) => {
		const today = new Date();
		const exitDate = new Date(lastDay);
		const diffTime = exitDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	};

	return (
		<div>
			<PageHeader
				title="Employee Offboarding"
				subtitle="Manage exit formalities and offboarding processes"
				actionButton={<Button>Initiate Exit Process</Button>}
			/>

			<div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
				<DataTable
					columns={offboardingColumns}
					data={formattedOffboardingData}
					actions={(_row) => (
						<button
							className="text-blue-600 hover:text-blue-800 text-sm"
							onClick={() => handleRowClick(_row)}
						>
							View Details
						</button>
					)}
				/>
			</div>

			{selectedEmployee && (
				<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Employee Information */}
					<div className="bg-white shadow rounded-lg p-6">
						<h3 className="text-lg font-medium mb-4">Employee Exit Information</h3>
						{getSelectedEmployeeData() && (
							<div className="space-y-4">
								<div className="flex justify-center">
									<div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 text-xl font-semibold">
										{getSelectedEmployeeData()?.name.split(' ').map((n) => n[0]).join('')}
									</div>
								</div>
								<div className="text-center mt-2">
									<h4 className="text-lg font-medium">{getSelectedEmployeeData()?.name}</h4>
									<p className="text-gray-600">{getSelectedEmployeeData()?.position}</p>
								</div>
								<div className="border-t pt-4">
									<div className="flex justify-between mb-2">
										<span className="text-gray-600">Department:</span>
										<span className="font-medium">{getSelectedEmployeeData()?.department}</span>
									</div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-600">Last Working Day:</span>
										<span className="font-medium">{getSelectedEmployeeData()?.lastDay}</span>
									</div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-600">Days Remaining:</span>
										<span className="font-medium">
											{getDaysRemaining(getSelectedEmployeeData()?.lastDay ?? '')}
										</span>
									</div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-600">Exit Reason:</span>
										<span className="font-medium">{getSelectedEmployeeData()?.reason}</span>
									</div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-600">Overall Progress:</span>
										<span className="font-medium">{getSelectedEmployeeData()?.progress}%</span>
									</div>
								</div>

								<button className="w-full mt-2 bg-indigo-100 text-indigo-700 py-2 rounded-md hover:bg-indigo-200">
									Schedule Exit Interview
								</button>
							</div>
						)}
					</div>

					{/* Offboarding Checklist */}
					<div className="md:col-span-2 bg-white shadow rounded-lg p-6">
						<h3 className="text-lg font-medium mb-4">Offboarding Checklist</h3>
						<div className="space-y-4">							{getEmployeeTasks().map((task) => (
								<div key={task.id} className="flex items-center p-3 border rounded-md">
									<TaskStatusIndicator status={task.status} />
									<div className="ml-3 flex-1">
										<div className="flex justify-between">
											<p className="font-medium">{task.name}</p>
											<span className="text-xs text-gray-500">
												Assigned to: {task.assignedTo}
											</span>
										</div>
										<p className="text-xs text-gray-500">{task.category}</p>
									</div>
									<div className="ml-4">										<TaskStatusBadge status={task.status} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>	);
}

// Move the inline component definition out of the parent component
const OffboardingPreviewModal = ({ offboarding, onClose }: { offboarding: any; onClose: () => void }) => (
	<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
		<div className="bg-white rounded-lg p-6 w-full max-w-md">
			<h2 className="text-xl font-bold mb-4">Offboarding Preview</h2>
			<div className="mb-4">
				<p><span className="font-semibold">Name:</span> {offboarding?.name}</p>
				<p><span className="font-semibold">End Date:</span> {offboarding?.endDate}</p>
				<p><span className="font-semibold">Role:</span> {offboarding?.role}</p>
				{/* Add more fields as needed */}
			</div>
			<button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
		</div>
	</div>
);

// Extract components outside the main component
// TaskStatusBadge displays a colored badge based on the task status
const TaskStatusBadge = ({ status }: { status: string }) => {
	// Extract nested ternary into a function that determines color based on status
	const getBadgeClasses = (statusValue: string): string => {
		if (statusValue === 'Completed') return 'bg-green-100 text-green-800';
		if (statusValue === 'In Progress') return 'bg-yellow-100 text-yellow-800';
		return 'bg-gray-100 text-gray-800';
	};

	return (
		<span
			className={`inline-flex text-xs px-2 py-1 rounded-full ${getBadgeClasses(status)}`}
		>
			{status}
		</span>
	);
};

// TaskStatusIndicator shows a colored circle with a checkmark for completed tasks
const TaskStatusIndicator = ({ status }: { status: string }) => {
	// Extract nested ternary into a function that determines color based on status
	const getStatusClasses = (statusValue: string): string => {
		if (statusValue === 'Completed') return 'bg-green-500 border-green-500';
		if (statusValue === 'In Progress') return 'bg-yellow-500 border-yellow-500';
		return 'bg-white border-gray-300';
	};

	return (
		<div
			className={`flex-shrink-0 h-5 w-5 rounded-full border ${getStatusClasses(status)}`}
		>
			{status === 'Completed' && (
				<svg
					className="h-5 w-5 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			)}
		</div>
	);
};
