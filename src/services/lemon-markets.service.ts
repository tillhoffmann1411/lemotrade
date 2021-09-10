import axios from 'axios';
import qs from 'qs';
import { ILoginCred, IRegisterResponse, ISingleResult } from '../interfaces/lemon-api-search';

export async function register(cred: ILoginCred): Promise<IRegisterResponse | undefined> {
  const response = await axios.post('https://auth.lemon.markets/oauth2/token', qs.stringify({
      client_id: cred.client_id,
      client_secret: cred.client_secret,
      grant_type: 'client_credentials'
    }));
  if (response.data) {
    return response.data;
  }
}

export async function buyStock(isin: string, accessToken: string): Promise<boolean> {
  const date = new Date();
  date.setHours(date.getHours() + 4);
  
  const order = await axios.post("https://paper-trading.lemon.markets/rest/v1/spaces/a573355e-8dc9-4ebb-bdf9-9a577b946c1a/orders/", 
    {
      "isin": isin,
      "valid_until": date.getTime() / 1000,
      "side" : 'buy',
      "quantity": 1,
    },
    {headers: {
      'Authorization': 'Bearer ' + accessToken
  }});

  if (order.data.uuid) {
    const activatedOrder = await axios.put(`https://paper-trading.lemon.markets/rest/v1/spaces/a573355e-8dc9-4ebb-bdf9-9a577b946c1a/orders/${order.data.uuid}/activate/`, {},
      {headers: {
        'Authorization': 'Bearer ' + accessToken
    }});
    console.log('Stock buyed:', activatedOrder.data);
    return true;
  }
  return false;
}

export async function search(searchString: string, accessToken: string): Promise<ISingleResult[]> {
  const response = await axios.get(`https://paper-data.lemon.markets/v1/instruments/?search=${searchString}&type=stock`, {headers: {
    'Authorization': 'Bearer ' + accessToken
  }});
  if (response.data.results && response.data.results.length > 0) {
    return response.data.results;
  }
  return [];
}