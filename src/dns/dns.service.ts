import { Injectable } from '@nestjs/common';
import * as dns from 'dns';

@Injectable()
export class DnsService {
  getMxRecords(domain: string): Promise<dns.MxRecord[]> {
    domain = (domain || '').trim();

    return new Promise((r) =>
      dns.resolveMx(domain, (err, addresses) => {
        if (err || !addresses) return r([] as dns.MxRecord[]);
        r(addresses);
      }),
    );
  }

  async validateMX(email: string): Promise<dns.MxRecord | undefined> {
    const domain = email.split('@')[1];
    const mxAddresses: dns.MxRecord[] = await this.getMxRecords(domain);

    let priorityMxIndex = 0;

    for (let i = 0; i < mxAddresses.length; i++) {
      if (mxAddresses[i].priority < mxAddresses[priorityMxIndex].priority)
        priorityMxIndex = i;
    }

    return mxAddresses[priorityMxIndex];
  }
}
