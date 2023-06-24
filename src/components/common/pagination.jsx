import _ from 'lodash';

const Pagination = (props) => {
  const { pageSize, totalItems, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(totalItems / pageSize);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            className={currentPage === page ? 'page-item active' : 'page-item'}
            key={page}
          >
            <button className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
