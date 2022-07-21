import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {feedClose, feedInit} from '../../services/actions/feed-action';

function OrdersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedInit())

    return (() => {
      dispatch(feedClose())
    })
  }, []);


  return null;
}

export default OrdersList;
