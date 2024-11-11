// import libs
import { Outlet } from 'react-router-dom';

// import components
import { BackTopButton } from '../components/Common';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RootLayout() {
    return (
        <div className='dp-wrapper'>
            <BackTopButton />
            <Header />
            <div className='contentDP'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout