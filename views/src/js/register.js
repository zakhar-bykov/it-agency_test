$(document).ready(() => {
    $('form').submit(e => {
        e.preventDefault()

        // validation
        const login = $('input#login').val().trim()
        const email = $('input#email').val().trim()
        const password = $('input#password').val().trim()

        const regexpLogin = new RegExp(/[\ !"#$%&'()*+,\/\\:;<=>?@[\]^`{|}~]/)
        const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        if ( regexpLogin.test(login) )
            return toastr.error('login cannot contain spec symbols except: _ - .')

        if ( !regexpEmail.test(email) )
            return toastr.error('email is invalid')

        if (password.length < 8 || password.length > 70)
            return toastr.error('password length must be less then 70 symbols and more them 7')

        $.ajax({
            url: '/api/register',
            method: 'POST',
            data: {
                login: login,
                email: email,
                password: password,
            },
            statusCode: {
                200: res => {
                    toastr.success(res.responseText)
                    setTimeout(() => window.location = '/', 1000)
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