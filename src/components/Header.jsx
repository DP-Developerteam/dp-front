// Import styles and libraries
import './__components.scss';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import Redux hooks
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/users/userSlice';
//Import images/icons
// import Isologotipo from '../assets/img/menu-icon.svg';
import MenuIcon from '../assets/img/menu-icon.svg';
import MenuOpenIcon from '../assets/img/menu-open-icon.svg';
import FlagUk from '../assets/img/flag-uk.svg';
import FlagSpain from '../assets/img/flag-spain.svg';
import FlagGermany from '../assets/img/flag-germany.svg';





function Header() {
    //Translations variables and hooks
    const { t, i18n } = useTranslation();
    const languages = [
        { code: "en", name: "United Kingdom", flag: FlagUk },
        { code: "es", name: "Spanish", flag: FlagSpain },
        { code: "de", name: "German", flag: FlagGermany },
    ];

    //Menu variables and functions
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    //Users related variables, hooks and function
    //Hook for navigation and location (URL)
    const navigate = useNavigate();
    // REDUX Initialize dispatch to update info of userSlice
    const dispatch = useDispatch();

    // Function to SignOut
    const signOut = () => {
        // Clear user information from Redux
        dispatch(clearUser());
        // Close Menu
        closeMenu();
        // Redirect to SignIn
        navigate('/crm');
        // window.location.reload();
    };
    // REDUX Variable to know if user is logged in or not. Used to render of the buttons.
    const { isLoggedIn } = useSelector((state) => state.user);

    return (
    <header className='header'>
            <NavLink className='tab' onClick={closeMenu} to='/'>
                <p>LOGO</p>
                {/* <img className='logo' src={Isologotipo} alt='isologotipo' /> */}
            </NavLink>
            <button className='buttonMenu' onClick={toggleMenu}>
                <img className='icon' src={isMenuOpen ? MenuOpenIcon : MenuIcon} alt='menu icon' />
            </button>

            <nav className={`navContainer ${isMenuOpen ? 'open' : 'closed'}`}>
                <NavLink className='tab' onClick={closeMenu} to='/'>{t('nav.home')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='portfolio'>{t('nav.portfolio')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='graphic'>{t('nav.graphic')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='webdevelopment'>{t('nav.webdevelopment')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='about'>{t('nav.about')}</NavLink>

                {isLoggedIn && (
                    <p className='tab' onClick={signOut}>{t('nav.signOut')}</p>
                )}

                <div className='languagesBox'>
                    {languages.map(language => (
                        <button className='language' onClick={() => {i18n.changeLanguage(language.code); console.log(language.code)}} key={language.code}>
                            <img className='flag' src={language.flag} alt={`${language.name} flag`} />
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Header