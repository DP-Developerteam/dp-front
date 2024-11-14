// import libs
import { Outlet } from 'react-router-dom';

// import components
import { ScrollToTop, BackTopButton } from '../components/Common';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RootLayout() {
    return (
        <div className='dp-wrapper'>
            <ScrollToTop />
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