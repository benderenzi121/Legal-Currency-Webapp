import React from 'react'

export const Pagination = ({ productsPerPage,totalProducts,paginate}) => {
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(totalProducts / productsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
            <div className='row'>
                <div className='pagination'>
                {pageNumbers.map(number => (
                    <div className='col-1'> 
                        <li key={number} >
                            <a className='pagination__number' href='#!'onClick={() => paginate(number)}  className=''>{number}</a>
                        </li>
                    </div>
                ))}
                </div>
                </div>
            </ul>
        </nav>
    )
}
export default Pagination;