import React, { useContext, useState, useEffect } from 'react';
import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import ToDoList from "../ToDoList";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";
import "./Todo.css"
import {FirebaseContext} from "../../Context/firebase/firebaseContext";
import {Loader} from "../Loader";
import {AlertContext} from "../../Context/Alert/alertContext";
export const Todo = () => {

    const { loading, items, fetchItems,
        removeItem, addItem, markAsImportant, markAsDone } = useContext(FirebaseContext);

    useEffect(() => {
        fetchItems()
        // eslint-disable-next-line
    }, [])

    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const alert = useContext(AlertContext);

    const handleAddItem = (text) => {
        if(text.trim()){
            addItem(text.trim())
            alert.show('Task successfully added', 'success');
        } else{
            alert.show('Please enter task before submit')
        }
    };
    const deleteHandle = (id) => {
        removeItem(id)
        alert.show('Task deleted successfully', 'success')
    }

    const handleToggleImportant = (itemId) => {
        markAsImportant(itemId);
    };

    const handleToggleDone = (itemId) => {
        markAsDone(itemId);
    };

    function searchItems(items, term){
        if(term.length === 0)
            return items;
        return items.filter(({label}) => label.toLowerCase().includes(term.toLowerCase()));
    }

    function myFilter(item, filter){
        switch (filter) {
            case 'all': return item;
            case 'active': return  item.filter(({done}) => !done);
            case 'done': return item.filter(({done}) => done)
            default: return item;
        }
    }


    const handleTermChange = (term) => {
        setTerm(term);
    };

    const handleFilterClick = (filter) => {
        setFilter(filter);
    };

    const visibleItems = myFilter(searchItems(items, term),filter);
    const doneCount = items.filter(({done}) => done).length;
    const toDoDone = {toDo: items.length - doneCount, done: doneCount};
    return (
        <div >
            <AppHeader {...toDoDone}/>
            <div className="top-panel d-flex">
                <SearchPanel onTermChange={ handleTermChange }/>
                <ItemStatusFilter onFilterClick={ handleFilterClick } btnName={filter}/>
            </div>
            {loading ? <Loader/> : <ToDoList items={visibleItems}
                                             onDeleted={ deleteHandle }
                                             onToggleImportant={ handleToggleImportant }
                                             onToggleDone={ handleToggleDone }
                                            />}

            <ItemAddForm onAdded={ handleAddItem }
                         />
        </div>
    );
};

