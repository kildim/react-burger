import {TOrder} from '../types/torder';

export const preloadWsFeedState = {
  wsFeedOpen: false,
  wsFeedData: [] as TOrder[],
  total: 0,
  totalToday: 0,
  showOrderComplete: false,
  selectedOrder: {} as TOrder,
}
