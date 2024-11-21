// Import styles and libraries
// import '../../../App.scss'; -> it's imported in tasks.scss
import '../tasks.scss';
import React, { useEffect, useState } from 'react';
// // Import the function to fetch tasks
// import { getTasks } from '../taskService';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getTasksThunk } from '../taskSlice';
// Import components
import CreateTaskForm from '../components/CreateTaskForm';
// import DateManager from '../components/DateManager';
import DeleteTaskForm from '../components/DeleteTaskForm';
import EditTaskForm from '../components/EditTaskForm';
import FilterTaskBar from '../components/FilterTaskBar';
import Notifications from '../../../components/Notifications';
// Import assets
import iconDelete from '../../../assets/img/icon-delete.svg';
import iconEdit from '../../../assets/img/icon-edit.svg';
import iconAdd from '../../../assets/img/icon-add.svg';

function Tasks() {
    // REDUX
    const dispatch = useDispatch();
    const { tasks: reduxTasks, loading, errorMessage } = useSelector((state) => state.task);
    const { users: reduxUsers, token } = useSelector((state) => state.user);
    // const { users: reduxUsers } = useSelector((state) => state.user);
    // const { token } = useSelector((state) => state.user);

    // Array to store and filter tasks data
    const [tasksList, setTasksList] = useState([]);
    const [tasksFilterList, setTasksFilterList] = useState([]);

    // States for modals and selected task
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    // Fetch tasks when the component mounts
    useEffect(() => {
        dispatch(getTasksThunk(token));
    }, [dispatch, token]);
    // Update local tasks when Redux tasks change
    useEffect(() => {
        setTasksList(reduxTasks || []);
        setTasksFilterList(reduxTasks || []);
    }, [reduxTasks]);

    // Get Updated name from reduxUsers
    const getClientName = (clientId) => {
        const client = reduxUsers.find((user) => user._id === clientId);
        return client ? client.name : 'Unknown Client';
    };

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

    if (!reduxUsers || !reduxTasks) return <div>Loading data...</div>;
    if (tasksFilterList.length === 0) return <p>No tasks found.</p>;

    return (
        <div className='tasks-page crud-page'>
            <div className='title-container'>
                <h1 className='title'>Tasks</h1>
                <button className="button" onClick={() => createTask()}>
                    Create task <img className='icon' src={iconAdd} alt='delete icon' width='20px' height='20px'/>
                </button>
            </div>
            <div className='filter-bar-container'>
                <FilterTaskBar setTasksFilterList={setTasksFilterList} tasksList={tasksList} />
            </div>
            <ul className='items-container'>
                {tasksFilterList.map((task) => (
                    <li key={task._id} className='item'>
                        <div className='text-container'>
                            <p className='paragraph bold'>{getClientName(task.client._id)}</p>
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
                        setTasksList((prevTasks) => [...prevTasks, createdTask]);
                        closeModals();
                        notification('task-create');
                    }}
                />
            )}
            {deleteModal && selectedTask && (
                <DeleteTaskForm
                    task={selectedTask}
                    onCloseModals={closeModals}
                    onSave={(taskId) => {
                        setTasksList((prevTasks) => prevTasks.filter(task => task._id !== taskId));
                        closeModals();
                        notification('task-delete');
                    }}
                    />
                )}
            {editModal && selectedTask && (
                <EditTaskForm
                    task={selectedTask}
                    onCloseModals={closeModals}
                    onSave={(updatedTask) => {
                        setTasksList(prevTasks => prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task));
                        closeModals();
                        notification('task-edit');
                    }}
                />
            )}

        </div>
    );
};

export default Tasks;