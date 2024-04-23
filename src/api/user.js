import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

/**
 * 登录接口
 *
 * @param loginInfo 登录信息
 * @return {Promise<{error}|any>}
 */
export async function login(loginInfo) {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/user/login', { params: loginInfo });
        return response.data;
    } catch (error) {
        return { error: error.response.data };
    }
}

/**
 * 获取用户信息
 * @param id 用户id
 * @return {Promise<{error}|any>}
 */
export async function queryUser(id) {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/user/query', { params: id });
        return response.data;
    } catch (error) {
        return { error: error.response.data };
    }
}

/**
 * 注册用户
 * @param user 注册用户信息
 * @return {Promise<{error}|any>}
 */
export async function register(user) {
    try {
        const response = await axios.put('http://localhost:8080/api/v1/user/add', user);
        return response.data;
    } catch (error) {
        return { error: error.response.data };
    }
}


/**
 * 更新用户信息
 * @param user 用户信息
 * @return {Promise<{error}|any>}
 */
export async function updateUser(user) {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/user/update`, user);
        return response.data;
    } catch (error) {
        return { error: error.response.data };
    }
}


/**
 * 修改头像
 * @param id
 * @param file
 * @return {Promise<{error}|any>}
 */
export async function updateAvatar(id, file) {
    try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/api/v1/user/update-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data; //新图片url
    } catch (error) {
        return { error: error.response.data };
    }
}

/**
 * 发送验证码请求
 * @param {string} phone 手机号
 * @returns {Promise<{error}|any>} 返回一个 Promise，包含发送验证码的结果或错误信息
 */
export async function sendVerificationCode(phone) {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/sms/send?phone=${phone}`);
        return response.data; // 返回服务器响应数据
    } catch (error) {
        return { error: error.response.data };
    }
}

/**
 * 手机验证码登录
 * @param phone 手机号
 * @param code 验证码
 * @returns {Promise<{error}|any>} 返回一个Promise，包含登录后的用户信息或错误信息
 */
export async function loginByPhone(phone, code) {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/user/message-login?phone=${phone}&code=${code}`);
        return response.data; // 返回服务器响应数据
    } catch (error) {
        return { error: error.response.data };
    }
}
