import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector } from 'react-redux'
import {RootState} from '../index';
import {ThunkAction} from 'redux-thunk';
import {TAction} from './actions/action';
import {TAuthAction} from './actions/auth-action';
import {TFeedAction} from './actions/feed-action';
import {TProfileWsAction} from './actions/profile-ws-action';

type AppThunk<ReturnType = void > = ThunkAction<ReturnType, RootState, unknown, TAction>;
type AppDispatch<ReturnType = void > = (action: TAction | AppThunk | TAuthAction | TFeedAction | TProfileWsAction) => ReturnType;

// export const useAppDispatch<ReturnType = void >: () => AppDispatch = useDispatch
export const useAppDispatch = () => dispatchHook<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
