/* eslint-disable */

firebase.initializeApp({ messagingSenderId: '227656153170' });

firebase.messaging().requestPermission().then(function () {
    messaging.getToken().then(function (currentToken) {
        if (currentToken) {
            fetch('/api/v1/user/' + currentToken + '/push', { credentials: 'include' });
        }
    })
});
