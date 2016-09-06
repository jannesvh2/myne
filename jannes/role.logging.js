var roleLogging = {

    /** @param {Creep} creep **/
    run: function (h, b, u, a, harvesters, builders, upgraders, attackers, scouts) {

        var msg = '';
        for (var name in Game.rooms) {
            msg += 'Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy | ';
        }
        msg += "h: " + harvesters.length + "/" + h + ", b: " + builders.length + "/" + b + ", u: " + upgraders.length + "/" + u + ", a: " + attackers.length + "/" + a + ", s: " + scouts.length + "/" + Memory.spots.length;
        console.log(msg);
    }
};

module.exports = roleLogging;