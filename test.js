// Test arbeidsforhold:
const mocksystemdata = require('./mocksystemdata/mocksystemdata');

mocksystemdata.settIdent("1337");

console.warn(mocksystemdata.getFamilieJson());
