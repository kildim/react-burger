import {TOrder} from '../types/torder';

export const preloadWsProfileState = {
  wsProfileDataLoading: true,
  wsProfileData: [] as TOrder[],
  total: 0,
  totalToday: 0,
}
