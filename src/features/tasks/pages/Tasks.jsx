// Import styles and libraries
// import '../../../App.scss'; -> it's imported in tasks.scss
import '../tasks.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Import the function to fetch tasks
import { getTasks } from '../taskService';
// Import components
import CreateTaskForm from '../components/CreateTaskForm';
import DeleteTaskForm from '../components/DeleteTaskForm';
import EditTaskForm from '../components/EditTaskForm';
import FilterTaskBar from '../components/FilterTaskBar';
import Notifications from '../../../components/Notifications';
// Import assets
import iconDelete from '../../../assets/img/icon-delete.svg';
import iconEdit from '../../../assets/img/icon-edit.svg';
import iconAdd from '../../../assets/img/icon-add.svg';

function Tasks() {
    // Access task token from Redux
    const { token } = useSelector((state) => state.user);
    // States for tasks data
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    // State for loading and error handling
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    // States for modals and selected task
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    // useEffect hook to fetch tasks when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Call the getTasks function to retrieve task data
                const tasksData = await getTasks(token);
                // Update the tasks state with the fetched data
                setTasks(tasksData);
                setAllTasks(tasksData);
                // console.log("ALL TASKS: ", allTasks);
            } catch (error) {
                // Set the error state with a relevant message, falling back to a default
                setErrorMessage(error.response?.data.message || "Failed to load tasks.");
            } finally {
                // Set loading to false after the fetch attempt (successful or failed)
                setLoading(false);
            }
        };
        // Invoke the fetchTasks function to initiate data fetching
        fetchTasks();
    }, [token]);

    // DELETE. Selected task and show delete modal
    const selectTaskDelete = (task) => {
        setSelectedTask(task);
        setDeleteModal(true);
    };

    // EDIT. Set the selected task and show edit modal
    const selectTaskEdit = (task) => {
        setSelectedTask(task);
        setEditModal(true);
    };

    // CREATE. Show create modal
    const createTask = () => {
        setCreateModal(true);
    };

    // NOTIFICATION. Show create modal
    const notification = (type) => {
        setNotificationType(type);
        setNotificationModal(true);
    };
    // Close Notification
    const closeNotification = () => {
        setNotificationModal(false);
    }

    // Close  all modals
    const closeModals = () => {
        // Set all states to false. Add here all modals/states created in the file
        setDeleteModal(false);
        setEditModal(false);
        setCreateModal(false);
        setSelectedTask(null);
    };

    // Conditional rendering based on loading and error states
    // Show loading message while data is being fetched
    if (loading) return <div>Loading...</div>;
    // Display error message if fetching failed
    if (errorMessage) return <div>{errorMessage}</div>;

    // Render the list of tasks or a message if no tasks are found
    return (
        <div className='tasks-page crud-page'>
            <div className='title-container'>
                <h1 className='title'>Tasks</h1>
                <button className="button" onClick={() => createTask()}>
                    Create task <img className='icon' src={iconAdd} alt='delete icon' width='20px' height='20px'/>
                </button>
            </div>
            <div className='filter-bar-container'>
                <FilterTaskBar allTasks={allTasks} setTasks={setTasks} />
            </div>
            {tasks.length > 0 ? (
                <ul className='items-container'>
                    {tasks.map((task) => (
                        <li key={task._id} className='item'>
                            <div className='text-container'>
                                <p className='paragraph bold'>{task.client.name}</p>
                                <p className='paragraph description'>{task.dateStart}</p>
                                <p className='paragraph description'>{task.description}</p>
                            </div>
                            <div className='buttons-container'>
                                <button className='icon' onClick={() => selectTaskDelete(task)}>
                                    <img className='icon' src={iconDelete} alt='delete icon' width='20px' height='20px'/>
                                </button>
                                <button className='icon' onClick={() => selectTaskEdit(task)}>
                                    <img className='icon' src={iconEdit} alt='edit icon' width='20px' height='20px'/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks found.</p>
            )}

            {notificationModal && (
                <Notifications
                    type={notificationType}
                    onCloseNotification={closeNotification}
                />
            )}
            {createModal && (
                <CreateTaskForm
                    onCloseModals={closeModals}
                    onSave={(createdTask) => {
                        setAllTasks((prevTasks) => [...prevTasks, createdTask]);
                        closeModals();
                        notification('create');
                    }}
                />
            )}
            {deleteModal && selectedTask && (
                <DeleteTaskForm
                    task={selectedTask}
                    onCloseModals={closeModals}
                    onSave={(taskId) => {
                        setAllTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
                        closeModals();
                        notification('delete-task');
                    }}
                    />
                )}
            {editModal && selectedTask && (
                <EditTaskForm
                    task={selectedTask}
                    onCloseModals={closeModals}
                    onSave={(updatedTask) => {
                        setAllTasks(prevTasks => prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task));
                        closeModals();
                        notification('edit-task');
                    }}
                />
            )}
        </div>
    );
};

export default Tasks