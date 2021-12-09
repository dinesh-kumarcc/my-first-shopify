import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  TextContainer, SkeletonDisplayText, SkeletonBodyText, Toast, Page, ContextualSaveBar, TopBar, ColorPicker, Layout,
  Card, FormLayout, TextField, SkeletonPage, AppProvider, Popover, Frame,
  hsbToRgb,
  rgbToHsb,
  rgbString,
  Button,
  Stack
} from "@shopify/polaris";
import ColorPickerComp from './ColorPickerComp';
import { query, getDocs, collection, updateDoc, limit, addDoc, deleteDoc, doc, Timestamp, where, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase'


export default function FrameComp({ shop }) {

  const [id, setId] = useState('');
  const [notificationId, setNotificationId] = useState('');
  const [notification, setNotification] = useState([]);
  const [shopData, setShopData] = useState({});
  const [notificationData, setNotificationData] = useState({});
  const [updateSubcollection, setUpdateSubCollection] = useState('')

  const defaultState = useRef({
    nameFieldValue: 'Jaded Pixel',
  });

  useEffect(() => {

    subColl();
    console.log(color, bgcolor, nameFieldValue, 'ppppppppppppppppppppppppppp')

  }, [])


  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.8
  });

  const [bgcolor, setBgColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.8
  });

  const subColl = async () => {

    const shopsRef = collection(db, "shop");

    // Create a query against the collection.
    const q = query(shopsRef, where("shop", "==", shop), limit(1));  //limit 1
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (d) => {
      // doc.data() is never undefined for query doc snapshots
      const data = d.data();
      if (shop === data.shop) {
        setShopData({ ...data, id: d.id });
        const subcollectionSnapshot = await getDocs(collection(db, "shop", d.id, "notifications")); // create if no record added 

        // if(!subcollectionSnapshot){

        //   await addDoc(subcollectionSnapshot, {
        //     color: rgbaColor,
        //     bgcolor: rgbaBgColor,
        //     text: nameFieldValue,
        //     dateExample: Timestamp.fromDate(new Date())
        //   })
        // }
        setUpdateSubCollection(subcollectionSnapshot)
        console.log('subcollectionSnapshot', subcollectionSnapshot.docs.length, '==========', updateSubcollection);
        if (subcollectionSnapshot.docs.length > 0) {
          subcollectionSnapshot.forEach((doc1) => {
            // DO SOMETHING
            console.log('subcollection', doc1);
            console.log(doc1.id, " =>>>>>> ", doc1.data());
            setNotificationData({ ...doc1.data(), id: doc1.id });
          });
        } else {
          console.log('Here');
          // const notesRef = doc(db, 'shop', d.id, 'notifications', shop); 
          // const noteRef = await setDoc(collection(db, notesRef), {
          //     title: 'test',
          //     body: 'comentario por defecto.',
          //     timestamp: serverTimestamp() // You also had an extra coma here
          // });
          await setDoc(doc(db, "shop", d.id, 'notifications', shop), {
            color: color,
            bgcolor: bgcolor,
            text: nameFieldValue
          }, { merge: true });
          //console.log("Note written with ID: ", noteRef.id);
          //  await addDoc(subcollectionSnapshot, {
          //   color: rgbaColor,
          //   bgcolor: rgbaBgColor,
          //   text: nameFieldValue,
          //   dateExample: Timestamp.fromDate(new Date())
          // })
        }
      }
      // console.log(doc.id, " =>==>> ", doc.data());
    });


    // if(!notificationData){

    //   await addDoc(collection(db, 'shop', id, 'notifications'), {
    //     color: rgbaColor,
    //     bgcolor: rgbaBgColor,
    //     text: nameFieldValue,
    //     dateExample: Timestamp.fromDate(new Date())
    //   })

    // }


    return true



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

  }

  const [popoverActive, setPopoverActive] = useState(false)
  const [popoverBgActive, setBgPopoverActive] = useState(false)

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue,
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );

  // Text Color Change
  const handleColorChange = useCallback((color) => {
    setIsDirty(true);
    setColor(color)
  }, []);

  const handleRgbChange = (value) => {
    const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");
    const color = rgbToHsb({
      red: rgbValues[0],
      green: rgbValues[1],
      blue: rgbValues[2],
      alpha: rgbValues[3]
    });
    setColor({ color })
  }

  const handlePopoverClose = () => {
    setPopoverActive(false)
  }

  const handlePopoverOpen = () => {
    setPopoverActive(true)
  }

  const rgbaColor = rgbString(hsbToRgb(color));

  const activator = (
    <Button onClick={handlePopoverOpen}>
      <Stack alignment="center" spacing="tight">
        <div
          style={{
            height: "2rem",
            width: "2rem",
            borderRadius: "0.3rem",
            background: rgbaColor
          }}
        />
        <span>Text color</span>
      </Stack>
    </Button>
  );

  // Backgroung color Change
  const handleBgColorChange = useCallback((color) => {
    setIsDirty(true);
    setBgColor(color)
  }, []);

  const handleRgbBgChange = (value) => {
    const rgbValues = value.replace(/[^\d*.?\d*,]/g, "").split(",");
    const color = rgbToHsb({
      red: rgbValues[0],
      green: rgbValues[1],
      blue: rgbValues[2],
      alpha: rgbValues[3]
    });
    setBgColor({ color })
  }

  const handleBgPopoverClose = () => {
    setBgPopoverActive(false)
  }

  const handleBgPopoverOpen = () => {
    setBgPopoverActive(true)
  }


  const rgbaBgColor = rgbString(hsbToRgb(bgcolor));

  const bgactivator = (
    <Button onClick={handleBgPopoverOpen}>
      <Stack alignment="center" spacing="tight">
        <div
          style={{
            height: "2rem",
            width: "2rem",
            borderRadius: "0.3rem",
            background: rgbaBgColor
          }}
        />
        <span>Background color</span>
      </Stack>
    </Button>
  );

  const handleDiscard = useCallback(() => {
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);

  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);

    // if (updateSubcollection.docs.length == 0) {
    //   const subCollection = doc(db, "shop", d.id, 'notifications', shop);
    //   updateDoc(subCollection, {
    //     color: rgbaColor,
    //     bgcolor: rgbaBgColor,
    //     text: nameFieldValue,
    //     dateExample: Timestamp.fromDate(new Date())
    //   });
    // }

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

    setNameFieldValue('')
    subColl();

  }, [nameFieldValue]);

  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value);
    value && setIsDirty(true);
  }, []);

  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;


  const topBarMarkup = (
    <Page>
      <TopBar
        searchField={storeName}
      />
    </Page>
  );

  //AnnotatedSection

  const actualPageMarkup = (
    <Page>
      <Layout.Section>
        {/* <Layout.AnnotatedSection> */}
        <Card sectioned>
          <FormLayout>
            <TextField
              label="Text here"
              value={nameFieldValue}
              onChange={handleNameFieldChange}
              autoComplete="name"
            />
          </FormLayout>

          <div style={{ marginTop: 15 }}>
            <Popover
              active={popoverActive}
              activator={activator}
              onClose={handlePopoverClose}
            >
              <Popover.Section>
                <ColorPicker
                  onChange={handleColorChange}
                  color={color}
                  allowAlpha
                />
              </Popover.Section>
              <Popover.Section>
                <TextField value={rgbaColor} onChange={handleRgbChange} />
              </Popover.Section>
            </Popover>
          </div>

          <div style={{ marginTop: 15 }}>
            <Popover
              active={popoverBgActive}
              activator={bgactivator}
              onClose={handleBgPopoverClose}
            >
              <Popover.Section>
                <ColorPicker
                  onChange={handleBgColorChange}
                  color={color}
                  allowAlpha
                />
              </Popover.Section>
              <Popover.Section>
                <TextField value={rgbaBgColor} onChange={handleRgbBgChange} />
              </Popover.Section>
            </Popover>
          </div>

        </Card>
        {/* </Layout.AnnotatedSection> */}
      </Layout.Section>
    </Page>

  );

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={19} />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );



  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  return (
    <div style={{ height: '500px', margin: '-8px' }}>
      <AppProvider
        i18n={{
          Polaris: {
            ContextualSaveBar: {
              save: 'Save',
              discard: 'Discard',
            },
            Modal: {
              iFrameTitle: 'body markup',
            },
            Frame: {
              skipToContent: 'Skip to content',
              navigationLabel: 'Navigation',
              Navigation: {
                closeMobileNavigationLabel: 'Close navigation',
              },
            },
          },
        }}
      >
        <Frame
          topBar={topBarMarkup}
        >
          {contextualSaveBarMarkup}
          {pageMarkup}
          {toastMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}