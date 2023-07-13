import axios from "axios"

const request = axios.create({
    baseURL: `http://192.168.1.18:3001/`,
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
})

const loadPhonebookSuccess = (phonebooks, pages) => ({ type: "LOAD_PHONEBOOK_SUCCESS", phonebooks, pages })

const loadPhonebookFailure = () => ({ type: "LOAD_PHONEBOOK_FAILURE" })

export const updateParams = (params) => ({
    type: 'UPDATE_PARAMS',
    params
});
export const fetchData = () => (dispatch, getState) => {
    const { page, searchQuery, sortBy, sortMode } = getState().pagination
    request.get(`api/phonebooks?page=${page}`,{
        params:{
            sortBy : sortBy,
            sortMode: sortMode,
            name : searchQuery,
            phone: searchQuery
        }
    } ).then((response) => {
        dispatch(loadPhonebookSuccess(response.data.data.phonebooks, response.data.data.pages))
    }).catch((error) => {
        console.log(error)
        dispatch(loadPhonebookFailure())
    })
}
/** end load phonebooks */

const addPhonebookDraw = (phonebook) => ({ type: "ADD_PHONEBOOK_DRAW", phonebook })
const addPhonebookSuccess = (id, phonebook) => ({ type: "ADD_PHONEBOOK_SUCCESS", id, phonebook })
const addPhonebookFailure = (id) => ({ type: "ADD_PHONEBOOK_FAILURE", id })
export const addUser = (name, phone) => dispatch => {
    const id = Date.now()
    dispatch(addPhonebookDraw({ id: id, name: name, phone: phone }))
    return request.post(`api/phonebooks`, { name, phone }).then((response) => {
        console.log(response.data.data.phonebooks)
        dispatch(addPhonebookSuccess(id, response.data.data.phonebooks))
    }).catch((error) => {
        console.log(error)
        dispatch(addPhonebookFailure(id))
    })
}
/** end add phonebooks */
const updatePhonebookSuccess = (id, phonebook) => ({ type: "UPDATE_PHONEBOOK_SUCCESS", id, phonebook })
const updatePhonebookFailure = (id) => ({ type: "UPDATE_PHONEBOOK_FAILURE", id })
export const updateUser = (id, name, phone) => dispatch => {
    return request.put(`api/phonebooks/${id}`, { name, phone }).then((response) => {
        dispatch(updatePhonebookSuccess(id, response.data.data.phonebook))
    }).catch((error) => {
        console.log(error)
        dispatch(updatePhonebookFailure())
    })
}
/** end update phonebooks */

const removePhonebookSuccess = (id) => ({ type: "REMOVE_PHONEBOOK_SUCCESS", id })
const removePhonebookFailure = (id) => ({ type: "REMOVE_PHONEBOOK_FAILURE", id })
export const removeUser = (id) => dispatch => request.delete(`api/phonebooks/${id}`).then((response) => {
    dispatch(removePhonebookSuccess(id))
}).catch((error) => {
    console.log(error)
    dispatch(removePhonebookFailure())
})
