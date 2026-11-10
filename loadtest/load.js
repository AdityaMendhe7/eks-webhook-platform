import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '2m', target: 200 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.post(
    `http://${__ENV.ALB}/webhook`,
    JSON.stringify({ a: 1 }),
    { headers: { 'Content-Type': 'application/json', 'x-webhook-secret': __ENV.SECRET } }
  );
  check(res, { 'status is 200': (r) => r.status === 200 });
}
