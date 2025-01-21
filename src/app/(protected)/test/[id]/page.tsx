'use client';

import { Metric } from '@/components/widgets';
import { useRouter } from 'next/router';

const MetricPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Metric metricId={id as string} />;
};

export default MetricPage;
