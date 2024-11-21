// Styles and libs
import './App.scss';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout.jsx';
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store.js';
// Pages
import AboutDiego from './pages/AboutDiego.jsx';
import AreaCRM from './pages/AreaCRM.jsx';
import GraphicDesign from './pages/GraphicDesign.jsx';
import Homepage from './pages/Homepage.jsx';
import Portfolio from './pages/Portfolio.jsx';
import WebDevelopment from './pages/WebDevelopment.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
        <Route index element={<Homepage />}/>
        <Route path="about" element={<AboutDiego />}/>
        <Route path="crm" element={<AreaCRM />}/>
        <Route path="graphic" element={<GraphicDesign />}/>
        <Route path="home" element={<Homepage />}/>
        <Route path="portfolio" element={<Portfolio />}/>
        <Route path="webdevelopment" element={<WebDevelopment />}/>
    </Route>
  ),
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
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
