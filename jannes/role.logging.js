var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {

        var msg = '';
        var msg2 = '';
        var msg3 = '';
        var msg4 = '';
        var progress = '';
        // msg += '( W59S29 has ' + Game.rooms.W59S29.energyAvailable + ' energy | ';
        msg +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "(Spawn 0) H: " + Memory.spawns[0].creeps.harvesters2.length + "/" + Memory.spawns[0].summon.h2
            + ", B: " + Memory.spawns[0].creeps.builders2.length + "/" + Memory.spawns[0].summon.b2
            + ", U: " + Memory.spawns[0].creeps.upgraders2.length + "/" + Memory.spawns[0].counters.avgUpgradersValue
            + ", d/r/h: " + Memory.spawns[0].creeps.attackersD.length + "/" + Memory.spawns[0].summon.atkD + " " + Memory.spawns[0].creeps.attackersR.length + "/" + Memory.spawns[0].summon.atkR + " " + Memory.spawns[0].creeps.attackersH.length + "/" + Memory.spawns[0].summon.atkH
            + ", s: " + Memory.spawns[0].creeps.scouts.length + "/" + Memory.spawns[0].spots.length
            + ", ST: " + Memory.spawns[0].creeps.stores.length + "/" + parseInt(Memory.spawns[0].sources.length)
            + " | rep: " + String(Memory.spawns[0].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            + ", Store: " + Game.getObjectById(Memory.spawns[0].random.storeId).store.energy;

        //  msg += ' ) ( W56S28 has ' + Game.rooms.W56S28.energyAvailable + ' energy | ';
        msg2 +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "(Spawn 1) H: " + Memory.spawns[1].creeps.harvesters2.length + "/" + Memory.spawns[1].summon.h2
            + ", B: " + Memory.spawns[1].creeps.builders2.length + "/" + Memory.spawns[1].summon.b2
            + ", U: " + Memory.spawns[1].creeps.upgraders2.length + "/" + Memory.spawns[1].counters.avgUpgradersValue
            + ", d/r/h: " + Memory.spawns[1].creeps.attackersD.length + "/" + Memory.spawns[1].summon.atkD + " " + Memory.spawns[1].creeps.attackersR.length + "/" + Memory.spawns[1].summon.atkR + " " + Memory.spawns[1].creeps.attackersH.length + "/" + Memory.spawns[1].summon.atkH
            + ", s: " + Memory.spawns[1].creeps.scouts.length + "/" + Memory.spawns[1].spots.length
            + ", ST: " + Memory.spawns[1].creeps.stores.length + "/" + parseInt(Memory.spawns[1].sources.length)
            + " | rep: " + String(Memory.spawns[1].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            + ", Store: " + Game.getObjectById(Memory.spawns[1].random.storeId).store.energy;
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        msg3 +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "(Spawn 2) H: " + Memory.spawns[2].creeps.harvesters2.length + "/" + Memory.spawns[2].summon.h2
            + ", B: " + Memory.spawns[2].creeps.builders2.length + "/" + Memory.spawns[2].summon.b2
            + ", U: " + Memory.spawns[2].creeps.upgraders2.length + "/" + Memory.spawns[2].counters.avgUpgradersValue
            + ", d/r/h: " + Memory.spawns[2].creeps.attackersD.length + "/" + Memory.spawns[2].summon.atkD + " " + Memory.spawns[2].creeps.attackersR.length + "/" + Memory.spawns[2].summon.atkR + " " + Memory.spawns[2].creeps.attackersH.length + "/" + Memory.spawns[2].summon.atkH
            + ", s: " + Memory.spawns[2].creeps.scouts.length + "/" + Memory.spawns[2].spots.length
            + ", ST: " + Memory.spawns[2].creeps.stores.length + "/" + parseInt(Memory.spawns[2].sources.length)
            + " | rep: " + String(Memory.spawns[2].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            + ", Store: " + Game.getObjectById(Memory.spawns[2].random.storeId).store.energy;
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        msg4 +=
    //"h: " + harvesters.length + "/" + h
    //+ ", b: " + builders.length + "/" + b
    //+ ", u: " + upgraders.length + "/" + u
     "(Spawn 3) H: " + Memory.spawns[3].creeps.harvesters2.length + "/" + Memory.spawns[3].summon.h2
    + ", B: " + Memory.spawns[3].creeps.builders2.length + "/" + Memory.spawns[3].summon.b2
    + ", U: " + Memory.spawns[3].creeps.upgraders2.length + "/" + Memory.spawns[3].counters.avgUpgradersValue
    + ", d/r/h: " + Memory.spawns[3].creeps.attackersD.length + "/" + Memory.spawns[3].summon.atkD + " " + Memory.spawns[3].creeps.attackersR.length + "/" + Memory.spawns[3].summon.atkR + " " + Memory.spawns[3].creeps.attackersH.length + "/" + Memory.spawns[3].summon.atkH
    + ", s: " + Memory.spawns[3].creeps.scouts.length + "/" + Memory.spawns[3].spots.length
    + ", ST: " + Memory.spawns[3].creeps.stores.length + "/" + parseInt(Memory.spawns[3].sources.length)
    + " | rep: " + String(Memory.spawns[3].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
    + ", Store: " + Game.getObjectById(Memory.spawns[3].random.storeId).store.energy;
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;


        progress += "GCL " + Game.gcl.level + ": " + (Game.gcl.progress * 100 / Game.gcl.progressTotal).toFixed(2) + "% | W59S29 controller " + Game.rooms[Memory.spawns[0].random.mainRoom].controller.level + ": " + (Game.rooms[Memory.spawns[0].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[0].random.mainRoom].controller.progressTotal).toFixed(2) + "%";
        progress += " | W56S28 controller " + Game.rooms[Memory.spawns[1].random.mainRoom].controller.level + ": " + (Game.rooms[Memory.spawns[1].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[1].random.mainRoom].controller.progressTotal).toFixed(2) + "%";
        progress += " | W54S28 controller " + Game.rooms[Memory.spawns[2].random.mainRoom].controller.level + ": " + (Game.rooms[Memory.spawns[2].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[2].random.mainRoom].controller.progressTotal).toFixed(2) + "%";
        progress += " | W52S29 controller " + Game.rooms[Memory.spawns[3].random.mainRoom].controller.level + ": " + (Game.rooms[Memory.spawns[3].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[3].random.mainRoom].controller.progressTotal).toFixed(2) + "%";

        console.log(msg);
        console.log(msg2);
        console.log(msg3);
        console.log(msg4);
        console.log(progress);
    }
};

module.exports = roleLogging;