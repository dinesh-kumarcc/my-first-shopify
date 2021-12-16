# Shopify App Node

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/Shopify/shopify-app-node.svg?branch=master)](https://travis-ci.com/Shopify/shopify-app-node)

Boilerplate to create an embedded Shopify app made with Node, [Next.js](https://nextjs.org/), [Shopify-koa-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth), [Polaris](https://github.com/Shopify/polaris-react), and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components).

## Installation

Using the [Shopify CLI](https://github.com/Shopify/shopify-cli) run:

```sh
~/ $ shopify node create -n APP_NAME
```

Or, fork and clone repo

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- In the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

## Usage

This repository is used by [Shopify CLI](https://github.com/Shopify/shopify-cli) as a scaffold for Node apps. You can clone or fork it yourself, but it’s faster and easier to use Shopify App CLI, which handles additional routine development tasks for you.

## License

This respository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).


<!-- 


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



// var showData =[];
// function getCategoryList(callback) {
//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = (e) => {
//         if (xhr.readyState !== 4) {
//             return;
//         }
//         if (xhr.status === 200) {
//             //console.log('SUCCESS', xhr.responseText);
//             showData  =  callback(JSON.parse(xhr.responseText));
         
//             // testVar.push(this.responseText);
//         } else {
//             console.warn('request_error');
//         }
//     };

//     xhr.open('GET', `https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`);
//     xhr.send();
// }
// getCategoryList(data => console.log("The data is:", data));

// console.log(showData)



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


"https://stackoverflow.com"
// https://8096-103-163-58-238.ngrok.io/notifications?shop=${shop}

// `SERVER/notifications?shop=${shop}`
// return {
//     text: 'Test Notification',
//     color: 'rgba(163, 24, 163, 0.8)',
//     bgcolor: 'rgba(137, 106, 137, 0.8)'
// }






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



// var getData;

// async function fetchText() {
//     let response = await fetch(`https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`);

//     console.log(response.status); // 200
//     console.log(response.statusText); // OK

//     if (response.status === 200) {
//         let data = await response.text();
//         getData = data;
//         console.log(data,'fetch data')
//         // handle data
//     }
// }

// fetchText();

// console.log(getData,'/')





// var xhr = new XMLHttpRequest() // Access inbuilt props and methods on this object
// xhr.open('GET', `https://my-first-shopify-code-corner.herokuapp.com/notification?shop=${shop}`, true) //last value says "run this request async"
// xhr.send()

// xhr.addEventListener("readystatechange", processRequest, false) //listening for the readystatechange property to be changed

// xhr.onreadystatechange = processRequest

// var globals = {
//   response: {}
// }

// function processRequest() {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     globals.response = JSON.parse(xhr.responseText) //parsing turns a long string into an object
//     console.log(globals.response,'...')

//     window.localStorage.setItem('user', globals.response);
//     // var response = JSON.parse(xhr.responseText) //parsing turns a long string into an object
//     // console.log(response[0].content + " response[0].content local scoped")
//   }
// }
// processRequest()

// console.log("The data is:",globals.response)



ajax -- 
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




https://1187-103-163-58-238.ngrok.io/

function getParameterByName(queryString, url) {
    var match = RegExp('[?&]' + queryString + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// var newL="/notification?shop=savreen-tiwana.myshopify.com&nm=ss";
// console.log(getParameterByName('nm', newL));



 var newL="/notification?shop=savreen-tiwana.myshopify.com";
    console.log(newUL);
    var splitL=newL.toString().split("?");
    console.log(splitL);

    const shop = splitL.shift();
    console.log(splitL);

    var useShop =  splitL.toString().split("=");
    console.log(onlyShop)

    const shopname = onlyShop.shift();
    console.log(shopname)

    await addDoc(collection(db, 'shop', id , 'notifications'), {
      color: color,
      bgcolor:bgcolor,
      text:nameFieldValue,
      dateExample: Timestamp.fromDate(new Date())
    });



    odd number of path segments to get a CollectionReference

    equivalent to:
    .collection("collection_name/doc_name/subcollection_name") in v8

    use getDocs() instead of getDoc() to fetch the collection

    const qSnap = getDocs(subColRef)
    console.log(qSnap.docs.map(d => ({id: d.id, ...d.data()})))


    console.log('db', db);
    const addSubCollection = addDoc(collection(db,shopSnapshot,"notification"),{
      color:color
    })

    const addDataScript = addDoc(collection(db, "shop"), {
      shop: shop,
      accessToken: accessToken,
      dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
    })

      setDoc(doc(db, "shop", `notification`, `${shopdata[0].id}`), {
        Name: "CAted college"
    })

    const usersCollectionRef = collection(db, 'shop');
    console.log(usersCollectionRef,'userscollection]}}}}}}}}}}}}}}}}}}')


    const docRef = addDoc(collection(db, "shop"+shopdata[0].id+ "notification"), {
      dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
      color: color
    });



       const shopCol = query(collection(db, "shop"));
    const shopSnapshot = await getDocs(shopCol);
    const shopdata = [];

    shopSnapshot.forEach((doc) => {
      setId(doc.id)
      // console.log(doc.id, " => ", doc.data());
      shopdata.push({
        ...doc.data(),
        id: doc.id
      })
    });

    await addDoc(collection(db, 'shop', id, 'notes'), {
      color: color,
  });


      addNotification = () => {
      try {
          console.log('db', db);
          const docRef = addDoc(collection(db, "shop","notification"), {
              dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
              color:color
          });

      } catch (e) {
          alert(e, 'error')
      }
  }



    // const shopCol = query(collection(db, "shop"));
    // const shopSnapshot = await getDocs(shopCol);
    // const shopdata = [];
    // shopSnapshot.forEach((doc) => {
    //   setId(doc.id)
    //   // console.log(doc.id, " => ", doc.data());
    //   shopdata.push({
    //     ...doc.data(),
    //     id: doc.id
    //   })
    // });

    // const subColRef = collection(db, "shop", id, "notifications");
    // console.log(subColRef, 'kkkkkkkkkkkkkkkkkkkkkkkkkkk')
    // const subSnapshot = await getDocs(subColRef);
    // const notificationData = [];
    // subSnapshot.forEach((doc) => {
    //   console.log(doc.id, " =>kkkkkk>>>>>>>>>> ", doc.data());
    //   setNotificationId(doc.id)
    //   notificationData.push({
    //     ...doc.data(),
    //     id: doc.id
    //   })
    //   setNotification(notificationData)
    // });

    // if (!notification) {
    //   await addDoc(collection(db, 'shop', id, 'notifications'), {
    //     color: rgbaColor,
    //     bgcolor: rgbaBgColor,
    //     text: nameFieldValue,
    //     dateExample: Timestamp.fromDate(new Date())
    //   })
    // }


    // const notesRef = doc(db, 'shop', d.id, 'notifications', shop); 
    // const noteRef = await setDoc(collection(db, notesRef), {
    //     title: 'test',
    //     body: 'comentario por defecto.',
    //     timestamp: serverTimestamp() // You also had an extra coma here
    // });



    // if(!notificationData){

    //   await addDoc(collection(db, 'shop', id, 'notifications'), {
    //     color: rgbaColor,
    //     bgcolor: rgbaBgColor,
    //     text: nameFieldValue,
    //     dateExample: Timestamp.fromDate(new Date())
    //   })

    // }


        // if(shopdata){
        //   const shopRef = doc(db, "shop", shopdata[0].id);
        //   console.log('[[[[[[[[[[[[[[[',shopRef,']]]]]]]]]]]]]]]]]]]]',accessToken)
        //   updateDoc(shopRef, {
        //     accessToken: accessToken,
        //     dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
        //   });
          
        // }


        // Script Tag Write
        // const client = new Shopify.Clients.Rest(shop, accessToken);
        // const data = await client.get({
        //   path: 'script_tags/596726825',
        // });



   await addDoc(collection(db, 'shop', id , 'notifications'), {
      color: color,
      bgcolor:bgcolor,
      text:nameFieldValue,
      dateExample: Timestamp.fromDate(new Date())
    }); -->
