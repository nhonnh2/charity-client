'use client';

import { useEffect } from 'react';

import campaignsApiRequest from '@/apiRequests/campaigns';

function ClientComponentTest() {
  useEffect(() => {
    campaignsApiRequest
      .overview()
      .then(res => console.log('client_request', res));
  }, []);
  return <div>ClientComponentTest....</div>;
}

export default ClientComponentTest;
