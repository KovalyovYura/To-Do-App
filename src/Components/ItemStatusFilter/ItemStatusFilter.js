import React from "react";
import "./ItemStatusFilter.css"


export const ItemStatusFilter = ({ onFilterClick, btnName }) => {
    const kindsOfButtons = [
        { name: 'all', label: 'All'},
        { name: 'active', label: 'Active'},
        { name: 'done', label: 'done'},
    ];
    const buttons = kindsOfButtons.map(({ name, label }) => {
        const active = name === btnName ? 'btn-info' : 'btn-outline-secondary';
        return (
            <button type="button"
                    key={name}
                    className={`form-control btn ${active}`}
                    onClick={() => onFilterClick(name)}
            >{ label }</button>
        );
    })
    return (
        <div className="btn-group item-status-filter">
            { buttons }
        </div>
    );

}


