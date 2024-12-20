import React, { useState, useEffect, useCallback } from 'react';
// Import assets
import iconSearch from '../../../assets/img/icon-search.svg';

function FilterTaskBar({ setTasksFilterList, tasksList }) {
    const [searchTerm, setSearchTerm] = useState(''); // State for the search input
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' for ascending, 'desc' for descending
    const [month, setMonth] = useState(''); // Selected month
    const [year, setYear] = useState(''); // Selected year

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Toggle sort order
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    // Handle month change
    const handleMonthChange = (e) => {
        setMonth(e.target.value); // Update the selected month
    };

    // Handle year change
    const handleYearChange = (e) => {
        setYear(e.target.value); // Update the selected year
    };


    // Define the function to filter and sort Tasks, memoized with useCallback to avoid unnecessary re-creation
    const filterAndSortTasks = useCallback(() => {
        // Make a shallow copy of tasksList array to avoid directly mutating the original
        let filteredTasks = [...tasksList];

        // If there's a search term, filter tasks whose client name or company includes the term (case insensitive)
        if (searchTerm) {
            filteredTasks = filteredTasks.filter(task =>
                task.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.client.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by month and year
        filteredTasks = filteredTasks.filter((task) => {
            const [taskYear, taskMonth] = task.dateStart.split(' ')[0].split('-'); // Extract year and month
            const matchesMonth = month ? taskMonth === month : true;
            const matchesYear = year ? taskYear === year : true;
            return matchesMonth && matchesYear;
        });

        // Sort the filtered tasks chronological by date based on the sortOrder ('asc' or 'desc')
        filteredTasks.sort((a, b) => {
            return sortOrder === 'asc'
                ? a.dateStart.localeCompare(b.dateStart)  // Sort A-Z if sortOrder is 'asc'
                : b.dateStart.localeCompare(a.dateStart); // Sort Z-A if sortOrder is 'desc'
        });

        // Update the tasks state with the filtered and sorted array
        setTasksFilterList(filteredTasks);
    }, [searchTerm, month, year, sortOrder, setTasksFilterList, tasksList]); // Memoize the function based on dependencies

    // useEffect hook to invoke filterAndSortTasks whenever the function or its dependencies change
    useEffect(() => {
        filterAndSortTasks(); // Call the function to apply filtering and sorting
    }, [filterAndSortTasks]); // Run this effect only when filterAndSortTasks changes


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
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-field'>
                    <select
                        name="month"
                        value={month}
                        onChange={handleMonthChange}
                    >
                        <option value="">Month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <div className='form-field'>
                    <select
                        name="year"
                        value={year}
                        onChange={handleYearChange}
                    >
                        <option value="">Year</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
                <div className='form-field toggle'>
                    <button className='toggle' onClick={handleSortOrder} >
                        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterTaskBar;
