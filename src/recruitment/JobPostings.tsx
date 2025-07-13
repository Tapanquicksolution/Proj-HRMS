import { useState } from 'react';
import { DataTable, PageHeader } from '../components/ui/Dashboard';
import { Button, Input, Select, Textarea } from '../components/ui/Form';
import { Badge } from '../components/ui/Notifications';

// Mock job data
const initialJobs = [
  {
    id: '1',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '2025-05-15',
    status: 'Open'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time',
    postedDate: '2025-05-20',
    status: 'Open'
  },
  {
    id: '3',
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    postedDate: '2025-05-25',
    status: 'Open'
  }
];

const jobColumns = [
  { key: 'title', label: 'Job Title' },
  { key: 'department', label: 'Department' },
  { key: 'location', label: 'Location' },
  { key: 'type', label: 'Type' },
  { key: 'postedDate', label: 'Posted Date' },
  { key: 'status', label: 'Status' }
];

const departmentOptions = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Design', label: 'Design' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Finance', label: 'Finance' },
  { value: 'HR', label: 'HR' }
];

const jobTypeOptions = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' }
];

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
}

const emptyJobForm: JobFormData = {
  title: '',
  department: 'Engineering',
  location: '',
  type: 'Full-time',
  description: '',
  requirements: ''
};

export default function JobPostings() {
  const [jobs, setJobs] = useState(initialJobs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<JobFormData>(emptyJobForm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob = {
      id: String(Date.now()),
      ...formData,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'Open'
    };
    
    setJobs(prev => [newJob, ...prev]);
    setFormData(emptyJobForm);
    setIsFormOpen(false);
  };
  // Extract the renderJobStatus function to avoid React hook rules violations
  const renderJobStatus = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge variant="success" rounded>{status}</Badge>;
      case 'Closed':
        return <Badge variant="danger" rounded>{status}</Badge>;
      case 'Draft':
        return <Badge variant="secondary" rounded>{status}</Badge>;
      default:
        return <Badge variant="info" rounded>{status}</Badge>;
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };  // Add job action buttons renderer function
  const renderJobActions = (_job: Record<string, any>) => (
    <div className="flex space-x-2">
      <button className="text-blue-600 hover:text-blue-800 text-sm">
        Edit
      </button>
      <button className="text-green-600 hover:text-green-800 text-sm">
        View
      </button>
    </div>
  );

  const jobsWithFormattedData = jobs.map(job => ({
    ...job,
    postedDate: formatDate(job.postedDate),
    status: renderJobStatus(job.status)
  }));

  return (
    <>
      <PageHeader 
        title="Job Postings" 
        subtitle="Manage job openings and track applications"
        actionButton={
          <Button onClick={() => setIsFormOpen(true)}>
            Post New Job
          </Button>
        }
      />

      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Create New Job Posting</h2>
            <Button 
              variant="outline" 
              onClick={() => setIsFormOpen(false)}
              size="sm"
            >
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g. Senior Software Engineer"
              />
              
              <Select
                label="Department"
                name="department"
                id="department"
                value={formData.department}
                onChange={handleInputChange}
                options={departmentOptions}
                required
              />
              
              <Input
                label="Location"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="e.g. Remote, New York, NY"
              />
              
              <Select
                label="Job Type"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                options={jobTypeOptions}
                required
              />
            </div>
            
            <div className="mt-4">
              <Textarea
                label="Job Description"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe the job role, responsibilities, and details..."
                rows={5}
              />
            </div>
            
            <div className="mt-4">
              <Textarea
                label="Requirements"
                name="requirements"
                id="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                required
                placeholder="List the skills, qualifications, and experience required..."
                rows={5}
              />
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsFormOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Job Posting
              </Button>
            </div>
          </form>
        </div>
      ) : (      <div className="bg-white rounded-lg shadow overflow-hidden">
          <DataTable 
            columns={jobColumns} 
            data={jobsWithFormattedData} 
            actions={renderJobActions}
          />
        </div>
      )}
    </>
  );
}
