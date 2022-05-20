import moment from "moment";

export const dateFormatter = (date: Date, format: string) => {
  return moment(date, "DD-MM-YYYY hh:mm:ss A").format(format);
};
