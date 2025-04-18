"use client"
import React, { useState } from 'react';
import './page.css';

import eventData from './data';

const itemsPerPage = 10; // Set the number of items per page

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(''); // State to track the selected domain for filtering

  // Filter events based on search query and selected domain
  const filteredEventData = eventData.filter((event) =>
    Object.values(event).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    ) &&
    (selectedDomain === '' || event.domain.toLowerCase() === selectedDomain.toLowerCase())
  );

  // Calculate starting and ending indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the items to be displayed on the current page
  const currentEventData = filteredEventData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredEventData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const handleDomainFilterChange = (event) => {
    setSelectedDomain(event.target.value);
    setCurrentPage(1); // Reset to the first page when the domain filter changes
  };

  const uniqueDomains = [...new Set(eventData.map((event) => event.domain))];

  return (
    <div className='reports'>
      <div className="reports-in">
        {/* <div className="back-to-home">
          <a href="/"><i className="fas fa-arrow-left"></i> Back to Home</a>
        </div>
        <div className="reports-header">
          <div className="reports-header-in">
            <h1>Activity Reports</h1>
          </div>
        </div> */}
        <div className="reports-table">
          <div className="reports-table-top">
            <input
              className="reports-search"
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="back-to-home">
              <a href="/"><i className="fas fa-arrow-left"></i> Back to Home</a>
            </div>
          </div>
          <div className="reports-table-in">
            <div className="reports-table-in-one">
              <table>
                <thead>
                  <tr>
                    <th>S NO</th>
                    <th>DATE</th>
                    <th>NAME OF THE EVENT</th>
                    <th>DOMAIN

                    <select
              className="reports-dropdown"
              value={selectedDomain}
              onChange={handleDomainFilterChange}
            >
              <option value="">Select</option>
              {uniqueDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

                    </th>
                    <th>Students Participated</th>
                    <th>Report</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEventData.map((event) => (
                    <tr key={event.sno}>
                      <td>{event.sno}</td>
                      <td>{event.date}</td>
                      <td>{event.eventName}</td>
                      <td>{event.domain}</td>
                      <td>{event.participants}</td>
                      <td>Yet to be updated</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination controls */}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
