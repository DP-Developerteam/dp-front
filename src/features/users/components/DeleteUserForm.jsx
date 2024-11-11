import React from 'react';

function DeleteUserForm({ user, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete the following user?</p>
                <p><strong>ID:</strong> {user._id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Company:</strong> {user.company}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirm Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserForm;
