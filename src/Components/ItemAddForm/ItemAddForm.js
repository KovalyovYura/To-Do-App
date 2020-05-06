import React, { useState } from "react";
import "./ItemAddForm.css"

export const ItemAddForm = ({ onAdded }) => {
    const [label, setLabel] = useState('');

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdded(label);
        setLabel('');
    };

    return (
        <form className="item-add-form d-flex"
              onSubmit={ handleSubmit }>
            <input type="text"
                   value={ label }
                   className="form-control"
                   onChange={ handleLabelChange }
                   placeholder="What needs to be done"/>
            <button
                className="form-control btn btn-outline-secondary btn-add-task">
                Add Task
            </button>
        </form>
    );
};

