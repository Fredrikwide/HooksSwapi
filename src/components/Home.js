import React, { useState, useEffect, useMemo } from 'react'
import Axios from 'axios'

const Home = (props) => {

    const [type, setType] = useState('people')
    const [items, setItems] = useState([])

    const handleClick = (e) => {
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

        console.log(`you clicked me andmy state is ${type}`)
    }

    useEffect(() => {
        console.log(`Side-effect triggered due to change in either resource, page or counter state variable`);

        Axios.get(`https://swapi.dev/api/${type}/`)
            .then(res => {
                console.log("Request returned a result:", res.data);
                setItems(res.data.results);
                console.log(items)
            });
    }, [type]);

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
                    <div className='btn-group'>
                        <button className="btn btn-secondary">previous</button>
                        <button className="btn btn-primary">next</button>
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
