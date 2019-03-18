const endpoints = require( "./endpoints.js");

const adresserJSON = require( "./jsonTemplates/adresser.js");
const arbeidJSON = require( "./jsonTemplates/arbeid.js");
const brukerprofilJSON = require( "./jsonTemplates/brukerprofil.js");
const familieJSON = require( "./jsonTemplates/familie.js");
const norgJSON = require( "./jsonTemplates/norg.js");
const organisasjonJSON = require( "./jsonTemplates/organisasjon.js");
const telefonJSON = require( "./jsonTemplates/telefon.js");
const utbetalingJSON = require( "./jsonTemplates/utbetaling.js");

const midlertidigPostadresseJSON = require("./jsonPartialTemplates/midlertidigPostadresse.js");
const nyOrganisasjonJSON = require('./jsonPartialTemplates/organisasjon');


const adresser = adresserJSON;
let arbeid = arbeidJSON;
const brukerprofil = brukerprofilJSON;
let familie = familieJSON;
const norg = norgJSON;
let organisasjon = organisasjonJSON;
const telefon = telefonJSON;
const utbetaling = utbetalingJSON;

const midlertidigPostadresse = midlertidigPostadresseJSON;

const PERSON = "person";
const MIDLERTIDIGPOSTADRESSE = "midlertidigPostadresse";
const BANKKONTO = "bankkonto";
const VERDI = "verdi";
const ARBEIDSFORHOLD = "arbeidsforhold";
const ORGANISASJON = "organisasjon";
const PERSONNAVN= "personnavn";
const IDENT = "ident";



