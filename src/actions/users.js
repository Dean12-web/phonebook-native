import axios from "axios";
const request = axios.create({
    baseURL: 'http://192.168.1.18:3001/',
    timeout: 2000,
    headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ5YzUxODk2MWZiNmE1ZGE0MDZjMjUxIiwiaWF0IjoxNjg4OTg2NTkzfQ.WBI_hQByYSlfxoBnz5U2bK9DQgfcI-S5eS-FKMnYcY0` }
});

const loadStudentSuccess = (students) => ({ type: "LOAD_STUDENT_SUCCESS", students })

const loadStudentFailure = () => ({ type: "LOAD_STUDENT_FAILURE", })

export const loadStudent = () => dispatch => request.get(`users`).then((response) => {
    if (response.data.success)
        dispatch(loadStudentSuccess(response.data.data.users))
    else
        dispatch(loadStudentFailure())
}).catch((e) => {
    console.log(e)
    dispatch(loadStudentFailure())
})

const addStudentDraw = (student) => ({ type: "ADD_STUDENT_DRAW", student })
const addStudentSuccess = (_id, student) => ({ type: "ADD_STUDENT_SUCCESS", _id, student })
const addStudentFailure = (_id) => ({ type: "ADD_STUDENT_FAILURE", _id })
export const addStudent = (email, password) => dispatch => {
    const _id = Date.now().toString() //Temporary ID, For Safety U can Us e UUID
    dispatch(addStudentDraw({ _id, email }))
    return request.post(`users`, { email, password }, {
    }).then((response) => {
        dispatch(addStudentSuccess(_id, response.data.data))
    }).catch((error) => {
        console.log(error)
        dispatch(addStudentFailure(_id))
    })
}

export const resendStudent = ({ _id, email, password }) => {
    request.post(`users`, { email, password }).then((response) => {
    }).catch(() => {

    })
}

const removeStudentSuccess = (_id) => ({ type: "REMOVE_STUDENT_SUCCESS", _id })
const removeStudentFailure = (_id) => ({ type: "REMOVE_STUDENT_FAILURE", _id })
export const removeStudent = (_id) => dispatch => request.delete(`users/${_id}`).then((response) => {
        dispatch(removeStudentSuccess(_id))
    }).catch((e) => {
        console.log(e)
        dispatch(removeStudentFailure())
    })


export const updateStudent = (_id, email) => {
    request.put(`users/${_id}`, { email }).then((response) => {
    }).catch(() => {
        alert('Update Gagal')
    })
}