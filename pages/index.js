import React, { useState, useCallback } from 'react';
import { Heading, Page, AccountConnection, Navigation, Frame } from "@shopify/polaris";
import Link from 'next/link'
import LayoutCompo from '../components/LayoutCompo';
import MediaCompo from '../components/MediaCompo';
import PageCompo from '../components/PageCompo';
import DatePickerExample from '../components/DatePickerCompo';
import FrameComp from '../components/FrameComp'

export default function Index() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'Jane Appleseed' : '';

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, [connected]);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      
      <Link href="/about">
        <a>About</a>
      </Link> <br/>

      <Link href="/home">
        <a>Autocomplete</a>
      </Link><br/>
    
      <Link href="/home">
        <a>Frame</a>
      </Link>
    </p>
  );
  return (
    <Page>

      {/* <div>
            <Link to="/about">About </Link>
          </div> */}
      {/* <AccountConnection
        accountName={accountName}
        connected={connected}
        title="Example App"
        action={{
          content: buttonText,
          onAction: handleAction,
        }}
        details={details}
        termsOfService={terms}
      /> */}

      <FrameComp/>

    

      

      {/* <ColorPickerCompo/> */}

      {/* <DatePickerExample/> */}

    </Page>
  )
}

