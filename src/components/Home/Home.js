import React from 'react';
import cx from "classnames";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './Home.css'

const Home = () => {

    const [todoItem, setTodoItem] = useState("");
    const [items, setItems] = useState([]);

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleAdd();
        }
    };

    const handleAdd = () => {
        if (todoItem) {
            setItems([
                {
                    id: uuidv4(),
                    message: todoItem,
                    done: false,
                },
                ...items,
            ]);

            setTodoItem("");
        }
    };

    const handleDone = (id) => {
        const _items = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    done: !item.done,
                };
            }

            return item;
        });

        setItems(_items);
    };

    return (
        <div className='h-screen text-center text-gray-100 bg-gray-900'>
            <div className="w-3/4 mx-auto">
                <div className="pt-12">
                    <h6 className="mb-2 text-xs uppercase">Learning Tailwind</h6>
                    <h1 className="text-4xl font-bold pt-10">Todo App</h1>
                </div>

                <div className="pt-12">
                    <input
                        type="text"
                        value={todoItem}
                        className="w-full rounded py-2 px-4 text-gray-900"
                        onChange={(e) => setTodoItem(e.target.value)}
                        onKeyDown={handleEnter}
                    />
                </div>

                <ul className="pt-12">
                    {items
                        .filter(({ done }) => !done)
                        .map(({ id, message }) => (
                            <li
                                key={id}
                                className='item py-3 border border-t-0 border-gray-700'
                                onClick={() => handleDone(id)}
                            >
                                {message}
                            </li>
                        ))}

                    {items
                        .filter(({ done }) => done)
                        .map(({ id, message }) => (
                            <li
                                key={id}
                                className='item py-3 border border-t-0 border-gray-700 done'
                                onClick={() => handleDone(id)}
                            >
                                {message}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;