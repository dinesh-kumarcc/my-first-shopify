import React, { useState, useCallback, useRef } from 'react';
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

export default function FrameComp() {
  const defaultState = useRef({
    nameFieldValue: 'Jaded Pixel',
  });

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
    setColor( color )
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
    setBgColor( color )
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

            <div style={{marginTop:15}}>
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

            <div style={{marginTop:15}}>
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
    <div style={{ height: '500px', margin: '-8px'  }}>
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