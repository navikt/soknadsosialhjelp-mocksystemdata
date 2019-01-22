// Test arbeidsforhold:
const mocksystemdata = require('./mocksystemdata/mocksystemdata');
mocksystemdata.settArbeidsforholdMedArbeidsgivernummer("2019-01-01", "2019-01-02", '99', '123', 'Team Liquid');
console.warn(mocksystemdata.getArbeidJson().arbeidsforhold[0]);

// Utbetalinger:
mocksystemdata.settUtbetaling("Barnetrygd", "2018-12-01", "2018-12-12", 3880);
const generatedUtbetaling = mocksystemdata.getUtbetalingJson();

const utbetalingjson = {
    "posteringsdato": "2018-12-01",
    "utbetaltTil": {
        "aktoerId": "12345678910",
        "navn": "Dummy",
        "id": null,
        "diskresjonskode": null
    },
    "utbetalingNettobeloep": 3880,
    "utbetalingsmelding": null,
    "ytelseListe": [],
    "utbetalingsdato": "2018-12-11",
    "forfallsdato": "2018-12-10",
    "utbetaltTilKonto": {
        "kontonummer": "32902095534",
        "kontotype": "Norsk bankkonto"
    },
    "utbetalingsmetode": "Norsk bankkonto",
    "utbetalingsstatus": "Utbetalt"
};

const ytelseJson = {
    "ytelsestype": {
        "value": "Barnetrygd",
        "kodeRef": null,
        "kodeverksRef": null
    },
    "ytelsesperiode": {
        "fom": "2018-12-01",
        "tom": "2018-12-12"
    },
    "ytelseskomponentListe": [
        {
            "ytelseskomponenttype": "Ordinær og utvidet",
            "satsbeloep": 0,
            "satstype": null,
            "satsantall": null,
            "ytelseskomponentbeloep": 3880
        }
    ],
    "ytelseskomponentersum": 3880,
    "trekkListe": [],
    "trekksum": 0,
    "skattListe": [],
    "skattsum": 0,
    "ytelseNettobeloep": 3880,
    "bilagsnummer": "568269505",
    "rettighetshaver": {
        "aktoerId": "12345678910",
        "navn": "Dummy",
        "id": null,
        "diskresjonskode": null
    },
    "refundertForOrg": {
        "aktoerId": "000000000",
        "navn": null,
        "id": null
    }
};

utbetalingjson.ytelseListe.push(ytelseJson);

if (JSON.stringify(utbetalingjson) === JSON.stringify(generatedUtbetaling)){
    console.info("Utbetalinger OK!");
} else {
    console.error("Feil i utbetalinger!");
    console.error("Generated utbetaling: ");
    console.error(generatedUtbetaling);
    console.error("utbetalingJson: ");
    console.error(utbetalingjson);
}



