import React from 'react';
import { MediaCard, VideoThumbnail } from "@shopify/polaris";


export default function MediaCompo() {

    return (
        <div>
            <MediaCard
                title="Getting Started"
                primaryAction={{
                    content: 'Learn about getting started',
                    onAction: () => { },
                }}
                description="Discover how Shopify can power up your entrepreneurial journey."
                popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
                size="small"
            >
                <img
                    alt=""
                    width="100%"
                    height="100%"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                />
            </MediaCard>

            <div style={{paddingTop:20}}>
                <MediaCard
                    title="Turn your side-project into a business"
                    primaryAction={{
                        content: 'Learn more',
                        onAction: () => { },
                    }}
                    description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
                    popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
                >
                    <VideoThumbnail
                        videoLength={80}
                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                    />
                </MediaCard>
            </div>
        </div>
    )
}

