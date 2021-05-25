// Set up state
let username;
let password;
let points;

// Shared styles
const italicized = 'font-style:italic;';
const fontFamily = 'font-family:roboto;';
const bold = 'font-family:roboto;';
const acmeRed = '#DC3A3A';
const hidden = 'display:none;';
const pointer = 'cursor:pointer;';
const redText = `color:${acmeRed};`;
const whiteText = 'color:white;';
const redBackground = `background:${acmeRed};`;
const whiteBackground = `background:white;`;
const fullWidth = 'width:100%;';
const verticalPadding = 'padding:1rem 0;';

const sharedSubheaderStyles = `line-height:24px;font-family:roboto;font-style:regular;font-size:16px;${verticalPadding}`;
const sharedLabelStyles = 'font-family:roboto;line-height:16px;font-size:14px;font-weight:bold;';
const sharedInputStyles = `${fullWidth}border:1px solid black;height:50px;`;
const sharedButtonStyles = `height:51px;width:49%;border-radius:5px;${pointer}`
    +'z-index:9999;display:flex;justify-content:center;align-items:center;'
    +`${fontFamily}${italicized}${bold}line-height:19px;font-size:16px;`;

// Set up http request
const http = new XMLHttpRequest();
const handleLogin = e => {
    if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
            const response = JSON.parse(http.response);
            if (response.statusCode === 200) {
                const user = JSON.parse(response.body);
                // Points Subheader
                points = `<p style="font-size:20px;color=red">${user.points} points.</p>`;
                let pointsSubHeader = document.createElement('h3');
                pointsSubHeader.className = '_subheader__points'
                pointsSubHeader.style.cssText = 'line-height:24px;font-style:regular;'
                +`font-size:16px;${fontFamily}${verticalPadding}${hidden}`;
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

// Generate button
const generateButton = (className, styles, innerHTML, container) => {
    let button = document.createElement('div');
    button.className = className;
    button.style.cssText = sharedButtonStyles+styles;
    button.innerHTML = innerHTML;
    container.appendChild(button);
}

// Generate Subheader
const generateSubheader = (className, styles, innerHTML, container) => {
    let subheader = document.createElement('h3');
    subheader.className = '_subheader__logged'
    subheader.style.cssText = sharedSubheaderStyles+hidden;
    subheader.innerHTML = 'Make the most of your points on your trip. Book using your ACME Rewards Points today!';
    container.appendChild(subheader)
}

chrome.runtime.sendMessage({command: "fetch", data: {domain: domain}}, (response) => {
    let siteCheck = response.data && domain === 'orbitz'
    // For logged in user
    if(siteCheck){
        // Create html
        // Create components

        // Header Text
        let popupHeader = document.createElement('h1');
        popupHeader.style.cssText = 'line-height:40px;font-family:roboto;font-style:italic;'
        +`font-size:40px;width:85%;${bold}`;
        popupHeader.innerHTML = 'MAXIMIZE YOUR REWARDS';
        // Close Button
        let closeButton = document.createElement('p')
        closeButton.className = '_close';
        closeButton.innerHTML = 'X Close'
        closeButton.style.cssText = `font-size:12px;${redText}`
        // Header container
        let headerContainer = document.createElement('div');
        headerContainer.appendChild(popupHeader);
        headerContainer.appendChild(closeButton);
        headerContainer.style.cssText = `${fullWidth}display:flex;`
        let header = document.createElement('div');
        header.className = "_header";
        header.style.cssText = `display:block;${fullWidth}`;
        header.appendChild(headerContainer);
        // Default Subheader
        generateSubheader(
            '_subheader__default',
            sharedSubheaderStyles,
            'Log in using your ACME username and password to see your ACME Rewards Points.',
            header
        );
        // Logged In Subheader
        generateSubheader(
            '_subheader__logged',
            sharedSubheaderStyles+hidden,
            'Make the most of your points on your trip. Book using your ACME Rewards Points today!',
            header
        );

        // Forgot password link
        let forgotPasswordLink = document.createElement('p');
        forgotPasswordLink.className = '_popup__forgot';
        forgotPasswordLink.innerHTML = 'Forgot password?';
        let forgotPassword = document.createElement('div');
        forgotPassword.style.cssText = `${fullWidth}display:flex;justify-content:flex-end;`
        +`cursor:pointer;text-decoration:underline;${redText}line-height:20px;font-size:12px;`;
        forgotPassword.appendChild(forgotPasswordLink);
        // Login error text
        let errorText = document.createElement('p');
        errorText.className = "_error";
        errorText.style.cssText = `line-height:20px;font-size:12px;${redText}${hidden}`
        errorText.innerHTML = 'The password and username do not match our records.'

        // Input Username
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
        inputs.style.cssText = `display:block;${fullWidth}${verticalPadding}`;
        inputs.appendChild(userNameInputLabel);
        inputs.appendChild(userNameInput);
        inputs.appendChild(passwordInputLabel);
        inputs.appendChild(passwordInput);
        inputs.appendChild(errorText);
        inputs.appendChild(forgotPassword);

        // Button Container
        let buttons = document.createElement('div');
        buttons.style.cssText = `${fullWidth}display:flex;justify-content:space-around;${verticalPadding}`
        // ACME Button
        generateButton(
            '_popup__acme',
            `border:3px solid #DC3A3A;${whiteBackground}${redText}`,
            '<p>VISIT ACME</p>',
            buttons
        )
        // Login Button
        generateButton(
            '_popup__login',
            `border:1px solid #DC3A3A;${redBackground}${whiteText}`,
            '<p>LOGIN</p>',
            buttons
        )
        // Points Button
        generateButton(
            '_popup__points',
            `border:1px solid #DC3A3A;${redBackground}${whiteText}${hidden}`,
            '<p>VIEW POINTS</p>',
            buttons
        )
        // Logout Button
        generateButton(
            '_popup__logout',
            `border:3px solid #DC3A3A;${whiteBackground}${redText}${hidden}`,
            '<p>LOGOUT</p>',
            buttons
        )
        // Book with ACME Button
        generateButton(
            '_popup__book',
            `border:1px solid #DC3A3A;${redBackground}${whiteText}${hidden}`,
            '<p>BOOK WITH ACME</p>',
            buttons
        );

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
        +`${whiteBackground}color:black;`
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
    // View points button action
    document.querySelector('._popup__points').addEventListener('click', () => {
        document.querySelector('._subheader__logged').style.display = 'none';
        document.querySelector('._subheader__points').style.display = 'block';
        document.querySelector('._popup__logout').style.display = 'flex';
        document.querySelector('._popup__book').style.display = 'flex';
        document.querySelector('._popup__acme').style.display = 'none';
        document.querySelector('._popup__points').style.display = 'none';
    })
    // Book with ACME button
    document.querySelector('._popup__book').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
}