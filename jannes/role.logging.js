var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {

        var msg = '';
       // msg += '( W59S29 has ' + Game.rooms.W59S29.energyAvailable + ' energy | ';
        msg +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "( W59S29 has , H: " + Memory.spawns[0].creeps.harvesters2.length + "/" + Memory.spawns[0].summon.h2
            + ", B: " + Memory.spawns[0].creeps.builders2.length + "/" + Memory.spawns[0].summon.b2
            + ", U: " + Memory.spawns[0].creeps.upgraders2.length + "/" + Memory.spawns[0].summon.u2
            + ", m/r: " + Memory.spawns[0].creeps.attackersM.length + "/" + Memory.spawns[0].summon.atkM +" "+ Memory.spawns[0].creeps.attackersR.length + "/" + Memory.spawns[0].summon.atkR
            + ", s: " + Memory.spawns[0].creeps.scouts.length + "/" + Memory.spawns[0].spots.length
            + ", ST: " + Memory.spawns[0].creeps.stores.length + "/" + parseInt(Memory.spawns[0].sources.length)
            + " | rep: " + String(Memory.spawns[0].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,');

      //  msg += ' ) ( W56S28 has ' + Game.rooms.W56S28.energyAvailable + ' energy | ';
        msg +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "( W56S28 has , H: " + Memory.spawns[1].creeps.harvesters2.length + "/" + Memory.spawns[1].summon.h2
            + ", B: " + Memory.spawns[1].creeps.builders2.length + "/" + Memory.spawns[1].summon.b2
            + ", U: " + Memory.spawns[1].creeps.upgraders2.length + "/" + Memory.spawns[1].summon.u2
            + ", m/r: " + Memory.spawns[1].creeps.attackersM.length + "/" + Memory.spawns[1].summon.atkM +" "+ Memory.spawns[1].creeps.attackersR.length + "/" + Memory.spawns[1].summon.atkR
            + ", s: " + Memory.spawns[1].creeps.scouts.length + "/" + Memory.spawns[1].spots.length
            + ", ST: " + Memory.spawns[1].creeps.stores.length + "/" + parseInt(Memory.spawns[1].sources.length)
            + " | rep: " + String(Memory.spawns[1].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        +" )";
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        console.log(msg);
    }
};

module.exports = roleLogging;