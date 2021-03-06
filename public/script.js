
const shop = Shopify.shop;

function getCategoryList(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status === 200) {
            //console.log('SUCCESS', xhr.responseText);
            callback(JSON.parse(xhr.responseText));

        } else {
            console.warn('request_error');
        }
    };

    xhr.open('GET', `https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`);
    xhr.send();
}
getCategoryList(responseData);



function responseData(data) {

    console.log('data', data);

    const mainwrapper = document.createElement('div');
    mainwrapper.classList.add('cc-notification-wrapper');
    mainwrapper.style.display = 'flex';
    mainwrapper.style.justifyContent = 'center';
    mainwrapper.style.alignItems = 'center';
    mainwrapper.style.width = '100%';
    mainwrapper.style.padding = '5px 15px';
    mainwrapper.style.color = data.color;
    mainwrapper.style.backgroundColor = data.bgcolor;
    mainwrapper.style.borderBottom = '1px solid #ccc';
    mainwrapper.style.fontSize = '14px';
    const notificationCard = document.createElement('div');
    notificationCard.classList.add('cc-notification-card');
    notificationCard.innerHTML = `<p style="margin:0">${data.text}</p>`;
    notificationCard.style.color
    mainwrapper.appendChild(notificationCard);
    // document.getElementsByClassName('announcement-bar__message h5').innerHTML(mainwrapper);
    document.querySelector('body').prepend(mainwrapper);
    document.getElementsByClassName('announcement-bar__message h5').style.visibility='hidden';
}


// console.log('notification', notification);

// create HTML
// const mainwrapper = document.createElement('div');
// mainwrapper.classList.add('cc-notification-wrapper');
// mainwrapper.style.display = 'flex';
// mainwrapper.style.justifyContent = 'center';
// mainwrapper.style.alignItems = 'center';
// mainwrapper.style.width = '100%';
// mainwrapper.style.padding = '5px 15px';
// mainwrapper.style.color = notification.color;
// mainwrapper.style.backgroundColor = notification.bgcolor;
// mainwrapper.style.borderBottom = '1px solid #ccc';
// mainwrapper.style.fontSize = '14px';
// const notificationCard = document.createElement('div');
// notificationCard.classList.add('cc-notification-card');
// notificationCard.innerHTML = `<p style="margin:0">${notification.text}</p>`;
// mainwrapper.appendChild(notificationCard);
// document.querySelector('body').prepend(mainwrapper);











