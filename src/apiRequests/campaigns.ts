import http from '@/lib/http';

// import {
//   LoginBodyType,
//   LoginResType,
//   RegisterBodyType,
//   RegisterResType,
// } from '@/schemaValidations/auth.schema';

const campaignsApiRequest = {
  overview: () => http.get<any>('/campaigns/stats/overview'),
};

export default campaignsApiRequest;
