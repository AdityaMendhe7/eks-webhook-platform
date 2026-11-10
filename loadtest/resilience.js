import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    steady: {
      executor: 'constant-arrival-rate',
      rate: 30,
      timeUnit: '1s',
      duration: '90s',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
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
