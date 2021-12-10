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

rgbaColor
rgbaBgColor

    await addDoc(collection(db, 'shop', id , 'notifications'), {
      color: color,
      bgcolor:bgcolor,
      text:nameFieldValue,
      dateExample: Timestamp.fromDate(new Date())
    });

 const subColRef = collection(db, "shop",id,"notifications");
    console.log(subColRef, '///////////////////')



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


    // if (notification) {
    //   const subCollection = doc(db, "shop", id, "notifications", notificationId);
    //   console.log('kkkkkkkkk', subCollection, 'kkkkkkkkk', notificationId, 'kkkkkkk', storeName)
    //   updateDoc(subCollection, {
    //     color: rgbaColor,
    //     bgcolor: rgbaBgColor,
    //     text: nameFieldValue,
    //     dateExample: Timestamp.fromDate(new Date())
    //   });
    // }



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

    //   console.log(notificationId,'ooooooooooooooo',notification)
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
