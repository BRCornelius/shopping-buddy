chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if(msg.command === 'fetch') {
        // handle fetching user data
        // TO_DO consider should there be another layer to customize this reponse for different clients
            // For instance, should this msg contain client tag on the request to a login handler
        // TO_DO insert request to login service and handle resposne
        // TO_DO see if the chrome object is available in angular services
        const domain = msg.data.domain
        console.log(domain)
        response({
            type: 'result',
            status: 'success',
            data: true,
            request: msg
        });
    }
    if(msg.command === 'forgot') {
        chrome.tabs.create({url: 'https://www.iseatz.com/en'})
        response({
            data: 'success!'
        })
    }
})
