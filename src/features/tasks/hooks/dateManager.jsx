//Import styles and libraries
import React, { useState, useEffect } from 'react';
// Import redux and slices
import { useDispatch } from 'react-redux';
import { editTaskThunk } from '../taskSlice';
// Import assets
import iconClose from '../../../assets/img/icon-close.svg';

export function useHandleDate(task) {
    // Function to format date to 'YYYY-MM-DD HH:mm:ss'
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Function to handle date updates and format them
    const handleDate = (dateType) => {
        const newDate = formatDate(new Date());
        task((prevData) => ({
            ...prevData,
            [dateType]: newDate,
        }));
    };

    return { handleDate };
}
// Function to format month and year. Used in Tasks
export const formatYearMonth = (dateString) => {
    const [year, month] = dateString.split(' ')[0].split('-'); // Split dateStart into year and month
    return `${year}.${month}`; // Return in the desired format: MM.YYYY
};

// Function to calculate time of a task
export const calcTime = (dateStart, dateEnd) => {
    // Convert string dates to Date objects
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    // Calculate difference in milliseconds
    const timeDifference = end - start;
    // Convert to hours and minutes
    const convertedHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const convertedMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    // Format with leading zeros
    const hours = convertedHours.toString().padStart(2, '0');
    const minutes = convertedMinutes.toString().padStart(2, '0');
    return `${hours} h - ${minutes} m`;
}

// Function to calculate time of multiple tasks
export const calcMultiTime = (tasksFilterList) => {
    // Filter valid tasks
    const validTasks = tasksFilterList.filter((task) => {
        const start = new Date(task.dateStart);
        const end = new Date(task.dateEnd);
        // Check if both dates are valid
        const isValid = !isNaN(start.getTime()) && !isNaN(end.getTime());
        // Keep only valid tasks
        return isValid;
    });
    // Calculate the total duration in minutes
    const totalMinutes = validTasks.reduce((sum, task) => {
        const start = new Date(task.dateStart);
        const end = new Date(task.dateEnd);
        const duration = (end - start) / (1000 * 60); // Convert milliseconds to minutes
        return sum + duration;
    }, 0);
    // Convert total minutes to hours and minutes
    const convertedHours = Math.floor(totalMinutes / 60);
    const convertedMinutes = Math.round(totalMinutes % 60);
    // Format with leading zeros
    const hours = convertedHours.toString().padStart(2, '0');
    const minutes = convertedMinutes.toString().padStart(2, '0');

    return `Total: ${hours} hours ${minutes} minutes`;
}

// Function to activate and manage TimerNotification
export const TimerNotification = ({ task, onSave }) => {
    // REDUX
    const dispatch = useDispatch();
    // States for handling task
    const [timerTask, setTimerTask] = useState({
        _id: task._id,
        client: task.client,
        dateStart: task.dateStart,
        dateEnd: task.dateEnd,
        description: task.description
    });
    // Sync timerTask with task prop changes
    useEffect(() => {
        setTimerTask({
            _id: task._id,
            client: task.client,
            dateStart: task.dateStart,
            description: task.description,
            dateEnd: task.dateEnd
        });
    }, [task]);
    // Use the custom hook
    const { handleDate } = useHandleDate(setTimerTask);
    //States and useEffect for timer clock
    const [time, setTime] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(interval); // Cleanup
    }, []);
    //Submit function
    const handleSubmit = async (timerTask) => {
        // Dispatch the editTaskThunk
        try {
            const response = await dispatch(editTaskThunk(timerTask)).unwrap();
            onSave(response.result);
        } catch (error) {
            console.log("ERROR");
        }
    };
    // Watch for changes in timerTask.dateEnd
    useEffect(() => {
        if (timerTask.dateEnd) {
            handleSubmit(timerTask);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerTask.dateEnd, timerTask]);
    // Stop timer
    const setDateEnd = () => {
        handleDate('dateEnd');
    };

    return (
        <div className='notifications notification-left'>
            <header className='notification-header'>
                <p className='bold'>Task created</p>
                <button onClick={setDateEnd} className="notification-close">
                    <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                </button>
            </header>
            <div className='notification-body'>
                <p className='notification-text'>{time} seconds</p>
                <button onClick={setDateEnd}>Stop</button>
            </div>
        </div>
    );
};