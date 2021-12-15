import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion, DataType } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import { createLexer } from "graphql";
import { db } from '../firebase'
import cors from "@koa/cors";
import { query, getDocs, collection, where, updateDoc, limit, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";


dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const server = new Koa();
  server.use(cors());
  // server.use(cors());
  const router = new Router();

  router.get("/notification", async (ctx) => {

    const shop = ctx.request.query.shop

    const shopData = [];
    const notificationsData;
    const customData = [];
    const shopsRef = collection(db, "shop");
    // Create a query against the collection.   
    const q = query(shopsRef, where("shop", "==", shop), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (d) => {
      const data = d.data();
      if (shop === data.shop) {
        shopData.push({ ...data, id: d.id });
        // customData.push({id:'test'});
        const subcollectionSnapshot = await getDocs(collection(db, "shop", d.id, "notifications")); // create if no record added 
        if (subcollectionSnapshot.docs.length > 0) {
          //console.log('ssssssssssssssss', subcollectionSnapshot.docs.map(d => ({ id: d.id, ...d.data() })))
          subcollectionSnapshot.forEach((doc1) => {
            // customData.push({newKey:'test'});
            // console.log(doc1.id, " =>>>>>> ]]]]]]]]]", doc1.data());
            notificationsData.push({ ...doc1.data(), id: doc1.id })
          });
        }
      }
      customData.push(notificationsData)
      console.log(customData,'//++//notification data//++//')
      localStorage.setItem('data',JSON.parse(customData))
    })

    // console.log(staticShop,'staticShop',staticNotification,'staticNotificatio')
    console.log(notificationsData, ';;;;;;;arrNotifi;;>>>>>;;;')
    console.log(customData,'-------');

    // ctx.body = notificationsData;

    // ctx.body = {
    //   text: allNotification.text,
    //   color: allNotification.color,
    //   bgcolor: allNotification.bgcolor
    // };



    // console.log(shop,'======'=====================================================================)


    // get shop data from firebase

  })




  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }


        // retrive all script tag
        const client = new Shopify.Clients.Rest(shop, accessToken);
        const dataScriptTags = await client.get({
          path: 'script_tags'
        });
        console.log('dataScriptTags', dataScriptTags);
        // if (dataScriptTags.body.script_tags.length === 0) {

        //   const createScript = await client.post({
        //     path: 'script_tags',
        //     data: { "script_tag": { "event": "onload", "src": `${process.env.HOST}/script.js` } },
        //     type: DataType.JSON,
        //   });
        // }
        const filteredScripts = dataScriptTags.body.script_tags.filter((script) => script.src === `${process.env.HOST}/script.js`);
        if (filteredScripts.length == 0) {
          const createScript = await client.post({
            path: 'script_tags',
            data: { "script_tag": { "event": "onload", "src": `${process.env.HOST}/script.js` } },
            type: DataType.JSON,
          });
        }


        const shopCol = query(collection(db, "shop"));
        const shopSnapshot = await getDocs(shopCol);
        console.log('noteSnapshot', shopSnapshot);
        const shopdata = [];
        shopSnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          shopdata.push({
            ...doc.data(),
            id: doc.id
          })

        });
        console.log(shopdata, '0>>>>>>>>>>>>>>>>>>>>', shopdata[0].id)

        if (!shopdata) {
          const addDataScript = addDoc(collection(db, "shop"), {
            shop: shop,
            accessToken: accessToken,
            dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
          })
        } else {
          const shopRef = doc(db, "shop", shopdata[0].id);
          updateDoc(shopRef, {
            accessToken: accessToken,
            dateExample: Timestamp.fromDate(new Date())
          });
        }


        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear

  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });



  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});


















    // console.log('~~~~~+++~~~~~~',ctx,'~~~~~~~~+++~~~~~~~')
    // console.log('<<<<<<<<<<<',ctx.request.query.shop,'>>>>>>>>>>>>>>')
    // console.log('+++++++++',ctx.request,'++++++++++++')
            // allNotification = Object.assign({}, ...notificationsData);
 // const notification = {
    //   text:'text',
    //   color:'color'
    // }
    // ctx.body = notification
