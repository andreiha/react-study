import React from 'react';
import './app.css';
import AppHeader from '../components/app-header';
import SearchPanel from '../components/search-panel';
import ItemStatusFilter from '../components/item-status-filter';
import TodoList from '../components/todo-list';

class App extends React.Component {
    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 },
        ],
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];
            return {
                todoData: newArray,
            };
        });
    };

    render() {
        return (
            <div className='todo-app'>
                <AppHeader toDo={1} done={3} />
                <div className='top-panel d-flex'>
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
            </div>
        );
    }
}

export default App;
