//Import styles and libraries
import './__components.scss';
import React, { useEffect, useState } from 'react';

// ***************
// BackTopButton Component
// Displays a button to scroll back to the top when the user scrolls down the page
// ***************
export const BackTopButton = () => {
    // State to toggle button visibility
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        // Function to toggle visibility based on scroll position
        const handleScroll = () => {
            // Shows button when scrolled down more than 500px
            setShowScrollButton(window.scrollY > 500);
        };

        // Attach the scroll event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll back to top when button is clicked
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showScrollButton && (
                // Conditional rendering: only show button when showScrollButton is true
                <button onClick={scrollToTop} className="scrollTop">
                    <p>TOP</p>
                </button>
            )}
        </>
    );
};