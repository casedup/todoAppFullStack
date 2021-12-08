const apiUrl = '/api/todos/';
export async function getTodos() {
    return fetch(apiUrl)
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
}
export async function createTodo(val) {
    return fetch(apiUrl, {
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
}

export async function removeTodo(id) {
    const deleteUrl = apiUrl+id;
    return fetch(deleteUrl, {
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
}

export async function updatedTodo(todo) {
    const updateUrl = apiUrl+todo._id;
        return fetch(updateUrl, {
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
}