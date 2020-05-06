import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ToDoListItem from "../ToDoListItem";
import "./ToDoList.css"
import ChangeLabelModal from "../ChengeLabelModal";


const ToDoList = ({ items, onDeleted, onToggleImportant, onToggleDone}) => {
    const element = items.length === 0 ?
        <CSSTransition
            classNames={'note'}
            timeout={800}>
            <span style={{ textAlign: 'center'}}>No Items</span>
        </CSSTransition>:
        items.map((item) => {
        return (
            <CSSTransition
                key={item.id}
                classNames={'note'}
                timeout={800}>
                <li className="list-group-item" >
                    <ToDoListItem
                        {...item}
                        onToggleImportant={() => onToggleImportant(item.id)}
                        onToggleDone={() => onToggleDone(item.id)}
                        onDeleted={() => onDeleted(item.id)}
                    />
                </li>
            </CSSTransition>);
    })

    return (
        <TransitionGroup component='ul' className="list-group todo-list">
            {element}
        </TransitionGroup>);
};

export default ToDoList;