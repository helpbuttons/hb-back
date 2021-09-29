const fs = require('fs').promises;

async function writeToFile(path, content) {
    await fs.writeFile(path, content,{ flag: 'w+' }, err => {console.log('failed.. ' + err)});
  }

const models =
[{
    name: 'button',
    definition:
    {
        list: [
            { 'source': 'id', 'type': 'text', 'readonly': true},
            { 'source': 'name', 'type': 'text' },
            { 'source': 'description', 'type': 'text' },
            { 'source': 'tags', 'type': 'array',  'readonly': true},
            { 'source': 'geoPlace', 'type': 'geoPoint' },
            { 'source': 'type', 'type': 'choice', 'choices': 'buttonTypes' },
            { 'source': 'created', 'type': 'date', 'readonly': true },
            { 'source': 'modified', 'type': 'date', 'readonly': true },
        ],
        icon: 'BookIcon',
    },
}];


function createNewModel(model) {
    let string = '';
    string = string + `
import { Create, SimpleForm, TextInput, DateInput, List, Datagrid, DateField, TextField, EditButton, ListProps, Edit, required, ReferenceField, AutocompleteInput, ArrayInput, SimpleFormIterator } from 'react-admin'
import modelsUtils from '../modelsUtils';
    `;

    if (model.preModel) {
        string += model.preModel;
    }

    string += `
    const ${model.name}List = (props: ListProps) => (
        <List {...props}>
            <Datagrid>\n`;
            string += getFields('list',model);
    string += `              <EditButton basePath="/${model.name}s" />
            </Datagrid>
          </List>
    );\n`;

    string += `
    const ${model.name}Create = (props: ListProps) => (
        <Create {...props}>
         <SimpleForm>\n`;
         string += getFields('create',model);
    string += `                 <EditButton basePath="/${model.name}s" />
          </SimpleForm>
        </Create>
    );`;

    string += `
    const ${model.name}Edit = (props: ListProps) => (
        <Edit {...props}>
         <SimpleForm>\n`;
         string += getFields('edit',model);
    string +=`
          </SimpleForm>
        </Edit>
    );`;

    string +=`
    const ${model.name}s: any = {
        list: ${model.name}List,
        create: ${model.name}Create,
        edit: ${model.name}Edit,
        // show: ${model.name}Show,
        // icon: ${model.name}Icon,
    };
    export default ${model.name}s;`

    return string;
}

function getFields(crudAction, items) {
    let string = '';
    items.definition.list.forEach((item) => {
        string += `              ${getFieldType(crudAction, item, item.readonly)}\n`;
        
    });
    return string;
}

function getFieldType(crudAction, item, readonly)
{
    
    switch(crudAction) {
        case 'list':
            switch(item.type) {
                case 'date':
                    return `<DateField  source="${item.source}"/>`;
                case 'choice':
                case 'geoPoint':
                case 'array':
                case 'text':
                default:
                    return `<TextField  source="${item.source}"/>`;
            }
        case 'edit':
        case 'create':
            switch(item.type) {
                case 'date':
                    if (readonly) {
                        return `<DateField  source="${item.source}"/>`;    
                    }
                    return `<DataInput  source="${item.source}"/>`;
                case 'choice':
                    if (readonly) {
                        return `<TextField  source="${item.source}"/>`;    
                    }
                    return `<AutocompleteInput source="${item.source}" choices={modelsUtils.${item.choices}}/>`;
                case 'geoPoint':
                    if (readonly) {
                        return `<TextField  source="${item.source}"/>`;    
                    }
                    return `
                    <TextInput source="${item.source}" parse={modelsUtils.geoPointParser}/>`
                    ;
                    case 'array':
                        if (readonly) {
                            return `<TextField  source="${item.source}"/>`;    
                        }
                        return `
                        <ArrayInput source="${item.source}">
      <SimpleFormIterator>
        <TextInput source="" parse={modelsUtils.arrayParser}/>
      </SimpleFormIterator>
    </ArrayInput>
                        `;
                case 'text':
                default:
                    return `<TextInput source="${item.source}"/>`;
            }
        default:
            return '';
    }
}

function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

models.forEach((model) => {
    let generatedCode = createNewModel(model);
    // console.log(generatedCode);
    console.log('Generated model ' + model.name);
    writeToFile(`./src/models/${(model.name)}s.tsx`, generatedCode);
});

