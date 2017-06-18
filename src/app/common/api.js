import {API_URL} from '../../env';
import {fetchAPI,} from '../../common/api';

function fetchStudent() {
    const url = `${API_URL}student/list`;
    return fetchAPI(url);
}

function createStudent(name, phone, sex, birthday, email) {
    const body = JSON.stringify({
        name,
        phone,
        sex,
        birthday, email
    })
    const url = `${API_URL}student/create`;
    return fetchAPI(url, 'POST', body);
}
function updateStudent(id,name, phone, sex, birthday, email) {
    const body = JSON.stringify({
        id,
        name,
        phone,
        sex:1,
        birthday,
        email
    });
    const url = `${API_URL}student/update`;
    return fetchAPI(url, 'POST', body);
}
function getStudent(id) {
    const url = `${API_URL}student/get?id=${id}`;
    return fetchAPI(url);
}
function deleteStudent(id) {
    const body = JSON.stringify({
        id,
    });
    const url = `${API_URL}student/delete`;
    return fetchAPI(url, 'POST', body);
}

function getTypeScores() {
    const url = `${API_URL}type-scores/list`;
    return fetchAPI(url);
}
function getScores(id) {
    const url = `${API_URL}scores/list?id=${id}`;
    return fetchAPI(url);
}
export const API = {
    fetchStudent,
    createStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    getTypeScores,
    getScores
};
