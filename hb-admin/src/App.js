import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
// import lb4Provider from "react-admin-lb4";
import lb4Provider from "ra-data-lb4";

const App = () => (

        <Admin dataProvider={lb4Provider('http://localhost:3001')}>
          <Resource name="roles" list={ListGuesser} edit={EditGuesser}/>
        </Admin>
);

export default App;