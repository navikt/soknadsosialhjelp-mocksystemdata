// Test arbeidsforhold:
const mocksystemdata = require('./mocksystemdata/mocksystemdata');


// Test - Arbeidsforhold

mocksystemdata.settArbeidsforholdMedArbeidsgivernummer("2019-01-01", "2019-02-01", "90", "1", "Navn på arbeidsgiver");

if (mocksystemdata.getArbeidJson().arbeidsforhold.length > 1){
    console.warn("Noe galt i listen over arbeidsforhold");
}

mocksystemdata.settArbeidsforholdMedArbeidsgivernummer("2019-01-02", "2019-02-02", "80", "2", "Navn 2 på arbeidsgiver");



console.warn(JSON.stringify(mocksystemdata.getArbeidJson(), null, 4));



// Test - Barn med samme bostedsadresse
mocksystemdata.settBarnSammeBostedsadresse("1", "Barn A", null, "Etternavn");
mocksystemdata.settBarnSammeBostedsadresse("2", "Barn B", null, "Etternavn");

if (mocksystemdata.getFamilieJson().harFraRolleI[0] === mocksystemdata.getFamilieJson().harFraRolleI[1]){
    console.warn("Barn med samme bostedsadresse: PEKER PÅ SAMME OBJECT");
}

if (JSON.stringify(mocksystemdata.getFamilieJson().harFraRolleI[0]) === JSON.stringify(mocksystemdata.getFamilieJson().harFraRolleI[1])){
    console.warn("Barn med samme bostedsadresse: PEKER IKKE PÅ SAMME OBJECT, MEN OBJECTENE ER LIKE.");
}

// Test - Barn med forskjellig folkeregistrert adresse fra far/mor
mocksystemdata.settBarnIkkeSammeBostedsadresse("3", "Per", "", "Askeladd");
mocksystemdata.settBarnIkkeSammeBostedsadresse("4", "Pål", "", "Askeladd");

if (mocksystemdata.getFamilieJson().harFraRolleI[2] === mocksystemdata.getFamilieJson().harFraRolleI[3]){
    console.warn("Barn ikke samme folkeregistrert adresse: SAMME OBJECT");
}

if (JSON.stringify(mocksystemdata.getFamilieJson().harFraRolleI[2]) === JSON.stringify(mocksystemdata.getFamilieJson().harFraRolleI[3])){
    console.warn("Barn ikke samme folkeregistrert adresse: IKKE SAMME OBJECT; MEN OBJECTENE ER LIKE");
}

// Test - Barn med doedsdato
mocksystemdata.settBarnMedDoedsdato("11", "Barn AA", "", "Etternavn", "2019-01-01");
mocksystemdata.settBarnMedDoedsdato("12", "Barn BB", "", "Etternavn", "2019-01-02");

let barnAA = mocksystemdata.getFamilieJson().harFraRolleI[4];
let barnBB = mocksystemdata.getFamilieJson().harFraRolleI[5];


if (barnAA === barnBB){
    console.warn("Barn med doedsdato: SAMME OBJECT");
}

if (JSON.stringify(barnAA) === JSON.stringify(barnBB)){
    console.warn("Barn med doedsdato: IKKE SAMME OBJECT, MEN DE ER LIKE.");
}

mocksystemdata.clearFamilieforhold();
let familieJson = mocksystemdata.getFamilieJson();
if (familieJson.harFraRolleI.length > 0){
    console.warn("clearFamilieForhold fungerer ikke.");
    console.warn(JSON.stringify(familieJson.harFraRolleI, null, 4));
}

// TEST - Ektefelle uten samme bostedsadresse
mocksystemdata.settEktefelleUtenSammeBostedsadresse("21", "EktefelleUtenSammeBosted_1", "", "Etternavn", "1982-03-03");

if (mocksystemdata.getFamilieJson().harFraRolleI.length !== 1){
    console.warn("FEIL LENGDE PÅ LISTEN harFraRolleI");
}
