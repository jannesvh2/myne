var roleLogging = {

    /** @param {Creep} creep **/
    run: function (h, b, u, h2, b2, u2, a, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources) {

        var msg = '';
        for (var name in Game.rooms) {
            msg += 'Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy | ';
        }
        msg +=
            "h: " + harvesters.length + "/" + h
            + ", b: " + builders.length + "/" + b
            + ", u: " + upgraders.length + "/" + u
            + ", a: " + attackers.length + "/" + a
            + ", s: " + scouts.length + "/" + Memory.spots.length
            + ", H2: " + harvesters2.length + "/" + h2
            + ", B2: " + builders2.length + "/" + b2
            + ", U2: " + upgraders2.length + "/" + u2
            + ", ST: " + stores.length + "/" + sources.length;
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        console.log(msg);
    }
};

module.exports = roleLogging;