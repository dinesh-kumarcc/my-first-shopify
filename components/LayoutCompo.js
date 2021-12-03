import React from 'react';
import { Layout, Card, Thumbnail, ResourceList, TextStyle ,TextField,FormLayout} from "@shopify/polaris";

export default function LayoutCompo() {


    return (
        <div>
            <Layout>
                <Layout.Section>
                    <Card title="Online store dashboard" sectioned>
                        <p>View a summary of your online store’s performance.</p>
                    </Card>
                </Layout.Section>
            </Layout>

            <div style={{ paddingTop: 20 }}>
                <Layout>
                    <Layout.Section>
                        <Card title="Order details" sectioned>
                            <p>View a summary of your order.</p>
                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>
                        <Card title="Tags" sectioned>
                            <p>Add tags to your order.</p>
                        </Card>
                    </Layout.Section>
                </Layout>
            </div>

            <div style={{paddingTop:20}}>
                <Layout>
                    <Layout.AnnotatedSection
                        id="storeDetails"
                        title="Store details"
                        description="Shopify and your customers will use this information to contact you."
                    >
                        <Card sectioned>
                            <FormLayout>
                                <TextField label="Store name" onChange={() => { }} autoComplete="off" />
                                <TextField
                                    type="email"
                                    label="Account email"
                                    onChange={() => { }}
                                    autoComplete="email"
                                />
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </div>

            <div style={{ paddingTop: 20 }}>
                <Layout>
                    <Layout.Section oneHalf>
                        <Card title="Florida" actions={[{ content: 'Manage' }]}>
                            <Card.Section>
                                <TextStyle variation="subdued">455 units available</TextStyle>
                            </Card.Section>
                            <Card.Section title="Items">
                                <ResourceList
                                    resourceName={{ singular: 'product', plural: 'products' }}
                                    items={[
                                        {
                                            id: 341,
                                            url: 'produdcts/341',
                                            name: 'Black & orange scarf',
                                            sku: '9234194023',
                                            quantity: '254',
                                            media: (
                                                <Thumbnail
                                                    source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                                                    alt="Black orange scarf"
                                                />
                                            ),
                                        },
                                        {
                                            id: 256,
                                            url: 'produdcts/256',
                                            name: 'Tucan scarf',
                                            sku: '9234194010',
                                            quantity: '201',
                                            media: (
                                                <Thumbnail
                                                    source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                                                    alt="Tucan scarf"
                                                />
                                            ),
                                        },
                                    ]}
                                    renderItem={(item) => {
                                        const { id, url, name, sku, media, quantity } = item;

                                        return (
                                            <ResourceList.Item
                                                id={id}
                                                url={url}
                                                media={media}
                                                accessibilityLabel={`View details for ${name}`}
                                            >
                                                <h3>
                                                    <TextStyle variation="strong">{name}</TextStyle>
                                                </h3>
                                                <div>SKU: {sku}</div>
                                                <div>{quantity} available</div>
                                            </ResourceList.Item>
                                        );
                                    }}
                                />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card title="Nevada" actions={[{ content: 'Manage' }]}>
                            <Card.Section>
                                <TextStyle variation="subdued">301 units available</TextStyle>
                            </Card.Section>
                            <Card.Section title="Items">
                                <ResourceList
                                    resourceName={{ singular: 'product', plural: 'products' }}
                                    items={[
                                        {
                                            id: 342,
                                            url: 'produdcts/342',
                                            name: 'Black & orange scarf',
                                            sku: '9234194023',
                                            quantity: '100',
                                            media: (
                                                <Thumbnail
                                                    source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                                                    alt="Black orange scarf"
                                                />
                                            ),
                                        },
                                        {
                                            id: 257,
                                            url: 'produdcts/257',
                                            name: 'Tucan scarf',
                                            sku: '9234194010',
                                            quantity: '201',
                                            media: (
                                                <Thumbnail
                                                    source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                                                    alt="Tucan scarf"
                                                />
                                            ),
                                        },
                                    ]}
                                    renderItem={(item) => {
                                        const { id, url, name, sku, media, quantity } = item;

                                        return (
                                            <ResourceList.Item
                                                id={id}
                                                url={url}
                                                media={media}
                                                accessibilityLabel={`View details for ${name}`}
                                            >
                                                <h3>
                                                    <TextStyle variation="strong">{name}</TextStyle>
                                                </h3>
                                                <div>SKU: {sku}</div>
                                                <div>{quantity} available</div>
                                            </ResourceList.Item>
                                        );
                                    }}
                                />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </div>
        </div>
    )
}

