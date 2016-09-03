var roleLogging = {

    /** @param {Creep} creep **/
    run: function (h, b, u, harvesters, builders, upgraders) {

        for (var name in Game.rooms) {
            console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
        }
        console.log("h: " + harvesters.length + "/" + h + ", b: " + builders.length + "/" + b + ", u: " + upgraders.length + "/" + u);
    }
};

module.exports = roleLogging;