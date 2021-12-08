import React, { Component } from 'react';
import TodoItem from './TodoItem';

const apiUrl = '/api/todos';
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }
    componentDidMount() {
        this.loadTodos();

    }
    loadTodos() {
        fetch(apiUrl)
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessage: data.message };
                            throw err;
                        })
                    } else {
                        let err = { errorMessage: 'Please try again later, server not responding.' }
                        throw err;
                    }
                }
                return resp.json();
            }).then(todos => this.setState({ todos }));
    }
    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem
            key={t._id}
            {...t}
            />
        ));
        return (
            <>
                <h1>Todo List</h1>
                <ul>{todos}</ul>     
            </>
            
        )
    }
}
export default TodoList;