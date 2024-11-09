//Import styles and libs
import './App.scss';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout.jsx';
//Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store.js';
//Pages
import AboutDiego from './pages/AboutDiego.jsx';
import GraphicDesign from './pages/GraphicDesign.jsx';
import Homepage from './pages/Homepage.jsx';
import Portfolio from './pages/Portfolio.jsx';
import WebDevelopment from './pages/WebDevelopment.jsx';
// User Pages
import SignIn from './features/users/pages/SignIn.jsx';
import SignUp from './features/users/pages/SignUp.jsx';
import AllUsers from './features/users/pages/AllUsers.jsx';
import EditUserForm from './features/users/components/EditUserForm.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
        <Route index element={<Homepage />}/>
        <Route path="about" element={<AboutDiego />}/>
        <Route path="graphic" element={<GraphicDesign />}/>
        <Route path="home" element={<Homepage />}/>
        <Route path="portfolio" element={<Portfolio />}/>
        <Route path="webdevelopment" element={<WebDevelopment />}/>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="/users/edit/:id" element={<EditUserForm />} />
    </Route>
  )
)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
