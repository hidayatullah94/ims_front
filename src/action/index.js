export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const format = (num) => {
  return Intl.NumberFormat("idn-Id").format(num);
};

export let romawi = [
  "0",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];
