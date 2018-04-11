'use strict';

let _ = require('lodash');

module.exports = builder;

function builder(locale) {
    locale = locale || 'en';
    let translations = _.merge(
        {},
        require(`./${locale}/enums/basisOfRecord`),
        require(`./${locale}/enums/cms`),
        require(`./${locale}/enums/continent`),
        require(`./${locale}/enums/country`),
        require(`./${locale}/enums/endpointType`),
        require(`./${locale}/enums/establishmentMeans`),
        require(`./${locale}/enums/filterNames`),
        require(`./${locale}/enums/installationType`),
        require(`./${locale}/enums/integerEnums`),
        require(`./${locale}/enums/issueEnum`),
        require(`./${locale}/enums/issueHelp`),
        require(`./${locale}/enums/iucnStatus`),
        require(`./${locale}/enums/language`),
        require(`./${locale}/enums/license`),
        require(`./${locale}/enums/mediaType`),
        require(`./${locale}/enums/nameTypeEnum`),
        require(`./${locale}/enums/nameUsageOrigin`),
        require(`./${locale}/enums/occurrenceIssue`),
        require(`./${locale}/enums/originEnum`),
        require(`./${locale}/enums/protocol`),
        require(`./${locale}/enums/region`),
        require(`./${locale}/enums/role`),
        require(`./${locale}/enums/statusEnum`),
        require(`./${locale}/enums/taxonomicStatus`),
        require(`./${locale}/enums/taxonRank`),
        require(`./${locale}/enums/typeStatus`),
        require(`./${locale}/components/menu`),
        require(`./${locale}/components/ocurrenceFieldNames`),
        require(`./${locale}/components/validation`),
        require(`./${locale}/components/health`),
        require(`./${locale}/components/map`),
        require(`./${locale}/components/profile`),
        require(`./${locale}/misc`),
        require(`../server/${locale}`)
    );

    return translations;
}