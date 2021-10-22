import axios from 'axios';
import { getCurrentUser } from '../utils/user';

const currentUser = getCurrentUser();
axios.defaults.headers.common['Authorization'] = currentUser?.token;

export default axios;
