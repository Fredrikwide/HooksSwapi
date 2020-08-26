import React, { useState, useEffect, useMemo } from 'react'
import Axios from 'axios'

const paginateArray = (items, page, itemsPerPage) => {

    console.log(`Paginating array for page ${page} with ${itemsPerPage} items per page`, items);

    return items.slice(
        page * itemsPerPage - itemsPerPage,
        page * itemsPerPage
    );
}




const Home = (props) => {

    const [type, setType] = useState('people')
    const [items, setItems] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [page, setPage] = useState(1); // 2

    const handleClick = (e) => {
        setPage(1)
        switch (e.target.innerText) {
            case 'Vehicles': setType('vehicles')
                break;
            case 'People': setType('people')
                break;
            case 'Planets': setType('planets')
                break;
            case 'Starships': setType('starships')
                break;
        }

        console.log(`you clicked me and my state is ${type}`)
    }

    useEffect(() => {
        console.log(`Side-effect triggered due to change in either page or type state variable`);

        if (page === 1) {
            Axios.get(`http://swapi.dev/api/${type}/`)
                .then(res => {
                    console.log("Request returned a result:", res.data);
                    setItems(res.data.results);
                    console.log(res.data.results)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            Axios.get(`http://swapi.dev/api/${type}/?page=${page}`)
                .then(res => {
                    console.log("Request returned a result:", res.data);
                    setItems(res.data.results);
                    console.log(res.data.results)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [page]);

    return (
        <>
            <div className="wrapper">
                <div className="navi">
                    <h1>SWAPI with HOOKS</h1>
                </div>
                <div className="butNav">
                    <div className="btn-group mb-3">
                        <button className="btn btn-warning" onClick={handleClick}>People</button>
                        <button className="btn btn-success" onClick={handleClick}>Starships</button>
                        <button className="btn btn-danger" onClick={handleClick}>Vehicles</button>
                        <button className="btn btn-light" onClick={handleClick}>Planets</button>
                    </div>
                </div>
                <div>
                    <h3>Showing {itemsPerPage} {type} at page {page}</h3>
                    <div className="d-flex justify-content-between">
                        <button onClick={() => page > 1 ? setPage(page - 1) : ''} className="btn btn-info">Previous Page</button>
                        <button onClick={() => setPage(page + 1)} className="btn btn-info">Next Page</button>
                    </div>
                </div>
                <div className='itemMap'>
                    <ul>
                        {items.map((item, index) => (<li key={index}>{item.name}</li>))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home
