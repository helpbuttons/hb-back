
import { Create, SimpleForm, TextInput, DateInput, List, Datagrid, DateField, TextField, EditButton, ListProps, Edit, required, ReferenceField, AutocompleteInput, ArrayInput, SimpleFormIterator } from 'react-admin'
import modelsUtils from '../modelsUtils';
    
    const buttonList = (props: ListProps) => (
        <List {...props}>
            <Datagrid>
              <TextField  source="id"/>
              <TextField  source="name"/>
              <TextField  source="description"/>
              <TextField  source="tags"/>
              <TextField  source="geoPlace"/>
              <TextField  source="type"/>
              <DateField  source="created"/>
              <DateField  source="modified"/>
              <EditButton basePath="/buttons" />
            </Datagrid>
          </List>
    );

    const buttonCreate = (props: ListProps) => (
        <Create {...props}>
         <SimpleForm>
              <TextInput source="id"/>
              <TextInput source="name"/>
              <TextInput source="description"/>
              <TextField  source="tags"/>
              
                    <TextInput source="geoPlace" parse={modelsUtils.geoPointParser}/>
              <AutocompleteInput source="type" choices={modelsUtils.buttonTypes}/>
              <DateField  source="created"/>
              <DateField  source="modified"/>
                 <EditButton basePath="/buttons" />
          </SimpleForm>
        </Create>
    );
    const buttonEdit = (props: ListProps) => (
        <Edit {...props}>
         <SimpleForm>
              <TextInput source="id"/>
              <TextInput source="name"/>
              <TextInput source="description"/>
              <TextField  source="tags"/>
              
                    <TextInput source="geoPlace" parse={modelsUtils.geoPointParser}/>
              <AutocompleteInput source="type" choices={modelsUtils.buttonTypes}/>
              <DateField  source="created"/>
              <DateField  source="modified"/>

          </SimpleForm>
        </Edit>
    );
    const buttons: any = {
        list: buttonList,
        create: buttonCreate,
        edit: buttonEdit,
        // show: buttonShow,
        // icon: buttonIcon,
    };
    export default buttons;