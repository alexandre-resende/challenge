import { Endpoints } from '../src/endpoints';
import { expect } from 'chai';
import { hostname, token } from '../src/config';
import { Messages } from '../src/messages';
import request from 'supertest';
import { validator } from '../src/util';

describe(`${Endpoints.Latest} endpoint`, () => {

  it('200 - Positive scenario', async function() {
    const symbols = ['EUR', 'GBP'];
    const response: any = await request(hostname)
      .get(Endpoints.Latest)
      .set('apikey', token)
      .query({ symbols: symbols.toString() });
      const rates = response.body?.rates || {};
      await validator(response, [
        async() => expect(response.status).to.be.a('number').and.to.equal(200),
        async() => expect(response.body).to.be.a('object'),
        async() => expect(response.body?.base).to.be.a('string').and.not.to.be.undefined,
        async() => expect(response.body?.date).to.be.a('string').and.not.to.be.undefined,
        async() => expect(response.body?.rates).to.be.a('object'),
        async() => Object.keys(rates).forEach(rate => {
          expect(response.body?.rates[rate]).to.be.a('number').and.to.be.above(0);
          expect(rate).to.be.oneOf(symbols, 'The returned value does not match filter value');
        }),
        async() => expect(response.body?.success).to.be.a('boolean').and.to.be.true,
        async() => expect(response.body?.timestamp).to.be.a('number').and.to.be.above(0)
      ]);
  });
  
  it('400 - Invalid parameter type', async function() {
    const response: any = await request(hostname)
      .get(Endpoints.Latest)
      .set('apikey', token)
      .query({ base: true });
    await validator(response, [
      async() => expect(response.status).to.be.a('number').and.to.equal(400),
      async() => expect(response.body).to.be.a('object'),
      async() => expect(response.body.message).to.be.a('string').and.to.be.eql(
        Messages.InvalidType.replace('{0}', 'string')
      )
    ]);
  });
  
  it('401 - Invalid token credential', async function() {
    const response: any = await request(hostname)
      .get(Endpoints.Latest)
      .set('apikey', token.slice(0, -1));
    await validator(response, [
      async() => expect(response.status).to.be.a('number').and.to.equal(401),
      async() => expect(response.body).to.be.a('object'),
      async() => expect(response.body.message).to.be.a('string').and.to.be.eql(
        Messages.InvalidToken
      )
    ]);
  });
  
  it('403 - Invalid method', async function() {
    const response: any = await request(hostname)
      .post(Endpoints.Latest)
      .set('apikey', token);
    await validator(response, [
      async() => expect(response.status).to.be.a('number').and.to.equal(403),
      async() => expect(response.body).to.be.a('object'),
      async() => expect(response.body.message).to.be.a('string').and.to.be.eql(
        Messages.Unauthorized
      )
    ]);
  });
  
  it('404 - Invalid route', async function() {
    const response: any = await request(hostname)
      .get(Endpoints.Latest.replace('l', 'I'))
      .set('apikey', token)
      .query({ base: 'ETH' });
    await validator(response, [
      async() => expect(response.status).to.be.a('number').and.to.equal(404),
      async() => expect(response.body).to.be.a('object'),
      async() => expect(response.body.message).to.be.a('string').and.to.be.eql(
        Messages.RouteNotFound
      )
    ]);
  });

  it('429 - Too many requests', async function() {
    this.timeout(50000);
    const RATE_LIMIT_DAY = 1000; // Defined in documentation => https://apilayer.com/docs/article/rate-limits
    let response: any;
    for (let index = 0; index < RATE_LIMIT_DAY; index++) {
      response = await request(hostname)
        .get(Endpoints.Latest)
        .set('apikey', token)
        .query({ base: 'USD', symbols: 'EUR,GBP' });
      if (response.status !== 200) {
        break;
      }
    }
    await validator(response, [
      async() => expect(response?.status).to.be.a('number').and.to.equal(429),
      async() => expect(response?.body).to.be.a('object'),
      async() => expect(response?.body?.message).to.be.a('string').and.to.be.eql(
        Messages.TooManyRequests
      )
    ]);
  });
  
});
