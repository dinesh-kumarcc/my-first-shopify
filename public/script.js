
const shop = Shopify.shop;
console.log(shop,)
// var newL="/notification?shop=savreen-tiwana.myshopify.com&nm=ss";
// console.log(getParameterByName('nm', newL));


// var theContacts=[];
// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             theContacts.push(this.responseText);
//         }
//         xhttp.open("GET", `https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`, true);
//         xhttp.send();
//     }
// }

// loadDoc();
// console.log(theContacts,'theContacts')

async function fetchText() {
    let response = await fetch(`https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`);

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.text();
        console.log(data,'fetch data')
        // handle data
    }
}

fetchText();

// var showData =[];
// function getCategoryList(callback) {
//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = (e) => {
//         if (xhr.readyState !== 4) {
//             return;
//         }
//         if (xhr.status === 200) {
//             //console.log('SUCCESS', xhr.responseText);
//           callback(JSON.parse(xhr.responseText));
         
//             // testVar.push(this.responseText);
//         } else {
//             console.warn('request_error');
//         }
//     };

//     xhr.open('GET', `https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`);
//     xhr.send();
// }
// getCategoryList(data => console.log("The data is:", data));



//const getRecord = getCategoryList(data=>data)

//console.log(getData,'getData',getRecord)

// const notification = getNotification();

"https://stackoverflow.com"
// https://8096-103-163-58-238.ngrok.io/notifications?shop=${shop}

// `SERVER/notifications?shop=${shop}`
// return {
//     text: 'Test Notification',
//     color: 'rgba(163, 24, 163, 0.8)',
//     bgcolor: 'rgba(137, 106, 137, 0.8)'
// }



// console.log('notification', notification);

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



















// function getNotification() {
//     //ajax request to server to get notification
//     var xhr = new XMLHttpRequest();
//     var url = `https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`;
//     xhr.open("GET", url);
//     xhr.onload = function() {
//       alert(xhr.response,';;;;;;');
//       console.log(xhr.response,'ppl')
//       const resData = xhr.response;
//       console.log(resData,'resData')
//       return resData
//     }   
//     xhr.send();

// }