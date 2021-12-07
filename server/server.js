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
import { query, getDocs, collection, orderBy, deleteField, updateDoc, onSnapshot, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";

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
  const router = new Router();

  // router.get("/script", async (ctx) => {
  //   ctx.type = 'application/javascript; charset=utf-8';
  //   ctx.body = 'check response';
  // })

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

        // Script Tag Write
        // const client = new Shopify.Clients.Rest(shop, accessToken);
        // const data = await client.get({
        //   path: 'script_tags/596726825',
        // });


        // retrive all script tag
        const client = new Shopify.Clients.Rest(shop, accessToken);
        const dataScriptTags = await client.get({
          path: 'script_tags'
        });

        console.log('dataScriptTags', dataScriptTags);
        if (dataScriptTags.body.script_tags.length === 0) {

          const createScript = await client.post({
            path: 'script_tags',
            data: { "script_tag": { "event": "onload", "src": `${process.env.HOST}/script.js` } },
            type: DataType.JSON,
          });
        }


        // const docRef = doc(db, "shop");
        // const docSnap = await getDoc(docRef);
        // console.log(docSnap,'----------');

        // const noteCol = query(collection(db, "shop"));
        // const noteSnapshot = await getDocs(noteCol);
        // console.log('noteSnapshot', noteSnapshot);

        // const shopCol = db.collection("shop");
        // const shopSnapshot = await getDocs(noteCol);
        // console.log(shopSnapshot,'shopsnapshot')
        // if (shopSnapshot.length == 0) {
        //   const addDataScript = addDoc(collection(db, "shop"), {
        //     shop: shop,
        //     accessToken: accessToken,
        //     dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
        //   })
        // }

        // else{
        //       const shopRef = doc(db, "shop",);
        //   updateDoc(shopRef, {
        //     accessToken: accessToken,
        //     dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
        //   });
        // }



        // const noteCol = query(collection(db, "note"), orderBy("name", "asc"));
        // const noteSnapshot = await getDocs(noteCol);

        const noteCol = query(collection(db, "shop"));
        const noteSnapshot = await getDocs(noteCol);
        console.log('noteSnapshot', noteSnapshot);
        // if(noteSnapshot){
        //   console.log("Document");
        // }else{
        //   console.log("no doc")
        // }
        const shop = [];
        noteSnapshot.forEach((doc) => {

          // doc.data() is never undefined for query doc snapshots 
          console.log(doc.id, " => ", doc.data());
          shop.push({
            ...doc.data(),
            id: doc.id
          })

        });

        if (!shop) {
          const addDataScript = addDoc(collection(db, "shop"), {
            shop: shop,
            accessToken: accessToken,
            dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
          })
        }


        // const docRef = doc(db, "shop");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        // } else {
        //   // doc.data() will be undefined in this case
        //   console.log("No such document!");
        // }

        // if (shop && accessToken) {
        //   const noteRef = doc(db, "shop");
        //   // console.log(noteRef,'noteref')
        //   updateDoc(noteRef, {
        //     shop: shop,
        //     accessToken: accessToken,
        //     dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
        //   });
        // } else {
        //   const addDataScript = addDoc(collection(db, "shop"), {
        //     shop: shop,
        //     accessToken: accessToken,
        //     dateExample: Timestamp.fromDate(new Date("December 7, 2021"))
        //   })
        // }

        //   updateField = () => {
        //     // console.log('hhhh'+this.state.id)
        //     const noteRef = doc(db, "note", this.state.id);
        //     // console.log(noteRef,'noteref')
        //     updateDoc(noteRef, {
        //         name: this.state.updateNote
        //     });
        //     this.getData();
        //     this.setState({ show: false });
        // };


        //  const addNote = e => {
        //       e.preventDefault();
        //       try {
        //           console.log('db', db);
        //           const docRef = addDoc(collection(db, "note"), {
        //               name: this.state.note,
        //               dateExample: Timestamp.fromDate(new Date("December 10, 1815"))
        //           });
        //           this.setState({ note: '' })
        //           // console.log(this.state.note, "Document written with ID: ", docRef.id);
        //           this.getData();

        //       } catch (e) {
        //           alert(e, 'error')
        //       }
        //   }




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
