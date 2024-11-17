import React, { useState, useEffect, useCallback } from 'react';
// Import assets
import iconSearch from '../../../assets/img/icon-search.svg';

function FilterUserBar({ setUsers, allUsers }) {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Toggle sort order
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    // Define the function to filter and sort users, memoized with useCallback to avoid unnecessary re-creation
    const filterAndSortUsers = useCallback(() => {
        // Make a shallow copy of allUsers array to avoid directly mutating the original
        let filteredUsers = [...allUsers];

        // If there's a search term, filter users whose name or company includes the term (case insensitive)
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort the filtered users alphabetically by name based on the sortOrder ('asc' or 'desc')
        filteredUsers.sort((a, b) => {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)  // Sort A-Z if sortOrder is 'asc'
                : b.name.localeCompare(a.name); // Sort Z-A if sortOrder is 'desc'
        });

        // Update the users state with the filtered and sorted array
        setUsers(filteredUsers);
    }, [searchTerm, sortOrder, allUsers, setUsers]); // Memoize the function based on dependencies

    // useEffect hook to invoke filterAndSortUsers whenever the function or its dependencies change
    useEffect(() => {
        filterAndSortUsers(); // Call the function to apply filtering and sorting
    }, [filterAndSortUsers]); // Run this effect only when filterAndSortUsers changes


    return (
        <div className='filter-bar'>
            <div className='form-group'>
                <div className='form-field search-bar'>
                    <label className='icon'>
                        <img className='icon' src={iconSearch} alt='delete icon' width='20px' height='20px'/>
                    </label>
                    <input
                        type="text"
                        placeholder="name or company"
                        value={searchTerm}
                        onChange={handleSearchChange} // Call this function when search term changes
                    />
                </div>
                <div className='form-field toggle'>
                    <button className='toggle' onClick={toggleSortOrder} >
                        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterUserBar;
