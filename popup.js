// Set up http request
const http = new XMLHttpRequest();
const handleLogin = response => {
    if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          console.log(http.responseText);
        } else {
          console.log('There was a problem with the request.');
        }
    }
}

// Get current domain
let domain = window.location.hostname;
domain = domain.replace('www.', '').replace('.com', '');

let username;
let password;

chrome.runtime.sendMessage({command: "fetch", data: {domain: domain}}, (response) => {
    let siteCheck = response.data && domain === 'orbitz'
    // For logged in user
    if(siteCheck){
        // Create html
        // Create components

        // Header Text
        let popupHeader = document.createElement('h1');
        popupHeader.style.cssText = 'line-height:40px;font-family:roboto;font-style:italic;'
        +'font-size:40px';
        popupHeader.innerHTML = 'MAXIMIZE YOUR REWARDS';
        // Subheader
        let popupSubHeader = document.createElement('h3');
        popupSubHeader.style.cssText = 'line-height:24px;font-family:roboto;font-style:regular;'
        +'font-size:16px;padding:1rem 0;';
        popupSubHeader.innerHTML = 'Log in using your ACME username and password to see your ACME Rewards Points.';
        // header container
        let header = document.createElement('div');
        header.style.cssText = 'display:block;width:100%;';
        header.appendChild(popupHeader);
        header.appendChild(popupSubHeader);

        // Forgot password link
        let forgotPasswordLink = document.createElement('p');
        forgotPasswordLink.className = '_popup__forgot'
        forgotPasswordLink.innerHTML = 'Forgot password?'
        let forgotPassword = document.createElement('div');
        forgotPassword.style.cssText = 'width:100%;display:flex;justify-content:flex-end;'
        +'cursor:pointer;text-decoration:underline;color:#DC3A3A;line-height:20px;font-size:12px;';
        forgotPassword.appendChild(forgotPasswordLink);

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
        passwordInput.id = 'password';
        let passwordInputLabel = document.createElement('p');
        passwordInputLabel.style.cssText = sharedLabelStyles;
        passwordInputLabel.innerHTML = 'Password';
        // Input Container
        let inputs = document.createElement('div');
        inputs.style.cssText = 'display:block;width:100%;padding:1rem 0;';
        inputs.appendChild(userNameInputLabel);
        inputs.appendChild(userNameInput);
        inputs.appendChild(passwordInputLabel);
        inputs.appendChild(passwordInput);
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
        // Button Container
        let buttons = document.createElement('div');
        buttons.style.cssText = 'width:100%;display:flex;justify-content:space-around;'
        +'padding:1rem 0;';
        buttons.appendChild(acmeButton);
        buttons.appendChild(loginButton);

        // Aggregate the popup.
        let basicPopUp = document.createElement('div');
        basicPopUp.className = '_popup__container';
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
    document.querySelector('._popup__login').addEventListener('click', event => {
        http.onreadystatechange = handleLogin;
        http.open('GET', 'https://lg2lkz0xif.execute-api.us-east-1.amazonaws.com/auth');
        http.send();
    })
    document.querySelector('._username__input').addEventListener('input', e => {
        username = e.target.value
    });
    document.querySelector('._password__input').addEventListener('input', e => {
        password = e.target.value
    });
    document.querySelector('._popup__forgot').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
    document.querySelector('._popup__acme').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
}