import http from '@/lib/http';

// import {
//   LoginBodyType,
//   LoginResType,
//   RegisterBodyType,
//   RegisterResType,
// } from '@/schemaValidations/auth.schema';

const campaignsApiRequest = {
  overview: () => http.get<any>('/campaigns/stats/overview'),
  overviewServer: () =>
    http.get<any>('/campaigns/stats/overview?isServer=true'),
};

export default campaignsApiRequest;
