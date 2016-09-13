var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {

        var msg = '';
        msg += '( W59S29 has ' + Game.rooms.W59S29.energyAvailable + ' energy | ';
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
        msg += ' ) ( W56S28 has ' + Game.rooms.W56S28.energyAvailable + ' energy | ';
        msg +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             ", h: " + Memory.spawns[1].creeps.harvesters.length + "/" + Memory.spawns[1].summon.h
            + ", b: " + Memory.spawns[1].creeps.builders.length + "/" + Memory.spawns[1].summon.b
            + ", u: " + Memory.spawns[1].creeps.upgraders.length + "/" + Memory.spawns[1].summon.u
            + ", a: " + Memory.spawns[1].creeps.attackers.length + "/" + Memory.spawns[1].summon.atk
            + ", s: " + Memory.spawns[1].creeps.scouts.length + "/" + Memory.spawns[1].spots.length
            + ", ST: " + Memory.spawns[1].creeps.stores.length + "/" + Memory.spawns[1].sources.length
            + " | rep: " + Memory.spawns[1].counters.repairLimit;
        +" )";
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        console.log(msg);
    }
};

module.exports = roleLogging;