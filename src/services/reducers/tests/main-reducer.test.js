import {mainReducer as reducer, ORDER_STUB} from '../main-reducer' ;
import {preloadBurger, preloadedState} from '../../../constants/preload-state';
import {
  addToBurger, clearBurger,
  dropOrder, hideErrorMessage, hideIngredientDetail, hideOrderDetail,
  loadIngredients,
  loadOrder, loadSelectedOrder,
  removeFilling,
  replaceFillings, selectIngredient, setIsLoading, setIsOrderLoading, showErrorMessage,
  showIngredientDetail, showOrderDetail
} from '../../actions/action';

describe('Main reducer test', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(preloadedState)
  });

  test('should proceed Action.LoadIngredients', () => {
    const testIngredients = [{_id: 1}];
    const resultStore = {...preloadedState, ingredients: testIngredients}
    expect(reducer(preloadedState, loadIngredients(testIngredients))).toEqual(resultStore)
  });

  test('should proceed bun adding by Action.AddToBurger', () => {
    const mockIngredients = [{_id: '1', type: 'bun'}, {_id: '2', type: 'sauce'}];
    const initialStore = {...preloadedState, ingredients: mockIngredients}
    const resultStore = {...initialStore, burger: {bun: {_id: '1', type: 'bun'}, fillings: []}}

    expect(reducer(initialStore, addToBurger('1'))).toEqual(resultStore)
  });

  test('should proceed sauce adding by Action.AddToBurger', () => {
    const mockIngredients = [{_id: '1', type: 'bun'}, {_id: '2', type: 'sauce'}];
    const initialStore = {...preloadedState, ingredients: mockIngredients}
    const resultStore = {...initialStore, burger: {bun: {}, fillings: [{_id: '2', type: 'sauce', uniqueIndex: 1}]}}

    expect(reducer(initialStore, addToBurger('2'))).toEqual(resultStore)
  })

  test('should remove filling by Action.RemoveFilling', () => {
    const initialStore = {...preloadedState, burger: {bun: {_id: '1', type: 'bun'}, fillings: [{_id: '2', type: 'sauce', uniqueIndex: 1}]}};
    const resultStore =  {...initialStore, burger:{bun: {_id: '1', type: 'bun'},  fillings: []}};

    expect(reducer(initialStore, removeFilling(1))).toEqual(resultStore)
  })

  test('should replace fillings', () => {
    const initialStore = {burger: {fillings: [{_id: '1', type: 'sauce', uniqueIndex: 1}, {_id: '2', type: 'sauce', uniqueIndex: 2}, {_id: '3', type: 'sauce', uniqueIndex: 3}]}};
    const resultStore = {burger: {fillings: [{_id: '3', type: 'sauce', uniqueIndex: 3}, {_id: '2', type: 'sauce', uniqueIndex: 2}, {_id: '1', type: 'sauce', uniqueIndex: 1}]}};

    expect(reducer(initialStore, replaceFillings(1, 3))).toEqual(resultStore);
  })

  test('should load order', () => {
    const testOrder = {success: true, order: {number: 1}};
    const initialStore = {...preloadedState};
    const resultStore = {...initialStore, order: testOrder};

    expect(reducer(initialStore, loadOrder(testOrder))).toEqual(resultStore)
  });

  test('should drop order', () => {
    const testOrder = {success: true, order: {number: 1}};
    const initialStore = {...preloadedState};
    const resultStore = {...initialStore, order: {success: false, order: {number:0}}};

    expect(reducer(initialStore, dropOrder())).toEqual(resultStore)
  });

  test('should turn showIngredientDetail to true', () => {
    const initialStore = {...preloadedState, showIngredientDetail: false};
    const resultStore = {...initialStore, showIngredientDetail: true};

    expect(reducer(initialStore, showIngredientDetail())).toEqual(resultStore);
  })

  test('should turn showIngredientDetail to false', () => {
    const initialStore = {...preloadedState, showIngredientDetail: true};
    const resultStore = {...initialStore, showIngredientDetail: false};

    expect(reducer(initialStore, hideIngredientDetail())).toEqual(resultStore);
  })

  test('should turn showOrderDetail to true', () => {
    const initialStore = {...preloadedState, showOrderDetail: false};
    const resultStore = {...initialStore, showOrderDetail: true};

    expect(reducer(initialStore, showOrderDetail())).toEqual(resultStore);
  })

  test('should turn showOrderDetail to false', () => {
    const initialStore = {...preloadedState, showOrderDetail: true};
    const resultStore = {...initialStore, showOrderDetail: false};

    expect(reducer(initialStore, hideOrderDetail())).toEqual(resultStore);
  })

  test('should clear store.burger', () => {
    const initialStore = {...preloadedState, burger: {test: 'fakeBurger'}};
    const resultStore = {...initialStore, burger: preloadBurger};

    expect(reducer(initialStore, clearBurger())).toEqual(resultStore);
  })

  test('should find ingredient by id', () => {
    const mockIngredients = [{_id: '1', type: 'bun'}, {_id: '2', type: 'sauce'}];
    let initialStore = {...preloadedState, ingredients: mockIngredients, ingredient: {}};
    let resultStore = {...initialStore, ingredient: {_id: '1', type: 'bun'}};

    expect(reducer(initialStore, selectIngredient('1'))).toEqual(resultStore)

    initialStore = {...preloadedState, ingredients: mockIngredients, ingredient: {}};
    resultStore = {...initialStore, ingredient: {_id: '2', type: 'sauce'}};
    expect(reducer(initialStore, selectIngredient('2'))).toEqual(resultStore)
  })

  test('should switch isLoading', () => {
    let initialStore = {...preloadedState, isLoading: true};
    let resultStore = {...initialStore, isLoading: false};

    expect(reducer(initialStore, setIsLoading(false))).toEqual(resultStore);

    initialStore = {...preloadedState, isLoading: false};
    resultStore = {...initialStore, isLoading: true};

    expect(reducer(initialStore, setIsLoading(true))).toEqual(resultStore);

    initialStore = {...preloadedState, isLoading: false};
    resultStore = {...initialStore, isLoading: false};

    expect(reducer(initialStore, setIsLoading(false))).toEqual(resultStore);

    initialStore = {...preloadedState, isLoading: true};
    resultStore = {...initialStore, isLoading: true};

    expect(reducer(initialStore, setIsLoading(true))).toEqual(resultStore);
  })

  test('should turn on showErrorMessage', () => {
    const testMessage = 'TEST MESSAGE'
    const initialStore = {...preloadedState, showErrorMessage: null, errorMessage: null};
    const resultStore = {...initialStore, showErrorMessage: true, errorMessage: testMessage};

    expect(reducer(initialStore, showErrorMessage(testMessage))).toEqual(resultStore);
  })

  test('should turn off showErrorMessage', () => {
    const testMessage = 'TEST MESSAGE';

    const initialStore = {...preloadedState, showErrorMessage: null, errorMessage: null};
    const resultStore = {...initialStore, showErrorMessage: false, errorMessage: null};

    expect(reducer(initialStore, hideErrorMessage())).toEqual(resultStore);
  })

  test('should switch isOrderLoading', () => {
    let initialStore = {...preloadedState, isOrderLoading: true};
    let resultStore = {...initialStore, isOrderLoading: false};

    expect(reducer(initialStore, setIsOrderLoading(false))).toEqual(resultStore);

    initialStore = {...preloadedState, isOrderLoading: false};
    resultStore = {...initialStore, isOrderLoading: true};

    expect(reducer(initialStore, setIsOrderLoading(true))).toEqual(resultStore);

    initialStore = {...preloadedState, isOrderLoading: false};
    resultStore = {...initialStore, isOrderLoading: false};

    expect(reducer(initialStore, setIsOrderLoading(false))).toEqual(resultStore);

    initialStore = {...preloadedState, isOrderLoading: true};
    resultStore = {...initialStore, isOrderLoading: true};

    expect(reducer(initialStore, setIsOrderLoading(true))).toEqual(resultStore);
  })

  test('should load selected order', () => {
    const fakeOrder =  {order: 'FAKE_ORDER'};
    const initialStore = {...preloadedState, selectedOrder: null};
    const resultStore = {...initialStore, selectedOrder: fakeOrder};

    expect(reducer(initialStore, loadSelectedOrder(fakeOrder))).toEqual(resultStore);
  })
})
