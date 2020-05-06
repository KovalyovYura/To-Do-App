import React, { useState } from "react";
import "./SearchPanel.css"


export const SearchPanel = ({ onTermChange }) => {
    const [term, setTerm] = useState('');

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setTerm(term);
        onTermChange(term)
    };

    return (
        <input
            className="form-control search-input"
            type="text"
            placeholder="Type to search"
            value={term}
            onChange={ handleSearchChange }

        />);
}

