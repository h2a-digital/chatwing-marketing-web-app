import { notFound, permanentRedirect } from 'next/navigation';
import { site } from '@/content/site';

const campaignRedirects = {
  n6F4w: site.store.campaigns.n6F4w,
  q8R2x: site.store.campaigns.q8R2x,
} as const;

type CampaignSource = keyof typeof campaignRedirects;

export function generateStaticParams() {
  return Object.keys(campaignRedirects).map((source) => ({ source }));
}

export default async function CampaignRedirectPage({
  params,
}: {
  params: Promise<{ source: string }>;
}) {
  const { source } = await params;
  const destination = campaignRedirects[source as CampaignSource];

  if (!destination) {
    notFound();
  }

  permanentRedirect(destination);
}
