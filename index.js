var API = require('./src/GasMPG/api');

module.exports = {
    getListOfMPGS: API.getListOfMPGS,
    postOneMPG: API.postOneMPG,
    postManyMPGs: API.postManyMPGs
}