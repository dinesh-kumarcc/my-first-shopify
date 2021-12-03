import React from 'react';
import { Page, Button, Thumbnail, Badge, Stack, Card, Heading } from "@shopify/polaris";


export default function PageCompo() {

  return (
    <div>
      <Page
        breadcrumbs={[{ content: 'Settings', url: '/settings' }]}
        title="General"
        primaryAction={
          <Button
            primary
            connectedDisclosure={{
              accessibilityLabel: 'Other save actions',
              actions: [{ content: 'Save as new' }, { content: 'Save as old' }],
            }}
          >
            Save
          </Button>
        }
      >
        <p>Page content</p>
      </Page>

      <div style={{ paddingTop: 20 }}>
        <Stack distribution="fill">
          <Heading>Order #1136</Heading>
          <Badge>Paid</Badge>
          <Badge>Fulfilled</Badge>
        </Stack>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Page
          breadcrumbs={[{ content: 'Settings', url: '/settings' }]}
          title="General"
          primaryAction={{ content: 'Save' }}
        >
          <p>Page content</p>
        </Page>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Page
          breadcrumbs={[{ content: 'Orders', url: '/orders' }]}
          title="#1085"
          secondaryActions={[
            { content: 'Print' },
            { content: 'Unarchive' },
            { content: 'Cancel order' },
          ]}
          pagination={{
            hasPrevious: true,
            hasNext: true,
          }}
        >
          <Card sectioned title="Fulfill order">
            <Stack alignment="center">
              <Stack.Item fill>
                <p>Buy postage and ship remaining 2 items</p>
              </Stack.Item>
              <Button primary>Continue</Button>
            </Stack>
          </Card>
        </Page>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Page
          breadcrumbs={[{ content: 'Products', url: '/products' }]}
          title="Invoice"
          subtitle="Statement period: May 3, 2019 to June 2, 2019"
          secondaryActions={[{ content: 'Download' }]}
        >
          <p>Page content</p>
        </Page>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Page
          breadcrumbs={[{ content: 'Products', url: '/products' }]}
          title="3/4 inch Leather pet collar"
          titleMetadata={<Badge status="success">Paid</Badge>}
          subtitle="Perfect for any pet"
          thumbnail={
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
              alt="Black leather pet collar"
            />
          }
          compactTitle
          primaryAction={{ content: 'Save', disabled: true }}
          secondaryActions={[
            {
              content: 'Duplicate',
              accessibilityLabel: 'Secondary action label',
              onAction: () => alert('Duplicate action'),
            },
            {
              content: 'View on your store',
              onAction: () => alert('View on your store action'),
            },
          ]}
          actionGroups={[
            {
              title: 'Promote',
              accessibilityLabel: 'Action group label',
              actions: [
                {
                  content: 'Share on Facebook',
                  accessibilityLabel: 'Individual action label',
                  onAction: () => alert('Share on Facebook action'),
                },
              ],
            },
          ]}
          pagination={{
            hasPrevious: true,
            hasNext: true,
          }}
        // additionalNavigation={<Avatar size="small" initials="CD" customer={false} />}
        >
          <p>Page content</p>
        </Page>
      </div>
    </div>
  )
}

