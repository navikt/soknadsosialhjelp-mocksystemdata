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
const arbeidsforholdMedArbeidsgivernummerJSON = require("./jsonPartialTemplates/arbeidsforholdMedArbeidsgivernummer.js");
const arbeidsforholdMedIdentJSON = require("./jsonPartialTemplates/arbeidsforholdMedIdent.js");
const arbeidsforholdMedOrganisasjonJSON = require("./jsonPartialTemplates/arbeidsforholdMedOrganisasjon.js");
const ektefelleJSON = require('./jsonPartialTemplates/ektefelle');
const barnSammeBostedsadresseJSON = require('./jsonPartialTemplates/barnSammeBostedsadresse');
const barnIkkeSammeBostedsadresseJSON = require('./jsonPartialTemplates/barnIkkeSammeBostedsadresse');
const barnMedDoedsdatoJSON = require('./jsonPartialTemplates/barnMedDoedsdato');
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

	settNavn : (fornavn, mellomnavn, etternavn) => {
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

    settIdent : (ident) => {
	    familie[IDENT][IDENT] = ident;
    },

	settMidlertidigPostadresse : (midlertidigPostadresseEgendefinertValue) => {
		brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresseJSON;
	},

	settTelefonnummer : (telefonnummer) => {
		if (typeof telefonnummer === "undefined") {
			throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).")
		}
		telefon[VERDI] = telefonnummer;
	},

	settBankkontonummer : (bankkontonummer) => {

		if (bankkontonummer !== null){
			brukerprofil[PERSON][BANKKONTO] = { "bankkonto" : { "bankkontonummer": bankkontonummer} }
		} else {
			brukerprofil[PERSON][BANKKONTO] = null;
		}
	},

	settArbeidsforholdMedArbeidsgivernummer : (startDato, sluttDato, stillingsProsent, arbeidsgiverNummer, arbeidsgiverNavn ) => {
		const nyttArbeidsForholdMedArbeidsgivernummer = arbeidsforholdMedArbeidsgivernummerJSON;

		nyttArbeidsForholdMedArbeidsgivernummer.ansettelsesPeriode.periode.fom = startDato;
		nyttArbeidsForholdMedArbeidsgivernummer.ansettelsesPeriode.periode.tom = sluttDato;
		nyttArbeidsForholdMedArbeidsgivernummer.arbeidsavtale[0].stillingsprosent = stillingsProsent;
		nyttArbeidsForholdMedArbeidsgivernummer.arbeidsgiver.arbeidsgivernummer = arbeidsgiverNummer;
		nyttArbeidsForholdMedArbeidsgivernummer.arbeidsgiver.navn = arbeidsgiverNavn;


		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdMedArbeidsgivernummer);
	},

	settArbeidsforholdMedIdent : (startDato, sluttDato, stillingsProsent, ident ) => {
		const nyttArbeidsForholdMedIdent = arbeidsforholdMedIdentJSON;

		nyttArbeidsForholdMedIdent.ansettelsesPeriode.periode.fom = startDato;
		nyttArbeidsForholdMedIdent.ansettelsesPeriode.periode.tom = sluttDato;
		nyttArbeidsForholdMedIdent.arbeidsavtale[0].stillingsprosent = stillingsProsent;
		nyttArbeidsForholdMedIdent.arbeidsgiver.ident.ident = ident;

		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdMedIdent);
	},

	settArbeidsforholdMedOrganisasjonsnummer : ( startDato, sluttDato, stillingsProsent, orgnummer ) => {
		const nyttArbeidsForholdMedOrganisasjon = arbeidsforholdMedOrganisasjonJSON;

		nyttArbeidsForholdMedOrganisasjon.ansettelsesPeriode.periode.fom = startDato;
		nyttArbeidsForholdMedOrganisasjon.ansettelsesPeriode.periode.tom = sluttDato;
		nyttArbeidsForholdMedOrganisasjon.arbeidsavtale[0].stillingsprosent = stillingsProsent;
		nyttArbeidsForholdMedOrganisasjon.arbeidsgiver.orgnummer = orgnummer;

		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForholdMedOrganisasjon);
	},

	clearArbeidsforhold : () => {
		arbeid = arbeidJSON;
	},

	settOrganisasjon : ( orgnummer, navn ) => {
		organisasjon = organisasjonJSON;
        const nyOrganisasjon = nyOrganisasjonJSON;
        nyOrganisasjon.orgnummer = orgnummer;
        nyOrganisasjon.navn.navnelinje = [ navn ];

        organisasjon[ORGANISASJON] = nyOrganisasjon;
	},

	clearOrganisasjon : () => {
		organisasjon = null;
	},

	settEktefelleMedSammeBostedsadresse : (ident, fornavn, mellomnavn, etternavn, foedselsdato) => {
		const ektefelle = ektefelleJSON;

		ektefelle.harSammeBosted = true;

		ektefelle.tilPerson.ident.ident = ident;
		ektefelle.tilPerson.personnavn.fornavn = fornavn;
		ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
		ektefelle.tilPerson.personnavn.etternavn = etternavn;
		ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;

		familie.harFraRolleI.push(ektefelle);
		familie.sivilstand.sivilstand.value = "GIFT"
    },

    settEktefelleUtenSammeBostedsadresse : (ident, fornavn, mellomnavn, etternavn, foedselsdato) => {
        const ektefelle = ektefelleJSON;

        ektefelle.harSammeBosted = false;

        ektefelle.tilPerson.ident.ident = ident;
        ektefelle.tilPerson.personnavn.fornavn = fornavn;
        ektefelle.tilPerson.personnavn.mellomnavn = mellomnavn;
        ektefelle.tilPerson.personnavn.etternavn = etternavn;
        ektefelle.tilPerson.foedselsdato.foedselsdato = foedselsdato;

        familie.harFraRolleI.push(ektefelle);
        familie.sivilstand.sivilstand.value = "GIFT"
    },

	settEktefelleMedKodeSeks: (ident, fornavn, mellomnavn, etternavn, foedselsdato) => {
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

	settEktefelleMedKodeSyv: (ident, fornavn, mellomnavn, etternavn, foedselsdato) => {
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

	settBarnSameBostedsadresse : (ident, fornavn, mellomnavn, etternavn) => {
        const barnSammeBostedsadresse = barnSammeBostedsadresseJSON;

        barnSammeBostedsadresse.tilPerson.ident.ident = ident;
        barnSammeBostedsadresse.tilPerson.personnavn.fornavn = fornavn;
        barnSammeBostedsadresse.tilPerson.personnavn.mellomnavn = mellomnavn;
        barnSammeBostedsadresse.tilPerson.personnavn.etternavn = etternavn;

        familie.harFraRolleI.push(barnSammeBostedsadresse);
    },

    settBarnIkkeSameBostedsadresse : (ident, fornavn, mellomnavn, etternavn) => {
        const barnIkkeSammeBostedsadresse = barnIkkeSammeBostedsadresseJSON;

        barnIkkeSammeBostedsadresse.tilPerson.ident.ident = ident;
        barnIkkeSammeBostedsadresse.tilPerson.personnavn.fornavn = fornavn;
        barnIkkeSammeBostedsadresse.tilPerson.personnavn.mellomnavn = mellomnavn;
        barnIkkeSammeBostedsadresse.tilPerson.personnavn.etternavn = etternavn;

        familie.harFraRolleI.push(barnIkkeSammeBostedsadresse);
    },

    settBarnMedDoedsdato : (ident, fornavn, mellomnavn, etternavn, doedsdato) => {
        const barnMedDoedsdato = barnMedDoedsdatoJSON;

        barnMedDoedsdato.tilPerson.ident.ident = ident;
        barnMedDoedsdato.tilPerson.personnavn.fornavn = fornavn;
        barnMedDoedsdato.tilPerson.personnavn.mellomnavn = mellomnavn;
        barnMedDoedsdato.tilPerson.personnavn.etternavn = etternavn;
        barnMedDoedsdato.tilPerson.doedsdato.doedsdato = doedsdato;

        familie.harFraRolleI.push(barnMedDoedsdato);
    },

	clearFamilieforhold : () => {
		familie = familieJSON;
	},

    leggTilUtbetaling : (periodeFom, periodeTom, posteringsdato, utbetalingsdato, forfallsdato) => {

	    utbetaling.ytelseListe[0].ytelsesperiode.fom = periodeFom;
	    utbetaling.ytelseListe[0].ytelsesperiode.tom = periodeTom;

        utbetaling.ytelseListe[1].ytelsesperiode.fom = periodeFom;
        utbetaling.ytelseListe[1].ytelsesperiode.tom = periodeTom;


	    utbetaling.posteringsdato = posteringsdato;
	    utbetaling.utbetalingsdato = utbetalingsdato;
	    utbetaling.forfallsdato = forfallsdato;
    },

    getAdresserPath : () => { return endpoints.adresser },
    getAdresserJson : () => { return adresser },
    getNorgPath : () => { return endpoints.norg },
    getNorgJson : () => { return norg },
    getTelefonPath : () => { return endpoints.telefon },
    getTelefonJson : () => { return telefon },
    getBrukerprofilPath : () => { return endpoints.brukerprofil },
    getBrukerprofilJson : () => { return brukerprofil },
    getArbeidPath : () => { return endpoints.arbeid },
    getArbeidJson : () => { return arbeid },
    getOrganisasjonPath : () => { return endpoints.organisasjon },
    getOrganisasjonJson : () => { return organisasjon },
    getFamiliePath : () => { return endpoints.familie },
    getFamilieJson : () => { return familie },
    getUtbetalingPath : () => { return endpoints.utbetaling },
    getUtbetalingJson : () => { return utbetaling }
};

