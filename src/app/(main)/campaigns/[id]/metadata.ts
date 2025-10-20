import { Metadata } from 'next';
import { getCampaignData } from './data';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const campaign = await getCampaignData(resolvedParams.id);

  if (!campaign) {
    return {
      title: 'Không tìm thấy chiến dịch | Charity',
      description: 'Chiến dịch gây quỹ không tồn tại hoặc đã bị xóa.',
    };
  }

  const title = `${campaign.title} | Chiến dịch gây quỹ`;
  const description =
    campaign.description?.slice(0, 160) ||
    'Chi tiết chiến dịch gây quỹ, thông tin mục tiêu, tiến độ và minh bạch giao dịch.';

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/campaigns/${campaign.id}`;
  const cover =
    campaign.coverImage?.url ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/placeholder.jpg`;

  return {
    title,
    description,
    keywords: [
      'gây quỹ',
      'từ thiện',
      'campaign',
      'charity',
      'donation',
      campaign.title,
      campaign.category,
    ],
    authors: [{ name: campaign.creator?.name || 'Charity' }],
    creator: campaign.creator?.name || 'Charity',
    publisher: 'Charity',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    ),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Charity',
      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cover],
      creator: '@charity',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'campaign:id': campaign.id,
      'campaign:status': campaign.status || 'draft',
      'campaign:category': campaign.category,
      'campaign:target_amount': campaign.targetAmount?.toString() || 0,
      'campaign:current_amount': campaign.currentAmount?.toString(),
    },
  };
}
