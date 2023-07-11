export default function users(state = [], action) {
    switch (action.type) {
        case 'LOAD_STUDENT_SUCCESS':
            return action.students.map(item => ({ ...item, sent: true }))
        case 'ADD_STUDENT_DRAW':
            return [{ ...action.student, sent: true }, ...state]
        case 'ADD_STUDENT_SUCCESS':
            return state.map(item => {
                if (item._id === action._id) {
                    item._id = action.student._id
                }
                return item
            })
        case 'ADD_STUDENT_FAILURE':
            return state.map(item => {
                if (item._id === action._id) {
                    item.sent = false
                }
                return item
            })
        case 'REMOVE_STUDENT_SUCCESS':
            return state.filter(item => item._id !== action._id)
        case 'REMOVE_STUDENT_FAILURE':
        case 'LOAD_STUDENT_FAILURE':
        default:
            return state
    }
}