import React from 'react';
import { Link } from 'react-router-dom';
import cities from '../data/cities';

const CityList = (props) => {
    return Object.keys(cities).map((key) => {
        return (
            <div key={key}>
                <Link to={`/${key}`} onClick={() => props.onSelect(key)}>
                    {cities[key].name}
                </Link>
            </div>
        );
    });
};

export default CityList;
