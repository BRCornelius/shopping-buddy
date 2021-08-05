// Captured variables
let username;
let password;

const helvetica = 'Helvetica Neue'
const fontFamilyLight = `${helvetica} Light`;
const fontFamilyRegular = `${helvetica} Regular`;
const fontFamilyMedium = `${helvetica} Medium`;
const fontFamilyBold = `${helvetica} Bold`;

const defaultColor = '#006FCF';
const darkBlue = '#00175A';
const lightGrey = '#333333';
const errorRed = '#B42C01';

// Http request
const http = new XMLHttpRequest();
const handleLogin = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
            const response = JSON.parse(http.response);
            if (response.statusCode === 200) {
                const user = JSON.parse(response.body);
                document.querySelector('._subheader__points').style.display = 'block';
                document.querySelector('._subheader__points').innerHTML = `You currently have ${user.points} points.`;
                document.querySelector('._subheader__default').style.display = 'none';
                document.querySelector('._inputs').style.display = 'none';
                document.querySelector('._button__login').style.display = 'none';
                document.querySelector('._subheader__logged').style.display = 'block';
                document.querySelector('._button__amex').style.display = 'none';
                document.querySelector('._button__logout').style.display = 'flex';
                document.querySelector('._button__book').style.display = 'flex';
                document.querySelector('._error').style.display = 'none';
                document.querySelector('._subheader__login').style.display = 'none';
                document.querySelector('._subheader__default').style.display = 'block';
                document.querySelector('._header__default').innerHTML = 'Your Platinum points go further.';
                document.querySelector('._banner').style.display = 'flex';
            } else if (response.statusCode === 300) {
                // document.querySelector('._error__icon').src = 'https://assets.corneliuses.com/photos/iSeatz/error_triangle.png';
                // document.querySelector('._error__text').style.color = errorRed;
                document.querySelector('._error').style.display = 'inline-flex';
            }
        } else {
            console.log('There was a problem with the request.');
        }
    }
}

// Handle domain
let domain = window.location.hostname;
domain = domain.replace('www.', '').replace('.com', '');
// Set up array of sites that allow the popup.
const positiveSites = ['marriott', 'kayak']
const checkDomain = positiveSites.includes(domain);

// Generate button
const sharedButtonStyles = 'height:51px;width:45%;border-radius:5px;cursor:pointer;'
+'z-index:999999;display:flex;justify-content:center;align-items:center;'
+`font-family:${fontFamilyMedium};line-height:19px;font-size:16px;`
+'font-weight:bold;';
const solidButtonStyles = `${sharedButtonStyles}border:1px solid ${defaultColor};background:${defaultColor};color:white;`
const outlinedButtonStyles = `${sharedButtonStyles}border:3px solid ${defaultColor};background:white;color:${defaultColor};`
const generateButton = (className, styles, innerHTML, container) => {
    let button = document.createElement('div');
    button.className = className;
    button.style.cssText = sharedButtonStyles+styles;
    button.innerHTML = innerHTML;
    container.appendChild(button);
}
const headerStyles = `line-height:44px;font-family:${fontFamilyLight};color:${darkBlue};`
+'font-size:38px;width:100%;font-weight:lighter;margin:0;';

