
const shop = Shopify.shop;
//console.log('shop ----', shop);


// var newL="/notification?shop=savreen-tiwana.myshopify.com&nm=ss";
// console.log(getParameterByName('nm', newL));

const notification = getNotification();

function getNotification() {
    //ajax request to server to get notification
    var xhr = new XMLHttpRequest();


    // var url = `https://1187-103-163-58-238.ngrok.io/notification?shop=${shop}`;
    // xhr.open("GET", url, true);
    // // request.setRequestHeader("Authorization", "Bearer " + access_token);
    // xhr.onreadystatechange = function () {
    //     console.log('pp')
    //     // if (this.readyState == 4 && this.status == 200) {
    //     //     console.log('/////////////');
    //     // } 
    // }
    // xhr.send();


    var xhr = new XMLHttpRequest();
    var url = `https://1187-103-163-58-238.ngrok.io/notification?shop=${shop}`;
    xhr.open("GET", url);
    xhr.onload = function() {
      alert(xhr.response);
    }
    xhr.send();

    // Url for the request    cors-anywhere.herokuapp.com/    ,{ mode: 'no-cors'}
    // var url = `https://ac2f-103-163-58-238.ngrok.io/notifications?shop=${shop}`;
    // console.log('mm')
    // fetch(url, { method: 'GET'})
    //     .then(Result => Result.json())
    //     .then(string => {
    //         console.log('string',string)
    //         // Printing our response
    //         // console.log(string);

    //     })
    //     .catch(errorMsg => { console.log(errorMsg); });
}


// https://8096-103-163-58-238.ngrok.io/notifications?shop=${shop}

// `SERVER/notifications?shop=${shop}`
// return {
//     text: 'Test Notification',
//     color: 'rgba(163, 24, 163, 0.8)',
//     bgcolor: 'rgba(137, 106, 137, 0.8)'
// }



console.log('notification', notification);

// create HTML
const mainwrapper = document.createElement('div');
mainwrapper.classList.add('cc-notification-wrapper');
mainwrapper.style.display = 'flex';
mainwrapper.style.justifyContent = 'center';
mainwrapper.style.alignItems = 'center';
mainwrapper.style.width = '100%';
mainwrapper.style.padding = '5px 15px';
// mainwrapper.style.color = notification.color;
// mainwrapper.style.backgroundColor = notification.bgcolor;
mainwrapper.style.borderBottom = '1px solid #ccc';
mainwrapper.style.fontSize = '14px';
const notificationCard = document.createElement('div');
notificationCard.classList.add('cc-notification-card');
// notificationCard.innerHTML = `<p style="margin:0">${notification.text}</p>`;
mainwrapper.appendChild(notificationCard);
document.querySelector('body').prepend(mainwrapper);