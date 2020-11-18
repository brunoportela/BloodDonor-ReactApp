import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
};

const formatData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
});

export const fetchAll = () => dispath => {
    api.dCandidate().fetchAll()
        .then(res => {
            dispath({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data
            });
        }
        )
        .catch(err => console.log(err));
};

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    api.dCandidate().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess();
        })
        .catch(err => console.log(err));
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data);
    api.dCandidate().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess();
        })
        .catch(err => console.log(err));
}

export const delete_ = (id, onSuccess) => dispatch => {
    api.dCandidate().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess();
        })
        .catch(err => console.log(err));
}