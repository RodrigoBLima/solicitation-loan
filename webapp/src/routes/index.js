import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import React from 'react';
import SolicitationDetail from '../pages/Detail';
import ListSolicitations from '../pages/Solicitations';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/solicitation/" exact component={ListSolicitations} />
      <Route path="/solicitation/detail/:id" component={SolicitationDetail} />
    </BrowserRouter>
  );
}
