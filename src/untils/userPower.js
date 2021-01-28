import cookie from 'js-cookie'
import { Message } from 'element-ui';

export default function isPower() {
    const user = cookie.getJSON('user').userInfo
    const isPower = user.authority === 1 ? true : false
    if (isPower){
        return true;
    }else {
        Message.error('您没有该功能的访问权限！');
        return false;
    }
}