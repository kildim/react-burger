import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import toObject from 'dayjs/plugin/toObject';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
dayjs.extend(duration);
dayjs.extend(toObject);
// dayjs.extend(locale_ru);


export const checkResponse = (res: Response) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));


export function getCookie(name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | number | boolean, props: { [x: string]: any; expires?: any; }) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}

export function formatOrderTime (time: string) {
  const updatedAt = dayjs(time);
  const daysToNow = dayjs.duration(dayjs(time).diff(dayjs())).days();
  let daysToNowString =  daysToNow === 0 ? 'Сегодня,' : 'Вчера,';
  if (daysToNow > 1) {
    daysToNowString = `${daysToNow} дня назад,`
  }
  return `${daysToNowString} ${updatedAt.format('HH:mm')} i-GMT${updatedAt.format('Z').slice(0, 3)} `;
}
