$(document).ready(() => {
    $('form').submit(e => {
        e.preventDefault()

        const loginEmail = $('input#login-email').val().trim()
        const password = $('input#password').val().trim()

        if ( !loginEmail )
            return toastr.error('login or email is null')

        if ( !password )
            return toastr.error('password is null')

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                loginEmail: $('input#login-email').val(),
                password: $('input#password').val(),
            },
            statusCode: {
                200: res => {
                    window.location = '/'
                },
                401: res => {
                    toastr.error(res.responseText)
                },
                409: res => {
                    toastr.error(res.responseText)
                },
                500: res => {
                    toastr.error(res.responseText)
                }
            },
            success: res => {

            }
        })
    })
})