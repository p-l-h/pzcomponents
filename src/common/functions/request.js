

import {toast, loading, unloading} from '../../components/Toast';

$(document).on('ajaxError', (xhr, options, error) => {
    // unloading();
    toast('请求异常');
});

export function getJson (url, data, success, error, always) {

    return $.ajax(
        {
            url,
            data,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (response && (+response.code === 0 )) {
                    success(response.data);
                }
                else {
                    toast(response.msg || '请求出错了');
                    error && error(response);
                }
            },
            error: () => {
                error && error();
            },
            complete: () =>  {
                always && always();
            }
        }
    );
}

export function doPost(url, data, success,error, always) {
    // loading();

    return $.ajax(
        {
            url: url,
            data: data,
            type: 'POST',
            success: (response) => {
                if (response && (+response.code === 0)) {
                    success(response.data);
                }
                else {
                    toast(response.msg || '请求出错了');
                    error && error(response);
                }

            },
            error: () => {
                toast('请求出错了');
                error && error();

            },
            complete: () => {
            //    unloading();
               always && always();
            }
        }
    );

}

export function postJson (url, data, success, error, always) {
    // loading();
    return $.ajax(
        {
            url: url,
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json',
            success: (response) => {
                if (response && (+response.code === 0)) {
                    success(response.data);
                }
                else {
                    toast(response.msg || '请求出错了');
                    error && error(response);
                }

            },
            error: () => {
                toast('请求出错了');
                error && error();
            },
            complete: () => {
            //    unloading();
               always && always();
            }
        }
    );
}

export function getJsonp(url, callback) {
    $.ajax({
        url: url,
        dataType: 'jsonp',
        success:  (response) => {
            callback(response);
        }
    });
}
