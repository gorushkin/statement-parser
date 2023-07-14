import axios from 'axios';
import { APIError } from '../errors/error';

const CBR_URL = 'https://www.cbr.ru/scripts/XML_daily_eng.asp';

const getCBRUrl = (date_req: string) => {
  const params = new URLSearchParams({ date_req }).toString();
  return `${CBR_URL}?${params}`;
};

export const getXMLCurrencies = async (date: string) => {
  const URL = getCBRUrl(date);
  try {
    const { data } = await axios(URL);
    return data;
  } catch (error) {
    throw new APIError();
  }
};
