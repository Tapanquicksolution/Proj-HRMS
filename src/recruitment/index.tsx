import { useState } from 'react';
import { Link } from 'react-router-dom';

// Recruitment module entry point
export default function Recruitment() {
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Recruitment Dashboard
        </h2>
        <div className="text-sm text-gray-500 flex items-center">
          <span className="font-medium text-blue-600 mr-1">Q2 Hiring:</span> 68% complete
        </div>
      </div>
      
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Recruitment Overview
          </h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All Roles
            </button>
            <button 
              onClick={() => setFilter('tech')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'tech' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Technical
            </button>
            <button 
              onClick={() => setFilter('nontech')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'nontech' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Non-Technical
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/recruitment/job-postings" 
            className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white opacity-80">Open Positions</h3>
                <svg className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-3xl font-bold mt-2">12</p>
              <div className="mt-2 text-sm font-medium text-white/70">
                <span>3 urgent positions</span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-8 translate-y-8 group-hover:opacity-20 transition-opacity">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
            </div>
          </Link>
          
          <Link 
            to="/recruitment/candidates" 
            className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white opacity-80">Applications</h3>
                <svg className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-3xl font-bold mt-2">48</p>
              <div className="mt-2 text-sm font-medium text-white/70">
                <span className="inline-flex items-center text-emerald-200">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +12 this week
                </span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-8 translate-y-8 group-hover:opacity-20 transition-opacity">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H8v-2h8v2zm0-4H8V6h8v2zm-4 8H8v-2h4v2z"/>
              </svg>
            </div>
          </Link>
          
          <Link 
            to="/recruitment/interviews" 
            className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white opacity-80">Interviews</h3>
                <svg className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-3xl font-bold mt-2">15</p>
              <div className="mt-2 text-sm font-medium text-white/70">
                <span>5 scheduled today</span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-8 translate-y-8 group-hover:opacity-20 transition-opacity">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800">Recent Applications</h3>
            </div>
            <Link 
              to="/recruitment/candidates" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              <span>View all</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">EJ</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Emily Johnson</div>
                        <div className="text-xs text-gray-500">emily.j@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">UI/UX Designer</div>
                    <div className="text-xs text-gray-500">Design Team</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"/>
                      </svg>
                      Interview
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm">June 8, 2025</div>
                    <div className="text-xs text-gray-400">2 days ago</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-800">MR</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Michael Roberts</div>
                        <div className="text-xs text-gray-500">m.roberts@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Full-Stack Developer</div>
                    <div className="text-xs text-gray-500">Engineering</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"/>
                      </svg>
                      Screening
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm">June 7, 2025</div>
                    <div className="text-xs text-gray-400">3 days ago</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-800">SW</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Sarah Wilson</div>
                        <div className="text-xs text-gray-500">sarahw@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Product Manager</div>
                    <div className="text-xs text-gray-500">Product Team</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3"/>
                      </svg>
                      Assessment
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-sm">June 5, 2025</div>
                    <div className="text-xs text-gray-400">5 days ago</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="py-3 px-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">3</span> of <span className="font-medium">48</span> applications
            </div>
            <div className="flex space-x-1">
              <button className="px-2 py-1 text-gray-500 text-sm bg-white rounded border border-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="px-2 py-1 text-blue-600 text-sm bg-blue-50 rounded border border-blue-200 font-medium">1</button>
              <button className="px-2 py-1 text-gray-500 text-sm bg-white rounded border border-gray-300">2</button>
              <button className="px-2 py-1 text-gray-500 text-sm bg-white rounded border border-gray-300">3</button>
              <button className="px-2 py-1 text-gray-500 text-sm bg-white rounded border border-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 px-6 py-4 flex items-center border-b border-gray-100">
            <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">Hiring Progress</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Interview Pipeline</span>
                <span className="text-sm font-medium text-indigo-600">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: '65%'}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
            
            <div className="section-divider"></div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Position Fill Rate</h4>
              
              <div className="flex items-center">
                <div className="w-20 text-xs text-gray-500">Engineering</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-md ml-2">
                  <div className="h-4 bg-blue-500 rounded-md" style={{width: '75%'}}></div>
                </div>
                <span className="ml-2 text-xs font-medium">75%</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-20 text-xs text-gray-500">Marketing</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-md ml-2">
                  <div className="h-4 bg-green-500 rounded-md" style={{width: '90%'}}></div>
                </div>
                <span className="ml-2 text-xs font-medium">90%</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-20 text-xs text-gray-500">Design</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-md ml-2">
                  <div className="h-4 bg-purple-500 rounded-md" style={{width: '60%'}}></div>
                </div>
                <span className="ml-2 text-xs font-medium">60%</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-20 text-xs text-gray-500">Finance</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-md ml-2">
                  <div className="h-4 bg-yellow-500 rounded-md" style={{width: '40%'}}></div>
                </div>
                <span className="ml-2 text-xs font-medium">40%</span>
              </div>
            </div>
            
            <div className="section-divider"></div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Upcoming Interviews</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded mr-2">Today</div>
                    <div className="font-medium text-gray-800">3 interviews</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">1 final, 2 technical</div>
                </div>
                
                <div className="text-sm">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mr-2">Tomorrow</div>
                    <div className="font-medium text-gray-800">5 interviews</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">2 final, 3 screening</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
