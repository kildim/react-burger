import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector } from 'react-redux'
import {RootState} from '../index';
import {ThunkAction} from 'redux-thunk';
import {TAction} from './actions/action';
import {TAuthAction} from './actions/auth-action';
import {TFeedAction} from './actions/feed-action';
import {TProfileWsAction} from './actions/profile-ws-action';

type TAppAction = TAction | TAuthAction | TFeedAction | TProfileWsAction;

export type AppThunk<ReturnType = void > = ThunkAction<ReturnType, RootState, unknown, TAppAction>;
export type AppDispatch<ReturnType = void > = (action: TAppAction | AppThunk) => ReturnType;


export const useAppDispatch = () => dispatchHook<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
