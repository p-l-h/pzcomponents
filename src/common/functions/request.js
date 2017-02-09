

import {toast, loading, unloading} from '../../components/Toast';

$(document).on('ajaxError', (xhr, options, error) => {
    unloading();
    toast('请求异常');
});

export function getJson (url, data, success) {

    loading();
    return $.getJSON(
        url + '?' + $.param(data),
        (response) => {
            unloading();
            if (response && (+response.code === 0 )) {
                success(response.data);
            }
            else {
                toast(response.msg || '请求出错了');
            }
        }
    );
}

export function doPost(url, data, success, always) {
    loading();

    return $.ajax(
        {
            url: url,
            data: data,
            type: 'POST',
            success: (response) => {
                unloading();
                if (response && (+response.code === 0)) {
                    success(response.data);
                }
                else {
                    toast(response.msg || '请求出错了');
                }
                always && always(response);
            },
            error: () => {
                toast('请求出错了');
            },
            complete: () => {
               unloading();
            }
        }
    );

}

export function postJson (url, data, success, always) {
    loading();
    return $.ajax(
        {
            url: url,
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json',
            success: (response) => {
                unloading();
                if (response && (+response.code === 0)) {
                    success(response.data);
                }
                else {
                    toast(response.msg || '请求出错了');
                }
                always && always(response);
            },
            error: () => {
                toast('请求出错了');
            },
            complete: () => {
               unloading();
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
