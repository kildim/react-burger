import {authReducer as reducer} from '../auth-reduser';
import {
  hideRecoverPasswordNotification,
  saveUserProfile, setAuthChecked, setIsAuthenticated, setIsUserDataLoading,
  showRecoverPasswordNotification
} from '../../actions/auth-action';
import {preloadedAuthState} from '../../../constants/preload-auth-state';

describe('Auth reducer test', () => {
  test('should turn on showPasswordRecoverNotification', () => {
    const testMessage = 'TEST MESSAGE';

    const initialStore = {...preloadedAuthState, showPasswordRecoverNotification: false, passwordRecoverStatus: null};
    const resultStore = {...initialStore, showPasswordRecoverNotification: true, passwordRecoverStatus: testMessage};

    expect(reducer(initialStore, showRecoverPasswordNotification(testMessage))).toEqual(resultStore);
  })

  test('should turn off showPasswordRecoverNotification', () => {
    const testMessage = 'TEST MESSAGE';

    const initialStore = {...preloadedAuthState, showPasswordRecoverNotification: true, passwordRecoverStatus: testMessage};
    const resultStore = {...initialStore, showPasswordRecoverNotification: false, passwordRecoverStatus: null};

    expect(reducer(initialStore, hideRecoverPasswordNotification())).toEqual(resultStore);
  })

  test('should save user profile', () => {
    const initialStore = {...preloadedAuthState, nick: '', email: ''};
    const resultStore = {...initialStore, nick: 'TEST NICK', email: 'TEST EMAIL'};

    expect(reducer(initialStore, saveUserProfile({name: 'TEST NICK', email: 'TEST EMAIL'}))).toEqual(resultStore);
  })

  test('should trigger isAuthenticated', () => {
    let initialStore = {...preloadedAuthState, isAuthenticated: false};
    let resultStore = {...initialStore, isAuthenticated: true};

    expect(reducer(initialStore, setIsAuthenticated(true))).toEqual(resultStore);

    initialStore = {...preloadedAuthState, isAuthenticated: true};
    resultStore = {...initialStore, isAuthenticated: false};

    expect(reducer(initialStore, setIsAuthenticated(false))).toEqual(resultStore);
  })

  test('should trigger isUserDataLoading', () => {
    let initialStore = {...preloadedAuthState, isUserDataLoading: false};
    let resultStore = {...initialStore, isUserDataLoading: true};

    expect(reducer(initialStore, setIsUserDataLoading(true))).toEqual(resultStore);

    initialStore = {...preloadedAuthState, isUserDataLoading: true};
    resultStore = {...initialStore, isUserDataLoading: false};

    expect(reducer(initialStore, setIsUserDataLoading(false))).toEqual(resultStore);
  })

  test('should trigger setAuthChecked', () => {
    let initialStore = {...preloadedAuthState, isAuthChecked: false};
    let resultStore = {...initialStore, isAuthChecked: true};

    expect(reducer(initialStore, setAuthChecked(true))).toEqual(resultStore);

    initialStore = {...preloadedAuthState, isAuthChecked: true};
    resultStore = {...initialStore, isAuthChecked: false};

    expect(reducer(initialStore, setAuthChecked(false))).toEqual(resultStore);
  })
})
