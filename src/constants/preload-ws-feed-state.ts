import {TOrder} from '../types/torder';

export const preloadWsFeedState = {
  wsFeedDataLoading: true,
  wsFeedData: [] as TOrder[],
  total: 0,
  totalToday: 0,
  showOrderComplete: false,
  selectedOrder: {} as TOrder,
}
