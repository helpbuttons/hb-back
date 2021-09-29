import Chip from '@material-ui/core/Chip'

const TextArrayField = ({ record, source }) => {
  const array = record[source]
  if (typeof array === 'undefined' || array === null || array.length === 0) {
    return <div/>
  } else {
    return (
      <>
        {array.map(item => <Chip label={item} key={item}/>)}
      </>
    )    
  }
}
TextArrayField.defaultProps = { addLabel: true }

export default TextArrayField;