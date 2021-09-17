import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import lb4Provider from 'react-admin-lb4';

const App = () => (

        <Admin dataProvider={lb4Provider('http://localhost:3001')}>
          <Resource name="btns" list={ListGuesser} edit={EditGuesser}/>
        </Admin>
);

export default App;