import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/homePage';
import WorldViewPage from './pages/worldViewPage';
import MintNftPage from './pages/mintNftPage';
import NftMarketPage from './pages/nftMarketPage';
import MyPage from './pages/myPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/worldview' element={<WorldViewPage />} />
          <Route path='/mintnft' element={<MintNftPage />} />
          <Route path='/nftmarket' element={<NftMarketPage />} />
          <Route path='/mypage' element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
