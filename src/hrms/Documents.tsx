import { useState } from 'react';
import { PageHeader, DataTable } from '../components/ui/Dashboard';
import { Button, Input } from '../components/ui/Form';
import { Badge } from '../components/ui/Notifications';

// Mock document data
const initialDocuments = [
  {
    id: '1',
    title: 'Employment Contract Template',
    category: 'Contract',
    lastUpdated: '2025-04-15',
    owner: 'HR Department',
    status: 'Active'
  },
  {
    id: '2',
    title: 'Offer Letter Template',
    category: 'Onboarding',
    lastUpdated: '2025-04-10',
    owner: 'HR Department',
    status: 'Active'
  },
  {
    id: '3',
    title: 'Non-Disclosure Agreement',
    category: 'Legal',
    lastUpdated: '2025-03-22',
    owner: 'Legal Department',
    status: 'Active'
  },
  {
    id: '4',
    title: 'Employee Handbook',
    category: 'Policy',
    lastUpdated: '2025-01-05',
    owner: 'HR Department',
    status: 'Under Review'
  },
  {
    id: '5',
    title: 'Exit Interview Form',
    category: 'Offboarding',
    lastUpdated: '2024-11-12',
    owner: 'HR Department',
    status: 'Active'
  }
];

// Document categories for filtering
const documentCategories = [
  'All',
  'Contract',
  'Onboarding',
  'Offboarding',
  'Policy',
  'Legal'
];

// Column definitions for the document table
const documentColumns = [
  { key: 'title', label: 'Document Title' },
  { key: 'category', label: 'Category' },
  { key: 'lastUpdated', label: 'Last Updated' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' }
];

export default function Documents() {
  const [documents] = useState(initialDocuments);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Format date values
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render document status with appropriate styling
  const renderDocumentStatus = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success" rounded>{status}</Badge>;
      case 'Under Review':
        return <Badge variant="warning" rounded>{status}</Badge>;
      case 'Archived':
        return <Badge variant="secondary" rounded>{status}</Badge>;
      default:
        return <Badge variant="info" rounded>{status}</Badge>;
    }
  };

  // Filter documents based on category and search query
  const filteredDocuments = documents.filter(doc => {
    return (
      (selectedCategory === 'All' || doc.category === selectedCategory) &&
      (searchQuery === '' || doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Format documents for display
  const formattedDocuments = filteredDocuments.map(doc => ({
    ...doc,
    lastUpdated: formatDate(doc.lastUpdated),
    status: renderDocumentStatus(doc.status)
  }));

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderDocumentActions = (_doc: Record<string, any>) => (
    <div className="flex space-x-2">
      <button className="text-blue-600 hover:text-blue-800 text-sm">
        View
      </button>
      <button className="text-green-600 hover:text-green-800 text-sm">
        Edit
      </button>
      <button className="text-purple-600 hover:text-purple-800 text-sm">
        Download
      </button>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="HR Documents & Templates"
        subtitle="Manage HR letters, templates, and document generation"
        actionButton={
          <Button>Upload New Document</Button>
        }
      />

      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={handleSearchChange}
              label=""
            />
          </div>
          <div className="w-40">
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {documentCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DataTable
          columns={documentColumns}
          data={formattedDocuments}
          actions={renderDocumentActions}
        />
      </div>
      
      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-medium mb-4">Generate HR Letters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Offer Letter', 'Experience Certificate', 'Salary Certificate', 'Relieving Letter'].map((letter) => (
            <div key={letter} className="border rounded-md p-4 hover:shadow-md cursor-pointer transition-shadow">
              <div className="flex items-center mb-2">
                <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h4 className="text-md font-medium">{letter}</h4>
              </div>
              <p className="text-sm text-gray-500">Generate a customized {letter.toLowerCase()} for employees</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
