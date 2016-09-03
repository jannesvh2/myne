var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {

        for (var name in Game.rooms) {
            console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
        }
    }
};

module.exports = roleLogging;