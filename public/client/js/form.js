$(function() {
    if (window.location.pathname === '/loginPage') {
        $('.signup-form').remove()
        $('.register').remove()
        $('.loggedIn-form').remove()
        $('.login').on('click', login);
    }

    if (window.location.pathname === '/registerPage') {
        $('.login-form').remove()
        $('.loggedIn-form').remove()
        $('.signup').on('click', signup);
    }

    if (window.location.pathname === '/loggedIn') {
        $('.login-form').remove()
        $('.signup-form').remove()
        $('.info').remove()
            // $("#signUpButton").remove();

    }




})

function validInput(names) {
    for (let i = 0; i < names.length; i++) {
        if (!$('[name="' + names[i] + '"]').val()) {
            return false;
        }
    }
    return true;
}

function login(e) {
    e.preventDefault();
    if (!validInput(['username', 'password'])) return;
    $.ajax('/login', {
        method: 'POST',
        data: {
            username: $('[name="username"]').val(),
            password: $('[name="password"]').val()
        }
    }).then(({ user, authToken }) => {
        $.cookie('auth_token', authToken.token, { expires: 7 });
        if (!user) throw new Error('invalid username or password');
        window.location = "/loggedIn"
    }).catch((err) => alert(err.responseText))
}

function signup(e) {
    e.preventDefault();
    if (!validInput(['username', 'password', 'email'])) return;
    $.ajax('/register', {
        method: 'POST',
        data: {
            username: $('[name="username"]').val(),
            email: $('[name="email"]').val(),
            password: $('[name="password"]').val()
        }
    }).then(({ user, authToken }) => {
        if (user && authToken.token) {
            $.cookie('auth_token', authToken.token, { expires: 7 });
            window.location = '/loggedIn'
        } else {
            throw new Error('something went wrong')
        }
    }).catch((err) => alert(err.responseText))
}