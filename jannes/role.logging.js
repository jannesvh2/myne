var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {

        var msg = '';
        msg += 'W59S29 has ' + Game.rooms.W59S29.energyAvailable + ' energy | ';
        msg +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             ", H: " + Memory.spawns[0].creeps.harvesters2.length + "/" + Memory.spawns[0].summon.h2
            + ", B: " + Memory.spawns[0].creeps.builders2.length + "/" + Memory.spawns[0].summon.b2
            + ", U: " + Memory.spawns[0].creeps.upgraders2.length + "/" + Memory.spawns[0].summon.u2
            + ", a: " + Memory.spawns[0].creeps.attackers.length + "/" + Memory.spawns[0].summon.atk
            + ", s: " + Memory.spawns[0].creeps.scouts.length + "/" + Memory.spawns[0].spots.length
            + ", ST: " + Memory.spawns[0].creeps.stores.length + "/" + Memory.spawns[0].sources.length
            + " | rep: " + Memory.spawns[0].counters.repairLimit;
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        console.log(msg);
    }
};

module.exports = roleLogging;