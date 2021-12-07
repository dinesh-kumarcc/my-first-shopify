import React, { useState, useCallback, useRef } from 'react';
import {
  TextContainer, SkeletonDisplayText, SkeletonBodyText, Toast, Page, ContextualSaveBar, TopBar, ColorPicker, Layout,
  Card, FormLayout, TextField, SkeletonPage, Modal, AppProvider, Popover, Frame,
  hsbToRgb,
  rgbToHsb,
  rgbString,
  Button,
  Stack
} from "@shopify/polaris";

export default function ColorPickerComp() {
  const defaultState = useRef({
    nameFieldValue: 'Jaded Pixel',
  });

  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.8
  });

  const [popoverActive, setPopoverActive] = useState(false)


  const handleColorChange = useCallback((color) => {
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
        <span>Primary color</span>
      </Stack>
    </Button>
  );


  return (
      <AppProvider>
        <Page>
          {/* <Card sectioned> */}
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
          {/* </Card> */}
        </Page>
      </AppProvider>
  );
}