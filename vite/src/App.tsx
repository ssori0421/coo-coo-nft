import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/homePage';
import WorldViewPage from './pages/worldViewPage';
import CooCooGardenPage from './pages/coocooGardenPage';
import MyCoocooPage from './pages/myCoocooPage';
import DetailNftPage from './pages/detailNftPage';
import DetailWorldViewPage from './pages/detailWorldViewPage';
import AdminPage from './pages/adminPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/coocooGarden' element={<CooCooGardenPage />} />
          <Route path='/worldview' element={<WorldViewPage />} />
          <Route path='/worldview/:id' element={<DetailWorldViewPage />} />
          <Route path='/coocooGarden/:tokenId' element={<DetailNftPage />} />
          <Route path='/mycoocoo' element={<MyCoocooPage />} />
          <Route path='/mycoocoo' element={<MyCoocooPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
