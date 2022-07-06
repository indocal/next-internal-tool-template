import { BareFetcher } from 'swr';
import axios from 'axios';

export const axiosFetcher: BareFetcher = (url) =>
  axios.get(url).then((response) => response.data);

export default axiosFetcher;
