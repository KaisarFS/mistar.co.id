export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function priceFormat(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts[0];
}

export function priceFormatFloat(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function isFormValid(text, type) {
  switch (type) {
    case "number":
      return [v => !v || /[0-9]$/.test(v) || text];
    case "email":
      return [v => !v || /.+@.+\..+/.test(v) || text];
    case "phonenumberrequired":
      return [
        v => !!v || text.a,
        v => /^(\+62\\d{7}|\+62\d{11}|0\d{11}|0\d{7})$/.test(v) || text.b
      ];
    case "phonenumber":
      return [
        v => !v || /^(\+62\\d{7}|\+62\d{11}|0\d{11}|0\d{7})$/.test(v) || text
      ];
    case "gpa":
      return [
        v => !!v || text[0],
        v => /^[0-9](\.[0-9]+)?$/.test(v) || text[1]
      ];
    case "upload":
      return [
        v => v.length < 6 || text[0],
        v => {
          const pattern = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
          const data = [];
          v.map(d => data.push(pattern.test(d.name)));
          return !data.includes(false) || text[1];
        }
      ];
    default:
      return [value => !!value || text];
  }
}
