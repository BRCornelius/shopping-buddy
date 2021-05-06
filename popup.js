// Set up state
let username;
let password;
let points;

// Set up http request
const http = new XMLHttpRequest();
const handleLogin = e => {
    if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
            const response = JSON.parse(http.response);
            if (response.statusCode === 200) {
                const user = JSON.parse(response.body);
                console.log(user)
                // Points Subheader
                points = `<p style="font-size:20px;color=red">${user.points} points.</p>`;
                let pointsSubHeader = document.createElement('h3');
                pointsSubHeader.className = '_subheader__points'
                pointsSubHeader.style.cssText = 'line-height:24px;font-family:roboto;font-style:regular;'
                +'font-size:16px;padding:1rem 0;display:none';
                pointsSubHeader.innerHTML = `You currently have ${points}`;
                document.querySelector('._header').appendChild(pointsSubHeader);
                document.querySelector('._subheader__default').style.display = 'none';
                document.querySelector('._inputs').style.display = 'none';
                document.querySelector('._popup__login').style.display = 'none';
                document.querySelector('._subheader__logged').style.display = 'block';
                document.querySelector('._popup__points').style.display = 'flex';
                document.querySelector('._error').style.display = 'none';
            } else if (response.statusCode === 300) {
                document.querySelector('._error').style.display = 'block';
            }
        } else {
            console.log('There was a problem with the request.');
        }
    }
}

// Get current domain
let domain = window.location.hostname;
domain = domain.replace('www.', '').replace('.com', '');