module.exports = {

    settNavn : function settNavn(fornavn, mellomnavn, etternavn) {
        const navnObject =
            {
                "etternavn": etternavn,
                "fornavn": fornavn,
                "mellomnavn": mellomnavn,
                "sammensattNavn": null,
                "endringstidspunkt": null,
                "endretAv": null,
                "endringstype": null
            };

        familie[PERSONNAVN] = navnObject;
    },

    settIdent : function settIdent(ident) {
        familie[IDENT][IDENT] = ident;
    },

    settMidlertidigPostadresse : function settMidlertidigPostadresse(midlertidigPostadresseEgendefinertValue) {
        brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresseJSON;
    },

    settTelefonnummer : function settTelefonnummer(telefonnummer) {
        if (typeof telefonnummer === "undefined") {
            throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).")
        }
        telefon[VERDI] = telefonnummer;
    },

    settBankkontonummer : function settBankkontonummer(bankkontonummer) {

        if (bankkontonummer !== null){
            brukerprofil[PERSON][BANKKONTO] = { "bankkonto" : { "bankkontonummer": bankkontonummer} }
        } else {
            brukerprofil[PERSON][BANKKONTO] = null;
        }
    },

    settArbeidsforholdMedArbeidsgivernummer : function settArbeidsforholdMedArbeidsgivernummer(id, startDato, sluttDato, stillingsProsent, arbeidsgiverNummer, arbeidsgiverNavn ) {
        const nyttArbeidsForholdMedArbeidsgivernummer =
            {
                "arbeidsforholdIDnav" : 0,
                "ansettelsesPeriode" : {
                    "periode" : {
                        "fom" : null,
                        "tom" : null
                    }
                },
                "arbeidsavtale" : [
                    {
                        "stillingsprosent" : null
                    }
                ],
                "arbeidsgiver" : {
                    "arbeidsgivernummer": null,
                    "navn": null
                }
            };

        nyttArbeidsForholdMedArbeidsgivernummer.arbeidsforholdIDnav = id;
        nyttArbeidsForholdMedArbeidsgivernummer.ansettelsesPeriode.periode.fom = startDato;
        nyttArbeidsForholdMedArbeidsgivernummer.ansettelsesPeriode.periode.tom = sluttDato;
        nyttArbeidsForholdMedArbeidsgivernummer.arbeidsavtale[0].stillingsprosent = stillingsProsent;
        nyttArbeidsForholdMedArbeidsgivernummer.arbeidsgiver.arbeidsgivernummer = arbeidsgiverNummer;
        nyttArbeidsForholdMedArbeidsgivernummer.arbeidsgiver.navn = arbeidsgiverNavn;


        arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdMedArbeidsgivernummer);
    },

    settArbeidsforholdMedIdent : function settArbeidsforholdMedIdent(id, startDato, sluttDato, stillingsProsent, ident ) {
        const nyttArbeidsForholdMedIdent =
            {
                "arbeidsforholdIDnav" : 0,
                "ansettelsesPeriode" : {
                    "periode" : {
                        "fom" : null,
                        "tom" : null
                    }
                },
                "arbeidsavtale" : [ {
                    "stillingsprosent" : null
                } ],
                "arbeidsgiver" : {
                    "ident": {
                        "ident": null
                    }
                }
            };

        nyttArbeidsForholdMedIdent.arbeidsforholdIDnav = id;
        nyttArbeidsForholdMedIdent.ansettelsesPeriode.periode.fom = startDato;
        nyttArbeidsForholdMedIdent.ansettelsesPeriode.periode.tom = sluttDato;
        nyttArbeidsForholdMedIdent.arbeidsavtale[0].stillingsprosent = stillingsProsent;
        nyttArbeidsForholdMedIdent.arbeidsgiver.ident.ident = ident;

        arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdMedIdent);
    },

    settArbeidsforholdMedOrganisasjonsnummer : function settArbeidsforholdMedOrganisasjonsnummer(id, startDato, sluttDato, stillingsProsent, orgnummer ) {
        const nyttArbeidsForholdMedOrganisasjon =
            {
                "arbeidsforholdIDnav" : 0,
                "ansettelsesPeriode" : {
                    "periode" : {
                        "fom" : null,
                        "tom" : null
                    }
                },
                "arbeidsavtale" : [ {
                    "stillingsprosent" : null
                } ],
                "arbeidsgiver" : {
                    "orgnummer" : null
                }
            };

        nyttArbeidsForholdMedOrganisasjon.arbeidsforholdIDnav = id;
        nyttArbeidsForholdMedOrganisasjon.ansettelsesPeriode.periode.fom = startDato;
        nyttArbeidsForholdMedOrganisasjon.ansettelsesPeriode.periode.tom = sluttDato;
        nyttArbeidsForholdMedOrganisasjon.arbeidsavtale[0].stillingsprosent = stillingsProsent;
        nyttArbeidsForholdMedOrganisasjon.arbeidsgiver.orgnummer = orgnummer;

        arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdMedOrganisasjon);
    },

    clearArbeidsforhold : function clearArbeidsforhold() {
        arbeid[ARBEIDSFORHOLD] = [];
    },

    settOrganisasjon : function settOrganisasjon( orgnummer, navn ) {
        organisasjon = organisasjonJSON;
        const nyOrganisasjon = nyOrganisasjonJSON;
        nyOrganisasjon.orgnummer = orgnummer;
        nyOrganisasjon.navn.navnelinje = [ navn ];

        organisasjon[ORGANISASJON] = nyOrganisasjon;
    },

    clearOrganisasjon : function clearOrganisasjon() {
        organisasjon = null;
    },

    settEktefelleMedSammeBostedsadresse : function settEktefelleMedSammeBostedsadresse(ident, fornavn, mellomnavn, etternavn, foedselsdato) {
        const ektefelle =
            {
                "harSammeBosted": null,
                "tilRolle": {
                    "value": "EKTE",
                    "kodeRef": null,
                    "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Familierelasjoner"
                },
                "tilPerson": {
                    "diskresjonskode": null,
                    "bankkonto": null,
                    "bostedsadresse": null,
                    "sivilstand": null,
                    "statsborgerskap": null,
                    "harFraRolleI": [],
                    "ident": {
                        "ident": "07127302639",
                        "type": {
                            "value": "FNR",
                            "kodeRef": null,
                            "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Personidenter"
                        }
                    },
                    "kjoenn": null,
                    "personnavn": {
                        "etternavn": "Zerg",
                        "fornavn": "Zeratuul",
                        "mellomnavn": null,
                        "sammensattNavn": null,
                        "endringstidspunkt": null,
                        "endretAv": null,
                        "endringstype": null
                    },
                    "personstatus": null,
                    "postadresse": null,
                    "doedsdato": null,
                    "foedselsdato": {
                        "foedselsdato": "1981-02-02",
                        "endringstidspunkt": null,
                        "endretAv": null,
                        "endringstype": null
                    }
                },
                "endringstidspunkt": null,
                "endretAv": null,
                "endringstype": null
            };

        ektefelle.harSammeBosted = true;

        ektefelle.tilPerson.ident.ident = ident;
        ektefelle.tilPerson.personnavn.fornavn = fornavn;
        ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
        ektefelle.tilPerson.personnavn.etternavn = etternavn;
        ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;

        familie.harFraRolleI.push(ektefelle);
        familie.sivilstand.sivilstand.value = "GIFT";
    },

    settEktefelleUtenSammeBostedsadresse : function settEktefelleUtenSammeBostedsadresse(ident, fornavn, mellomnavn, etternavn, foedselsdato) {
        const ektefelle =
            {
                "harSammeBosted": null,
                "tilRolle": {
                    "value": "EKTE",
                    "kodeRef": null,
                    "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Familierelasjoner"
                },
                "tilPerson": {
                    "diskresjonskode": null,
                    "bankkonto": null,
                    "bostedsadresse": null,
                    "sivilstand": null,
                    "statsborgerskap": null,
                    "harFraRolleI": [],
                    "ident": {
                        "ident": "07127302639",
                        "type": {
                            "value": "FNR",
                            "kodeRef": null,
                            "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Personidenter"
                        }
                    },
                    "kjoenn": null,
                    "personnavn": {
                        "etternavn": "Zerg",
                        "fornavn": "Zeratuul",
                        "mellomnavn": null,
                        "sammensattNavn": null,
                        "endringstidspunkt": null,
                        "endretAv": null,
                        "endringstype": null
                    },
                    "personstatus": null,
                    "postadresse": null,
                    "doedsdato": null,
                    "foedselsdato": {
                        "foedselsdato": "1981-02-02",
                        "endringstidspunkt": null,
                        "endretAv": null,
                        "endringstype": null
                    }
                },
                "endringstidspunkt": null,
                "endretAv": null,
                "endringstype": null
            };

        ektefelle.harSammeBosted = false;

        ektefelle.tilPerson.ident.ident = ident;
        ektefelle.tilPerson.personnavn.fornavn = fornavn;
        ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
        ektefelle.tilPerson.personnavn.etternavn = etternavn;
        ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;

        familie.harFraRolleI.push(ektefelle);
        familie.sivilstand.sivilstand.value = "GIFT"
    },

    settEktefelleMedKodeSeks: function settEktefelleMedKodeSeks(ident, fornavn, mellomnavn, etternavn, foedselsdato) {
        const ektefelle = ektefelleJSON;

        ektefelle.harSammeBosted = false;

        ektefelle.tilPerson.ident.ident = ident;
        ektefelle.tilPerson.personnavn.fornavn = fornavn;
        ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
        ektefelle.tilPerson.personnavn.etternavn = etternavn;
        ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;
        ektefelle.tilPerson.diskresjonskode = {
            "value": "SPSF",
            "kodeRef": null,
            "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Diskresjonskoder"
        };

        familie.harFraRolleI.push(ektefelle);
        familie.sivilstand.sivilstand.value = "GIFT"
    },

    settEktefelleMedKodeSyv: function settEktefelleMedKodeSyv(ident, fornavn, mellomnavn, etternavn, foedselsdato) {
        const ektefelle = ektefelleJSON;

        ektefelle.harSammeBosted = false;

        ektefelle.tilPerson.ident.ident = ident;
        ektefelle.tilPerson.personnavn.fornavn = fornavn;
        ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
        ektefelle.tilPerson.personnavn.etternavn = etternavn;
        ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;
        ektefelle.tilPerson.diskresjonskode = {
            "value": "SPFO",
            "kodeRef": null,
            "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Diskresjonskoder"
        };

        familie.harFraRolleI.push(ektefelle);
        familie.sivilstand.sivilstand.value = "GIFT"
    },

    settBarnSammeBostedsadresse : function settBarnSammeBostedsadresse(ident, fornavn, mellomnavn, etternavn) {
        let barnSammeBostedsadresse = {
            "harSammeBosted": true,
            "tilRolle": {
                "value": "BARN",
                "kodeRef": null,
                "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Familierelasjoner"
            },
            "tilPerson": {
                "diskresjonskode": null,
                "bankkonto": null,
                "bostedsadresse": null,
                "sivilstand": null,
                "statsborgerskap": null,
                "harFraRolleI": [],
                "ident": {
                    "ident": "03061793877",
                    "type": {
                        "value": "FNR",
                        "kodeRef": null,
                        "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Personidenter"
                    }
                },
                "kjoenn": null,
                "personnavn": {
                    "etternavn": "Mockmann",
                    "fornavn": "Hydra",
                    "mellomnavn": null,
                    "sammensattNavn": null,
                    "endringstidspunkt": null,
                    "endretAv": null,
                    "endringstype": null
                },
                "personstatus": null,
                "postadresse": null,
                "doedsdato": null,
                "foedselsdato": null
            },
            "endringstidspunkt": null,
            "endretAv": null,
            "endringstype": null
        };

        barnSammeBostedsadresse.tilPerson.ident.ident = ident;
        barnSammeBostedsadresse.tilPerson.personnavn.fornavn = fornavn;
        barnSammeBostedsadresse.tilPerson.personnavn.mellomnavn = mellomnavn;
        barnSammeBostedsadresse.tilPerson.personnavn.etternavn = etternavn;

        familie.harFraRolleI.push(barnSammeBostedsadresse);
    },

    settBarnIkkeSammeBostedsadresse : function settBarnIkkeSammeBostedsadresse(ident, fornavn, mellomnavn, etternavn) {
        const barnIkkeSammeBostedsadresse =
            {
                "harSammeBosted": false,
                "tilRolle": {
                    "value": "BARN",
                    "kodeRef": null,
                    "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Familierelasjoner"
                },
                "tilPerson": {
                    "diskresjonskode": null,
                    "bankkonto": null,
                    "bostedsadresse": null,
                    "sivilstand": null,
                    "statsborgerskap": null,
                    "harFraRolleI": [],
                    "ident": {
                        "ident": "03061694075",
                        "type": {
                            "value": "FNR",
                            "kodeRef": null,
                            "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Personidenter"
                        }
                    },
                    "kjoenn": null,
                    "personnavn": {
                        "etternavn": "Mockmann",
                        "fornavn": "Zergling",
                        "mellomnavn": null,
                        "sammensattNavn": null,
                        "endringstidspunkt": null,
                        "endretAv": null,
                        "endringstype": null
                    },
                    "personstatus": null,
                    "postadresse": null,
                    "doedsdato": null,
                    "foedselsdato": null
                },
                "endringstidspunkt": null,
                "endretAv": null,
                "endringstype": null
            };

        barnIkkeSammeBostedsadresse.tilPerson.ident.ident = ident;
        barnIkkeSammeBostedsadresse.tilPerson.personnavn.fornavn = fornavn;
        barnIkkeSammeBostedsadresse.tilPerson.personnavn.mellomnavn = mellomnavn;
        barnIkkeSammeBostedsadresse.tilPerson.personnavn.etternavn = etternavn;

        familie.harFraRolleI.push(barnIkkeSammeBostedsadresse);
    },

    settBarnMedDoedsdato : function settBarnMedDoedsdato(ident, fornavn, mellomnavn, etternavn, doedsdato) {
        const barnMedDoedsdato =
            {
                "harSammeBosted": null,
                "tilRolle": {
                    "value": "BARN",
                    "kodeRef": null,
                    "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Familierelasjoner"
                },
                "tilPerson": {
                    "diskresjonskode": null,
                    "bankkonto": null,
                    "bostedsadresse": null,
                    "sivilstand": null,
                    "statsborgerskap": null,
                    "harFraRolleI": [],
                    "ident": {
                        "ident": "01010591736",
                        "type": {
                            "value": "FNR",
                            "kodeRef": null,
                            "kodeverksRef": "http://nav.no/kodeverk/Kodeverk/Personidenter"
                        }
                    },
                    "kjoenn": null,
                    "personnavn": {
                        "etternavn": "Mockmann",
                        "fornavn": "Roach",
                        "mellomnavn": null,
                        "sammensattNavn": null,
                        "endringstidspunkt": null,
                        "endretAv": null,
                        "endringstype": null
                    },
                    "personstatus": null,
                    "postadresse": null,
                    "doedsdato": {
                        "doedsdato": null,
                        "endringstidspunkt": null,
                        "endretAv": null,
                        "endringstype": null
                    },
                    "foedselsdato": null
                },
                "endringstidspunkt": null,
                "endretAv": null,
                "endringstype": null
            };

        barnMedDoedsdato.tilPerson.ident.ident = ident;
        barnMedDoedsdato.tilPerson.personnavn.fornavn = fornavn;
        barnMedDoedsdato.tilPerson.personnavn.mellomnavn = mellomnavn;
        barnMedDoedsdato.tilPerson.personnavn.etternavn = etternavn;
        barnMedDoedsdato.tilPerson.doedsdato.doedsdato = doedsdato;

        familie.harFraRolleI.push(barnMedDoedsdato);
    },

    clearFamilieforhold : function clearFamilieforhold() {
        familie.harFraRolleI = [];
    },

    leggTilUtbetaling : function leggTilUtbetaling(periodeFom, periodeTom, posteringsdato, utbetalingsdato, forfallsdato) {

        utbetaling.ytelseListe[0].ytelsesperiode.fom = periodeFom;
        utbetaling.ytelseListe[0].ytelsesperiode.tom = periodeTom;

        utbetaling.ytelseListe[1].ytelsesperiode.fom = periodeFom;
        utbetaling.ytelseListe[1].ytelsesperiode.tom = periodeTom;


        utbetaling.posteringsdato = posteringsdato;
        utbetaling.utbetalingsdato = utbetalingsdato;
        utbetaling.forfallsdato = forfallsdato;
    },

    getAdresserPath : function getAdresserPath() { return endpoints.adresser },
    getAdresserJson : function getAdresserJson() { return adresser },
    getNorgPath : function getNorgPath() { return endpoints.norg },
    getNorgJson : function getNorgJson() { return norg },
    getTelefonPath : function getTelefonPath() { return endpoints.telefon },
    getTelefonJson : function getTelefonJson() { return telefon },
    getBrukerprofilPath : function getBrukerprofilPath() { return endpoints.brukerprofil },
    getBrukerprofilJson : function getBrukerprofilJson() { return brukerprofil },
    getArbeidPath : function getArbeidPath() { return endpoints.arbeid },
    getArbeidJson : function getArbeidJson() { return arbeid },
    getOrganisasjonPath : function getOrganisasjonPath() { return endpoints.organisasjon },
    getOrganisasjonJson : function getOrganisasjonJson() { return organisasjon },
    getFamiliePath : function getFamiliePath() { return endpoints.familie },
    getFamilieJson : function getFamilieJson() { return familie },
    getUtbetalingPath : function getUtbetalingPath() { return endpoints.utbetaling },
    getUtbetalingJson : function getUtbetalingJson() { return utbetaling }
};

