import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
    try {
        const url = type === 'password'
            ? '/api/v1/users/updateMyPassword'
            : '/api/v1/users/updateMe';

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated in successfully`);
            const photoPass = '/img/users/' + res.data.data.user.photo;
            document.querySelector('.form__user-photo').src = photoPass;
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};


