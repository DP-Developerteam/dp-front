import React, { useState } from 'react';

// Import data from REDUX
import { useSelector } from 'react-redux';

// Import components
import Notifications from '../components/Notifications.jsx';

// User & Tasks Pages
import Users from '../features/users/pages/Users.jsx';
import Tasks from '../features/tasks/pages/Tasks.jsx';
import SignIn from '../features/users/pages/SignIn.jsx';

function AreaCRM() {

    // Access user state from Redux to check if logged in
    const user = useSelector((state) => state.user);
    const isLoggedIn = !!user.token; // Replace with your actual auth check logic

    // State to manage the SignIn modal
    const [showSignInModal, setShowSignInModal] = useState(!isLoggedIn);
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    // NOTIFICATION. Show create modal
    const notification = (type) => {
        setNotificationType(type);
        setNotificationModal(true);
    };
    // Close Notification
    const closeNotification = () => {
        setNotificationModal(false);
    }
    // Close SignIn modal
    const closeSignInModal = () => {
        setShowSignInModal(false);
    };

    return (
        <div className='page'>
            <div className='layout-crm'>
                {/* Show SignIn Modal if not logged in */}
                {showSignInModal && !isLoggedIn && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <SignIn
                                onSignInSuccess={() => {
                                    notification('signin');
                                    closeSignInModal();
                                }}
                            />
                        </div>
                    </div>
                )}
                {/* CRM Page Content (only visible if logged in) */}
                {isLoggedIn && (
                    <>
                        <Users />
                        <Tasks />
                    </>
                )}
                {notificationModal && (
                    <Notifications
                        type={notificationType}
                        onCloseNotification={closeNotification}
                    />
                )}
            </div>
        </div>
    )
}

export default AreaCRM