import { SimpleForm, Edit, ListProps} from 'react-admin';

// in LatLongInput.js
import { Field } from 'react-final-form';
import { Labeled } from 'react-admin';

// db -> input
const getPointFormatter = (v: string) => {
    return JSON.stringify(v);
};
  
// input -> db
const getPointParser = (v: string) => {
    return JSON.parse(v);
};

const GeoPointInput = () => (
    <Labeled label="position">
        <span>
            <Field name="lat" component="input" type="number" placeholder="latitude" />
            &nbsp;
            <Field name="lng" component="input" type="number" placeholder="longitude" />
        </span>
    </Labeled>
);
export default GeoPointInput;