// Import styles and libraries
// import '../../../App.scss'; -> it's imported in tasks.scss
import '../__tasks.scss';
import React, { useEffect, useState } from 'react';
// Import redux and slices
import { useSelector, useDispatch } from 'react-redux';
import { getTasksThunk } from '../taskSlice';
// Import custom hooks
import { formatYearMonth, calcTime, TimerNotification } from '../hooks/dateManager';
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
    // REDUX
    const dispatch = useDispatch();
    const { tasks: reduxTasks, errorMessage } = useSelector((state) => state.task);
    const { users: reduxUsers, token } = useSelector((state) => state.user);
    // Array to store and filter tasks data
    const [tasksList, setTasksList] = useState([]);
    const [tasksFilterList, setTasksFilterList] = useState([]);
    // State for current task
    const [currentTask, setCurrentTask] = useState();
    // States for modals and selected task
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');
    // States for task timer
    const [timerModal, setTimerModal] = useState(false);

    // Fetch tasks when the component mounts
    useEffect(() => {
        dispatch(getTasksThunk(token));
    }, [dispatch, token]);
    // Update local tasks when Redux tasks change
    useEffect(() => {
        setTasksList(reduxTasks || []);
        setTasksFilterList(reduxTasks || []);
    }, [reduxTasks]);

    // Get Updated name or company from reduxUsers
    const getClient = (clientId, key) => {
        const client = reduxUsers.find((user) => user._id === clientId);
        return key === 'name' && client
            ? client.name
            :key === 'company' && client
            ? client.company
            :key === 'client' && client
            ? `${client.name} - ${client.company}`
            : 'Unknown Client'
    };

    // Calculate Task Duration with hook dateManager
    const calculateTaskDuration = (taskStart, taskEnd) => {
        if (!taskStart || !taskEnd) return 'Task started';
        // Call function in custom hook dateManager
        return calcTime(taskStart, taskEnd);
    };

    // Calculate Task Duration with hook dateManager
    const callFormatYearMonth = (taskStart) => {
        // Call function in custom hook dateManager
        return formatYearMonth(taskStart);
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
     // TIMER. Show timer modal
    const timer = () => {
        setTimerModal(true);
    };
    // Close Timer
    const closeTimer = () => {
        setTimerModal(false);
    }
    // Close  all modals
    const closeModals = () => {
        // Set all states to false. Add here all modals/states created in the file
        setDeleteModal(false);
        setEditModal(false);
        setCreateModal(false);
        setSelectedTask(null);
    };

    // Display error message if fetching failed
    if (errorMessage) return <div>{errorMessage}</div>;

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
            {!reduxUsers || !reduxTasks ? (
                <div>Loading data...</div>
            ) : (
                <>
                    {/* No Tasks Found */}
                    {tasksFilterList.length === 0 ? (
                        <p>No tasks found.</p>
                    ) : (
                        <ul className='items-container'>
                            {tasksFilterList.map((task) => (
                                <li key={`task-${task._id}`} className='item'>
                                    <div className='text-container'>
                                        <p className='paragraph bold'>{getClient(task.client._id, 'client')}</p>
                                        <p className='paragraph description'>{callFormatYearMonth(task.dateStart)} - Duration: {calculateTaskDuration(task.dateStart, task.dateEnd)}</p>
                                        <p className='paragraph description'>{task.description}</p>
                                    </div>
                                    <div className='buttons-container'>
                                        <button className='icon' onClick={() => selectTaskDelete(task)}>
                                            <img className='icon' src={iconDelete} alt='delete icon' width='20px' height='20px' />
                                        </button>
                                        <button className='icon' onClick={() => selectTaskEdit(task)}>
                                            <img className='icon' src={iconEdit} alt='edit icon' width='20px' height='20px' />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}

            {notificationModal && (
                <Notifications
                    type={notificationType}
                    onCloseNotification={closeNotification}
                />
            )}
            {timerModal && (
                <TimerNotification
                    task={currentTask}
                    onSave={(timerTask) => {
                        closeTimer();
                        setTasksList((prevTasks) =>
                            prevTasks.map(task => task._id === timerTask._id ? timerTask : task)
                        );
                        notification('task-edit');
                    }}
                />
            )}
            {createModal && (
                <CreateTaskForm
                    onCloseModals={closeModals}
                    onSave={(createdTask) => {
                        setCurrentTask(createdTask)
                        setTasksList((prevTasks) => [...prevTasks, createdTask]);
                        closeModals();
                        notification('task-create');
                        timer()
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
                        setCurrentTask(updatedTask)
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