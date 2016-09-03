var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {

        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }
};

module.exports = roleLogging;