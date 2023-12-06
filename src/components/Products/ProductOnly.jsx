import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import {ROUTES} from '../../utils/routes';

const ProductOnly = () => {
  <Routes>
    <Route index element={<Home />}/>
    <Route path={ROUTES.PRODUCT} element={<ProductOnly />} />
  </Routes>
}

export default ProductOnly
