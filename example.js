const mocksystemdata = require('./mocksystemdata/mocksystemdata');

mocksystemdata.settArbeidsforholdMedArbeidsgivernummer("2019-01-01", "2019-01-02", '99', '123', 'Team Liquid');

console.warn(mocksystemdata.getArbeidJson().arbeidsforhold[0]);