chrome.runtime.sendMessage({command: "fetch", data: {domain: domain}}, (response) => {
    let siteCheck = response.data && checkDomain
    // For logged in user
    if(siteCheck){
        // Banner
        let banner = document.createElement('div');
        banner.className = '_banner';
        banner.style.cssText = `width:100%;height:33px;background:${lightGrey};display:inline-flex;align-items:center;`
        +'padding-left:0.5rem;';
        let bannerCardImage = document.createElement('img');
        bannerCardImage.style.cssText = 'height:30px;width:200px;';
        bannerCardImage.src = 'https://assets.corneliuses.com/photos/iSeatz/FHR-bug.jpg';
        banner.appendChild(bannerCardImage);
        // Header Text
        let popupHeader = document.createElement('h1');
        popupHeader.className = "_header__default";
        popupHeader.style.cssText = headerStyles;
        popupHeader.innerHTML = '$200 Hotel Credit';
        // Close Button
        let closeButton = document.createElement('p')
        closeButton.className = '_close';
        closeButton.innerHTML = 'X'
        closeButton.style.cssText = `font-size:16px;color:${defaultColor};font-weight:bold;cursor:pointer;padding-right:0.5rem;`
        // Header container
        const headerContainer = document.createElement('div');
        headerContainer.appendChild(popupHeader);
        headerContainer.appendChild(closeButton);
        headerContainer.style.cssText = 'width:95%;display:flex;justify-content:space-between;'
        // Default Subheader
        const sharedSubheaderStyles = `line-height:24px;font-family:${fontFamilyRegular};color:${lightGrey};`
        + 'font-size:16px;font-style:regular;';
        const popupSubHeader = document.createElement('h3');
        const partnerLink = document.createElement('h3');
        partnerLink.innerHTML = 'AmexTravel.com.';
        partnerLink.style.cssText = 'color:blue;text-decoration:underline;cursor:pointer;font-size:16px;'
        partnerLink.className = '_link';
        popupSubHeader.className = '_subheader__default'
        popupSubHeader.style.cssText = sharedSubheaderStyles;
        popupSubHeader.innerHTML = `Save by getting $200 back in statement credits on prepaid Fine Hotel + Resorts® or The Hotel Collection bookings with American Express Travel when you pay with your Platinum Card®. Terms Apply.`;
        const popupSubHeaderLogin = document.createElement('h3');
        popupSubHeaderLogin.className = '_subheader__login';
        popupSubHeaderLogin.style.cssText = sharedSubheaderStyles+'display:none;';
        popupSubHeaderLogin.innerHTML = 'Log in below to see points balance and book on';
        popupSubHeaderLogin.appendChild(partnerLink);
        // Logged In Subheader
        const popupSubHeaderLoggedIn = document.createElement('h3');
        popupSubHeaderLoggedIn.className = '_subheader__logged'
        popupSubHeaderLoggedIn.style.cssText = sharedSubheaderStyles+'display:none;';
        popupSubHeaderLoggedIn.innerHTML = 'Ready to Travel? Membership Reward Points can help you get there.';
        // Points Subheader
        let pointsSubHeader = document.createElement('h3');
        pointsSubHeader.className = '_subheader__points'
        pointsSubHeader.style.cssText = `line-height:24px;font-family:${fontFamilyRegular};font-style:regular;display:none;`
        +'font-size:20px;padding:1rem 0;';
        // header
        const header = document.createElement('div');
        header.className = "_header";
        header.style.cssText = 'display:block;width:95%;padding-top:1rem;padding-left:1rem;';
        header.appendChild(headerContainer);
        header.appendChild(pointsSubHeader)
        header.appendChild(popupSubHeader);
        header.appendChild(popupSubHeaderLogin);
        header.appendChild(popupSubHeaderLoggedIn);

        // Forgot password link
        let forgotPasswordLink = document.createElement('p');
        forgotPasswordLink.className = '_button__forgot';
        forgotPasswordLink.innerHTML = 'Forgot password?';
        let forgotPassword = document.createElement('div');
        forgotPassword.style.cssText = 'width:100%;display:flex;justify-content:flex-end;'
        +`cursor:pointer;text-decoration:underline;color:${defaultColor};line-height:24px;font-size:16px;`;
        forgotPassword.appendChild(forgotPasswordLink);

        // Login error container
        const error = document.createElement('div');
        error.className = '_error';
        error.style.cssText = 'line-height:20px;display:none;padding-left:0.5rem;align-items:center;'
        // Error icon
        const errorIcon = document.createElement('img');
        errorIcon.className = '_error__icon';
        errorIcon.src = 'https://assets.corneliuses.com/photos/iSeatz/error_triangle.png';
        errorIcon.style.cssText = 'height:16px;width:16px'
        // Login error text
        let errorText = document.createElement('p');
        errorText.className = "_error__text";
        errorText.style.cssText = `font-size:12px;color:${errorRed};padding-left:0.5rem;`
        errorText.innerHTML = 'The password and username do not match our records.'
        error.appendChild(errorIcon);
        error.appendChild(errorText);

        // Input Username
        const sharedLabelStyles = `font-family:${fontFamilyBold};line-height:16px;font-size:14px;font-weight:bold;`;
        const sharedInputStyles = 'width:100%;border:1px solid black;height:50px;padding-left:5px;';
        let userNameInput = document.createElement('input');
        userNameInput.className = '_input__username';
        userNameInput.style.cssText = sharedInputStyles;
        userNameInput.id = 'userName';
        let userNameInputLabel = document.createElement('p');
        userNameInputLabel.style.cssText = sharedLabelStyles;
        userNameInputLabel.innerHTML = 'Username';
        // Input Password
        let passwordInput = document.createElement('input');
        passwordInput.className = '_input__password';
        passwordInput.style.cssText = sharedInputStyles;
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        let passwordInputLabel = document.createElement('p');
        passwordInputLabel.style.cssText = sharedLabelStyles;
        passwordInputLabel.innerHTML = 'Password';
        // Input Container
        let inputs = document.createElement('div');
        inputs.className = '_inputs';
        inputs.style.cssText = 'display:none;width:92%;padding:0.75rem;';
        inputs.appendChild(userNameInputLabel);
        inputs.appendChild(userNameInput);
        inputs.appendChild(passwordInputLabel);
        inputs.appendChild(passwordInput);
        inputs.appendChild(forgotPassword);

        // Button Container
        let buttons = document.createElement('div');
        buttons.style.cssText = 'width:100%;display:flex;justify-content:space-around;'
        +'padding:1rem 0;';
        // Points Button
        generateButton('_button__points_outline', outlinedButtonStyles, '<p>View Points Balance</p>', buttons);
        // Logout Button
        generateButton('_button__logout',outlinedButtonStyles+'display:none;', '<p>Log Out</p>', buttons);
        // Book with AMEX Button
        generateButton('_button__book', solidButtonStyles, '<p>Book with AMEX Travel</p>', buttons);
        // Amex Button
        generateButton('_button__amex', outlinedButtonStyles+'display:none;', '<p>Book with AMEX Travel</p>', buttons);
        // Login Button
        generateButton('_button__login', solidButtonStyles+'display:none;', '<p>Login to Rewards</p>', buttons);
        // Solid Points Button
        generateButton('_button__points_solid', solidButtonStyles+'display:none;', '<p>View Points Balance</p>', buttons);

        // Aggregate the popup.
        let basicPopUp = document.createElement('div');
        basicPopUp.className = '_popup';
        basicPopUp.id = 'popup';
        basicPopUp.display = 'none';
        // add components to the popup
        basicPopUp.appendChild(banner);
        basicPopUp.appendChild(header);
        basicPopUp.appendChild(inputs);
        basicPopUp.appendChild(buttons);
        basicPopUp.appendChild(error);

        // Add styles
        basicPopUp.style.cssText = 'width:400px;position:fixed;top:25px;right:10px;'
        +'border:1px solid black;border-radius:5px;'
        +'background:white;color:black;'
        +'z-index:99000;';
        // Add to page
        document.body.appendChild(basicPopUp);

        createEvents();

    }
})

