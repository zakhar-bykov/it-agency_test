$(document).ready(() => {
    $('#logout').click(() => {
        $.ajax({
            url: '/api/logout',
            method: 'POST',
            statusCode: {
                205: res => {
                    toastr.success(res.responseText)
                    setTimeout(() => window.location = '/', 500)
                },
                409: res => {
                    toastr.error(res.responseText)
                    setTimeout(() => window.location = '/', 1000)
                }
            },
            success: res => {

            }
        })
    })
})