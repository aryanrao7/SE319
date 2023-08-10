import React, { useEffect, useState } from 'react';
import Messages from './Messages';

const api_base = 'http://localhost:3001';

function Todos() {
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("oldest");

    useEffect(() => {
        GetTodos();
    }, []);

    const GetTodos = () => {
        fetch(api_base + '/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch((err) => console.error("Error: ", err));
    }

    const completeTodo = async id => {
        const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());
        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }

            return todo;
        }));
    }

    const addTodo = async () => {
        const data = await fetch(api_base + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo
            })
        }).then(res => res.json());
        setTodos([...todos, data]);

        setPopupActive(false);
        setNewTodo("");
    }

    const deleteTodo = async id => {
        const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
        setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
    }

    const renderFilterButtons = () => (
        <div className="filter-buttons">
            <div className="button" onClick={() => toggleFilter("all")}>All</div>
            <div className="button" onClick={() => toggleFilter("complete")}>Complete</div>
            <div className="button" onClick={() => toggleFilter("incomplete")} >Incomplete</div>
        </div>
    );

    const toggleFilter = (filterName) => {
        setFilter(filterName);
    };

    const toggleSort = (sortName) => {
        setSort(sortName);
    };

    const renderSortButtons = () => (
        <div className="sort-buttons">
            <div className="button" onClick={() => toggleSort("oldest")} >Oldest</div>
            <div className="button" onClick={() => toggleSort("newest")} >Newest</div>

        </div>
    );
    const renderTodos = () => {
        let filteredTodos = todos.filter(todo => {
            if (filter === "all") {
                return true;
            } else if (filter === "complete") {
                return todo.complete;
            } else {
                return !todo.complete;
            }
        });

        let sortedTodos = filteredTodos.sort((a, b) => {
            if (sort === "newest") {
                return b.date - a.date;
            } else {
                return a.date - b.date;
            }
        });



        return (
            <div className="todos">
                {sortedTodos.length > 0 ? sortedTodos.map(todo => (
                    <div className={
                        "todo" + (todo.complete ? " is-complete" : "")
                    } key={todo._id} onClick={() => completeTodo(todo._id)}>
                        <div className="checkbox"></div>

                        <div className="text">{todo.text}</div>

                        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
                    </div>
                )) : (
                    <h3>You currently have no tasks</h3>
                )}
            </div>
        );
    };

    const renderAddPopup = () => (
        <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false)}>
                X
            </div>
            <div className="content">
                <h3>Add Task</h3>
                <input
                    type="text"
                    className="add-todo-input"
                    onChange={(e) => setNewTodo(e.target.value)}
                    value={newTodo}
                />
                <div className="button" onClick={addTodo}>
                    Create Task
                </div>
            </div>
        </div>
    );

    return (
        <>
            {renderFilterButtons()}
            {renderSortButtons()}
            {renderTodos()}

            <div className="addPopup" onClick={() => setPopupActive(true)}>
                +
            </div>

            {popupActive && renderAddPopup()}

            <Messages />
        </>
    );
}

export default Todos;
