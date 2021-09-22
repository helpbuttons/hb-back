import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const ButtonIcon = BookIcon;

export const ButtonList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created" />
            <TextField source="description" />
            <TextField source="tags" />
            <TextField source="geoplace" />
            <EditButton basePath="/Buttons" />
        </Datagrid>
    </List>
);

const ButtonTitle = ({ record }) => {
    return <span>Button {record ? `"${record.title}"` : ''}</span>;
};

export const ButtonEdit = (props) => (
    <Edit title={<ButtonTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiline: true }} />
            <TextInput multiline source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
);

export const ButtonCreate = (props) => (
    <Create title="Create a Button" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiline: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);