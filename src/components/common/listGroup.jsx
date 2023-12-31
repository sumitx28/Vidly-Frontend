import PropTypes from 'prop-types';

const ListGroup = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) => {
  return (
    <div>
      <div className='list-group my-3'>
        {items.map((item) => (
          // eslint-disable-next-line
          <a
            className={
              item[valueProperty] === selectedItem[valueProperty]
                ? 'list-group-item list-group-item-action active'
                : 'list-group-item list-group-item-action'
            }
            aria-current='true'
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
          >
            {item[textProperty]}
          </a>
        ))}
      </div>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