chrome.runtime.sendMessage({command: "fetch", data: {domain: domain}}, (response) => {
    let siteCheck = response.data && domain === 'orbitz'
    // For logged in user
    if(siteCheck){
        // Create html
        // Create components

        // Header Text
        let popupHeader = document.createElement('h1');
        popupHeader.style.cssText = 'line-height:40px;font-family:roboto;font-style:italic;'
        +'font-size:40px;font-weight:bold;width:85%;';
        popupHeader.innerHTML = 'MAXIMIZE YOUR REWARDS';
        // Close Button
        let closeButton = document.createElement('p')
        closeButton.className = '_close';
        closeButton.innerHTML = 'X Close'
        closeButton.style.cssText = 'font-size:12px;color: #DC3A3A;'
        // Header container
        let headerContainer = document.createElement('div');
        headerContainer.appendChild(popupHeader);
        headerContainer.appendChild(closeButton);
        headerContainer.style.cssText = 'width:100%;display:flex;'
        // Default Subheader
        let popupSubHeader = document.createElement('h3');
        popupSubHeader.className = '_subheader__default'
        popupSubHeader.style.cssText = 'line-height:24px;font-family:roboto;font-style:regular;'
        +'font-size:16px;padding:1rem 0;';
        popupSubHeader.innerHTML = 'Log in using your ACME username and password to see your ACME Rewards Points.';
        // Logged In Subheader
        let popupSubHeaderLoggedIn = document.createElement('h3');
        popupSubHeaderLoggedIn.className = '_subheader__logged'
        popupSubHeaderLoggedIn.style.cssText = 'line-height:24px;font-family:roboto;font-style:regular;'
        +'font-size:16px;padding:1rem 0;display:none';
        popupSubHeaderLoggedIn.innerHTML = 'Make the most of your points on your trip. Book using your ACME Rewards Points today!';
        // header
        let header = document.createElement('div');
        header.className = "_header";
        header.style.cssText = 'display:block;width:100%;';
        header.appendChild(headerContainer);
        header.appendChild(popupSubHeader);
        header.appendChild(popupSubHeaderLoggedIn);

        // Forgot password link
        let forgotPasswordLink = document.createElement('p');
        forgotPasswordLink.className = '_popup__forgot';
        forgotPasswordLink.innerHTML = 'Forgot password?';
        let forgotPassword = document.createElement('div');
        forgotPassword.style.cssText = 'width:100%;display:flex;justify-content:flex-end;'
        +'cursor:pointer;text-decoration:underline;color:#DC3A3A;line-height:20px;font-size:12px;';
        forgotPassword.appendChild(forgotPasswordLink);
        // Login error text
        let errorText = document.createElement('p');
        errorText.className = "_error";
        errorText.style.cssText = 'line-height:20px;font-size:12px;color:#DC3A3A;display:none;'
        errorText.innerHTML = 'The password and username do not match our records.'

        // Input Username
        const sharedLabelStyles = 'font-family:roboto;line-height:16px;font-size:14px;font-weight:bold';
        const sharedInputStyles = 'width:100%;border:1px solid black;height:50px';
        let userNameInput = document.createElement('input');
        userNameInput.className = '_username__input';
        userNameInput.style.cssText = sharedInputStyles;
        userNameInput.id = 'userName';
        let userNameInputLabel = document.createElement('p');
        userNameInputLabel.style.cssText = sharedLabelStyles;
        userNameInputLabel.innerHTML = 'Username';
        // Input Password
        let passwordInput = document.createElement('input');
        passwordInput.className = '_password__input';
        passwordInput.style.cssText = sharedInputStyles;
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        let passwordInputLabel = document.createElement('p');
        passwordInputLabel.style.cssText = sharedLabelStyles;
        passwordInputLabel.innerHTML = 'Password';
        // Input Container
        let inputs = document.createElement('div');
        inputs.className = '_inputs';
        inputs.style.cssText = 'display:block;width:100%;padding:1rem 0;';
        inputs.appendChild(userNameInputLabel);
        inputs.appendChild(userNameInput);
        inputs.appendChild(passwordInputLabel);
        inputs.appendChild(passwordInput);
        inputs.appendChild(errorText);
        inputs.appendChild(forgotPassword);

        // Login Button
        let sharedButtonStyles = 'height:51px;width:49%;border-radius:5px;cursor:pointer;'
        +'z-index:9999;display:flex;justify-content:center;align-items:center;'
        +'font-family:roboto;font-style:italic;line-height:19px;font-size:16px;'
        +'font-weight:bold;';
        let loginButton = document.createElement('div');
        loginButton.className = '_popup__login';
        loginButton.style.cssText = sharedButtonStyles
        +'border:1px solid #DC3A3A;background:#DC3A3A;color:white;';
        loginButton.innerHTML = '<p>LOGIN</p>';
        // Acme button
        let acmeButton = document.createElement('div');
        acmeButton.className = '_popup__acme';
        acmeButton.style.cssText = sharedButtonStyles
        +'border:3px solid #DC3A3A;background:white;color:#DC3A3A;';
        acmeButton.innerHTML = '<p>VISIT ACME</p>';
        // Points button
        let pointsButton = document.createElement('div');
        pointsButton.className = '_popup__points';
        pointsButton.style.cssText = sharedButtonStyles
        +'border:1px solid #DC3A3A;background:#DC3A3A;color:white;display:none;';
        pointsButton.innerHTML = '<p>VIEW POINTS</p>';
        // Logout Button
        let logoutButton = document.createElement('div');
        logoutButton.className = '_popup__logout';
        logoutButton.style.cssText = sharedButtonStyles
        +'border:3px solid #DC3A3A;background:white;color:#DC3A3A;display:none';
        logoutButton.innerHTML = '<p>LOGOUT</p>';
        // Book ACME button
        let acmeBookButton = document.createElement('div');
        acmeBookButton.className = '_popup__book';
        acmeBookButton.style.cssText = sharedButtonStyles
        +'border:1px solid #DC3A3A;background:#DC3A3A;color:white;display:none;';
        acmeBookButton.innerHTML = '<p>BOOK WITH ACME</p>';
        // Button Container
        let buttons = document.createElement('div');
        buttons.style.cssText = 'width:100%;display:flex;justify-content:space-around;'
        +'padding:1rem 0;';
        buttons.appendChild(acmeButton);
        buttons.appendChild(loginButton);
        buttons.appendChild(pointsButton);
        buttons.appendChild(logoutButton);
        buttons.appendChild(acmeBookButton);

        // Aggregate the popup.
        let basicPopUp = document.createElement('div');
        basicPopUp.className = '_popup';
        basicPopUp.id = 'popup';
        basicPopUp.display = 'none';
        // add components to the popup
        basicPopUp.appendChild(header);
        basicPopUp.appendChild(inputs);
        basicPopUp.appendChild(buttons);
        // Add styles
        basicPopUp.style.cssText = 'width:400px;position:fixed;top:25px;right:10px;'
        +'border:1px solid black;border-radius:5px;'
        +'background:white;color:black;'
        +'z-index:9000;padding:1rem;';
        // Add to page
        document.body.appendChild(basicPopUp);

        createEvents();

    }
})

const createEvents = () => {
    // Login button action
    document.querySelector('._popup__login').addEventListener('click', event => {
        http.onreadystatechange = handleLogin;
        http.open('POST', 'https://ee1huftgdh.execute-api.us-east-1.amazonaws.com/prod/auth');
        http.send(JSON.stringify({
            username: username,
            password: password
        }));
    })
    // Logout button action
    document.querySelector('._popup__logout').addEventListener('click', e => {
        document.querySelector('._popup').style.display = 'none';
    });
    // Input handlers
    document.querySelector('._username__input').addEventListener('input', e => {
        username = e.target.value;
    });
    document.querySelector('._password__input').addEventListener('input', e => {
        password = e.target.value;
    });
    // Forgot password action
    document.querySelector('._popup__forgot').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
    // ACME button action
    document.querySelector('._popup__acme').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
    // Close action
    document.querySelector('._close').addEventListener('click', () => {
        document.querySelector('._popup').style.display = 'none';
    })
    // View points button
    document.querySelector('._popup__points').addEventListener('click', () => {
        document.querySelector('._subheader__logged').style.display = 'none';
        document.querySelector('._subheader__points').style.display = 'block';
        document.querySelector('._popup__logout').style.display = 'flex';
        document.querySelector('._popup__book').style.display = 'flex';
        document.querySelector('._popup__acme').style.display = 'none';
        document.querySelector('._popup__points').style.display = 'none';
    })

}