const createEvents = () => {
    // Login button action
    document.querySelector('._button__login').addEventListener('click', event => {
        http.onreadystatechange = handleLogin;
        http.open('POST', 'https://ee1huftgdh.execute-api.us-east-1.amazonaws.com/prod/auth');
        http.send(JSON.stringify({
            username: username,
            password: password
        }));
    })
    // Logout button action
    document.querySelector('._button__logout').addEventListener('click', e => {
        document.querySelector('._popup').style.display = 'none';
    });
    // Input handlers
    document.querySelector('._input__username').addEventListener('input', e => {
        username = e.target.value;
    });
    document.querySelector('._input__password').addEventListener('input', e => {
        password = e.target.value;
    });
    // Forgot password action
    document.querySelector('._button__forgot').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
    // AMEX button action
    document.querySelector('._button__amex').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
    // AMEX link action
    document.querySelector('._link').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
    // Close action
    document.querySelector('._close').addEventListener('click', () => {
        document.querySelector('._popup').style.display = 'none';
    })
    // View points button action
    document.querySelector('._button__points_outline').addEventListener('click', () => {
        document.querySelector('._banner').style.display = 'none';
        document.querySelector('._header__default').innerHTML = 'View Points Balance';
        document.querySelector('._inputs').style.display = 'block';
        document.querySelector('._subheader__default').style.display = 'none';
        document.querySelector('._subheader__login').style.display = 'block';
        document.querySelector('._button__points_outline').style.display = 'none'
        document.querySelector('._button__book').style.display = 'none'
        document.querySelector('._button__amex').style.display = 'flex'
        document.querySelector('._button__login').style.display = 'flex'

    })
    // Book with AMEX button
    document.querySelector('._button__book').addEventListener('click', () => {
        chrome.runtime.sendMessage({command: "forgot", data: {domain: domain}}, response => console.log(response.data))
    })
}
