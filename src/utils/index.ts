import moment from 'moment';

export function dateFormat(value: string): string {
  return moment(value).format('DD MMMM YYYY');
}