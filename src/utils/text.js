import moment from "moment";
import "moment/locale/id";

moment.locale("id");

export function date(date, format = "DD MMM YYYY") {
  return moment(date).format(format);
};

export function number(num) {
  if (!num) {
    return 0;
  }
  return 'Rp. ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
