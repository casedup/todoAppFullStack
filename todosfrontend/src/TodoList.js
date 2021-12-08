import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const apiUrl = '/api/todos/';
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
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
            })
            .then(todos => this.setState({ todos }));
    }
    addTodo(val) {
        fetch(apiUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type':'application/json',
            }),
            body: JSON.stringify({name: val})
        })
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
        })
        .then(newTodo => {
            this.setState({todos: [...this.state.todos, newTodo]})
        });
    }
    deleteTodo(id) {
        const deleteUrl = apiUrl+id;
        fetch(deleteUrl, {
            method: 'DELETE'
        })
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
        })
        .then(() => {
            const todos = this.state.todos.filter(todo => todo._id !== id);
            this.setState({todos:todos});
        });

    }
    toggleTodo(todo) {
        const updateUrl = apiUrl+todo._id;
        fetch(updateUrl, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type':'application/json',
            }),
            body: JSON.stringify({completed: !todo.completed})
        })
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
        })
        .then((updatedTodo) => {
            const todos = this.state.todos.map(t =>
                (t._id === updatedTodo._id)
                ? {...t, completed: !t.completed}
                : t
                )
            this.setState({todos:todos});
        });

    }
    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem
            key={t._id}
            {...t}
            onDelete={this.deleteTodo.bind(this,t._id)}
            onToggle={this.toggleTodo.bind(this, t)}
            />
        ));
        return (
            <>
                <h1>Todo List</h1>
                <TodoForm addTodo={this.addTodo} />
                <ul>{todos}</ul>     
            </>
            
        )
    }
}
export default TodoList;