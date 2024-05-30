import crypto from 'crypto';

type Payout = {
  rows: number;
  risk: string;
  payouts: number[];
};

const payout: Payout[] = [
    { rows:8, risk:'Low', payouts: [5.6, 2.1, 1.1, 1.0, 0.5, 1.0, 1.1, 2.1, 5.6] },
    { rows:8, risk:'Medium', payouts: [13, 3.0, 1.3, 0.7, 0.4, 0.7, 1.3, 3.0, 13] },
    { rows:8, risk:'High', payouts: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29] },
    { rows:9, risk:'Low', payouts: [5.6, 2.0, 1.6, 1.0, 0.7, 0.7, 1.0, 1.6, 2.0, 5.6] },
    { rows:9, risk:'Medium', payouts: [18, 4.0, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4.0, 18] },
    { rows:9, risk:'High', payouts: [43, 7.0, 2.0, 0.6, 0.2, 0.2, 0.6, 2.0, 7.0, 43] },
    { rows:10, risk:'Low', payouts: [8.9, 3.0, 1.4, 1.1, 1.0, 0.5, 1.0, 1.1, 1.4, 3.0, 8.9] },
    { rows:10, risk:'Medium', payouts: [22, 5.0, 2.0, 1.4, 0.6, 0.4, 0.6, 1.4, 2.0, 5.0, 22] },
    { rows:10, risk:'High', payouts: [76, 10, 3.0, 0.9, 0.3, 0.2, 0.3, 0.9, 3.0, 10, 76] },
    { rows:11, risk:'Low', payouts: [8.4, 3.0, 1.9, 1.3, 1.0, 0.7, 0.7, 1.0, 1.3, 1.9, 3.0, 8.4] },
    { rows:11, risk:'Medium', payouts: [24, 6.0, 3.0, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3.0, 6.0, 24] },
    { rows:11, risk:'High', payouts: [120, 14, 5.2, 1.4, 0.4, 0.2, 0.2, 0.4, 1.4, 5.2, 14, 120] },
    { rows:12, risk:'Low', payouts: [10, 3.0, 1.6, 1.4, 1.1, 1.0, 0.5, 1.0, 1.1, 1.4, 1.6, 3.0, 10] },
    { rows:12, risk:'Medium', payouts: [33, 11, 4.0, 2.0, 1.1, 0.6, 0.3, 0.6, 1.1, 2.0, 4.0, 11, 33] },
    { rows:12, risk:'High', payouts: [170, 24, 8.1, 2.0, 0.7, 0.2, 0.2, 0.2, 0.7, 2.0, 8.1, 24, 170] },
    { rows:13, risk:'Low', payouts: [8.1, 4.0, 3.0, 1.9, 1.2, 0.9, 0.7, 0.7, 0.9, 1.2, 1.9, 3.0, 4.0, 8.1] },
    { rows:13, risk:'Medium', payouts: [43, 13, 6.0, 3.0, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3.0, 6.0, 13, 43] },
    { rows:13, risk:'High', payouts: [260, 37, 11, 4.0, 1.0, 0.2, 0.2, 0.2, 0.2, 1.0, 4.0, 11, 37, 260] },
    { rows:14, risk:'Low', payouts: [7.1, 4.0, 1.9, 1.4, 1.3, 1.1, 1.0, 0.5, 1.0, 1.1, 1.3, 1.4, 1.9, 4.0, 7.1] },
    { rows:14, risk:'Medium', payouts: [58, 15, 7.0, 4.0, 1.9, 1.0, 0.5, 0.2, 0.5, 1.0, 1.9, 4.0, 7.0, 15, 58] },
    { rows:14, risk:'High', payouts: [420, 56, 18, 5.0, 5.0, 1.9, 0.3, 0.2, 0.2, 0.2, 0.3, 1.9, 5.0, 18, 56, 420,] },
    { rows:15, risk:'Low', payouts: [15, 8.0, 3.0, 2.0, 1.5, 1.1, 1.0, 0.7, 0.7, 1.0, 1.1, 1.5, 2.0, 3.0, 8.0, 15] },
    { rows:15, risk:'Medium', payouts: [88, 18, 11, 5.0, 3.0, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3.0, 5.0, 11, 18, 88] },
    { rows:15, risk:'High', payouts: [620, 83, 27, 8.0, 3.0, 0.5, 0.2, 0.2, 0.2, 0.2, 0.5, 3.0, 8.0, 27, 83, 620] },
    { rows:16, risk:'Low', payouts: [16, 9.0, 2.0, 1.4, 1.4, 1.2, 1.1, 1.0, 0.5, 1.0, 1.1, 1.2, 1.4, 1.4, 2.0, 9.0, 16] },
    { rows:16, risk:'Medium', payouts: [110, 41, 10, 5.0, 3.0, 1.5, 1.0, 0.5, 0.3, 0.5, 1.0, 1.5, 3.0, 5.0, 10, 41, 110] },
    { rows:16, risk:'High', payouts: [1000, 130, 26, 9.0, 4.0, 2.0, 0.2, 0.2, 0.2, 0.2, 0.2, 2.0, 4.0, 9.0, 26, 130, 1000] }
  ];

export function final_payout(risk: string, rows: number): number[] {
  return payout.find(item => item.rows === rows && item.risk === risk)!.payouts;
}

function bytes(data: string): string {
  let result = '';
  result = crypto.createHash('sha512').update(data).digest('hex');
  console.log('result hash', result);
  return result;
}

function bytes_to_num_array(bytes: string): number[] {
  let totals: number[] = [];
  for (let i = 0; i * 8 < bytes.length; i++) {
    totals.push(bytes_to_number(bytes.substr(i * 8, 8)));
  }
  return totals;
}

function bytes_to_number(bytes: string): number {
  let total = 0;
  for (let i = 0; i < 4; i++) {
    total += parseInt(bytes.substr(i * 2, 2), 16) / Math.pow(256, i + 1);
  }
  return total;
}

export function handlePlinko(server_seed: string, client_seed: string, nonce: string, rows: number, risk: string): number {
  let nums: number[] = [];
  let payoutIndex = final_payout(risk, rows).length;
  console.log(payoutIndex);
  bytes_to_num_array(bytes(`${server_seed}${client_seed}${nonce}`)).map((value, index) => {
    let direction = Math.floor(value * 2) ? ++payoutIndex : --payoutIndex;
    return nums.push(direction);
  })
  console.log(nums);
  return Math.floor(nums[rows-1]/2);
}