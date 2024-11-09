// Import styles and libraries
import './__components.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function Footer() {
    // i18n translations
    const { t } = useTranslation();

    // Access user role from Redux
    const { role, isLoggedIn } = useSelector((state) => state.user);

    return (
        <footer className="footer">
            <footer className='footerNavContainer'>
                <NavLink className='tab' to='/'>
                    <p>{t('nav.home')}</p>
                </NavLink>
                {isLoggedIn && role === 'employee' && (
                    <NavLink className='tab' to='/users'>{t('nav.user')}</NavLink>
                )}
            </footer>
        </footer>
    );
}

export default Footer;