import { Admin, Resource } from "react-admin";
import hbDataProvider from './providers/hb.data-provider';
import './App.css';
import buttons from './models/buttons';

function App() {
  return (
    <Admin dataProvider={hbDataProvider("http://localhost:3001/admin")}>
      <Resource name="buttons" {...buttons} />
      {/* <Resource name="buttons" {...buttons} />, */}
      {/* <Resource name="templateButtons" list={ButtonList} /> */}
      {/* <Resource name="buttons" list={ButtonList} /> */}
      {/* <Resource name="templateButton" list={PostList} /> */}
        {/* <Resource name="users" list={UserList} /> */}
    </Admin>
  );
}

export default App;
