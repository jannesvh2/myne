var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {

        var msg = '';
        var msg2 = '';
        var msg3 = '';
        var msg4 = '';
        var msg5 = '';
        var msg6 = '';
        var progress = '';
        // msg += '( W59S29 has ' + Game.rooms.W59S29.energyAvailable + ' energy | ';
        msg +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "(Spawn 0) H: " + Memory.spawns[0].creeps.harvesters2.length + "/" + Memory.spawns[0].summon.h2
            + ", B: " + Memory.spawns[0].creeps.builders2.length + "/" + Memory.spawns[0].summon.b2
            + ", U: " + Memory.spawns[0].creeps.upgraders2.length + "/" + Memory.spawns[0].counters.avgUpgradersValue
            + ", d/m/h: " + Memory.spawns[0].creeps.attackersD.length + "/" + Memory.spawns[0].summon.atkD + " " + Memory.spawns[0].creeps.attackersM.length + "/" + Memory.spawns[0].summon.atkM + " " + Memory.spawns[0].creeps.attackersH.length + "/" + Memory.spawns[0].summon.atkH
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
            + ", d/m/h: " + Memory.spawns[1].creeps.attackersD.length + "/" + Memory.spawns[1].summon.atkD + " " + Memory.spawns[1].creeps.attackersM.length + "/" + Memory.spawns[1].summon.atkM + " " + Memory.spawns[1].creeps.attackersH.length + "/" + Memory.spawns[1].summon.atkH
            + ", s: " + Memory.spawns[1].creeps.scouts.length + "/" + Memory.spawns[1].spots.length
            + ", ST: " + Memory.spawns[1].creeps.stores.length + "/" + parseInt(Memory.spawns[1].sources.length)
            + " | rep: " + String(Memory.spawns[1].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            + ", Store: " + Game.getObjectById(Memory.spawns[1].random.storeId).store.energy;
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        msg3 +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "(Spawn 2) H: " + Memory.spawns[2].creeps.harvesters.length + "/" + Memory.spawns[2].summon.h
            + ", B: " + Memory.spawns[2].creeps.builders.length + "/" + Memory.spawns[2].summon.b
            + ", U: " + Memory.spawns[2].creeps.upgraders.length + "/" + Memory.spawns[2].summon.u
            + ", d/m/h: " + Memory.spawns[2].creeps.attackersD.length + "/" + Memory.spawns[2].summon.atkD + " " + Memory.spawns[2].creeps.attackersM.length + "/" + Memory.spawns[2].summon.atkM + " " + Memory.spawns[2].creeps.attackersH.length + "/" + Memory.spawns[2].summon.atkH
            + ", s: " + Memory.spawns[2].creeps.scouts.length + "/" + Memory.spawns[2].spots.length
            + ", ST: " + Memory.spawns[2].creeps.stores.length + "/" + parseInt(Memory.spawns[2].sources.length)
            + " | rep: " + String(Memory.spawns[2].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            //+ ", Store: " + Game.getObjectById(Memory.spawns[2].random.storeId).store.energy;
        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        msg4 +=
            //"h: " + harvesters.length + "/" + h
            //+ ", b: " + builders.length + "/" + b
            //+ ", u: " + upgraders.length + "/" + u
             "(Spawn 3) H: " + Memory.spawns[3].creeps.harvesters.length + "/" + Memory.spawns[3].summon.h
            + ", B: " + Memory.spawns[3].creeps.builders.length + "/" + Memory.spawns[3].summon.b
            + ", U: " + Memory.spawns[3].creeps.upgraders.length + "/" + Memory.spawns[3].summon.u
            + ", d/m/h: " + Memory.spawns[3].creeps.attackersD.length + "/" + Memory.spawns[3].summon.atkD + " " + Memory.spawns[3].creeps.attackersM.length + "/" + Memory.spawns[3].summon.atkM + " " + Memory.spawns[3].creeps.attackersH.length + "/" + Memory.spawns[3].summon.atkH
            + ", s: " + Memory.spawns[3].creeps.scouts.length + "/" + Memory.spawns[3].spots.length
            + ", ST: " + Memory.spawns[3].creeps.stores.length + "/" + parseInt(Memory.spawns[3].sources.length)
            + " | rep: " + String(Memory.spawns[3].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            //+ ", Store: " + Game.getObjectById(Memory.spawns[3].random.storeId).store.energy;
            //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        //msg5 +=
        //   //"h: " + harvesters.length + "/" + h
        //   //+ ", b: " + builders.length + "/" + b
        //   //+ ", u: " + upgraders.length + "/" + u
        //    "(Spawn 4) H: " + Memory.spawns[4].creeps.harvesters2.length + "/" + Memory.spawns[4].summon.h2
        //   + ", B: " + Memory.spawns[4].creeps.builders2.length + "/" + Memory.spawns[4].summon.b2
        //   + ", U: " + Memory.spawns[4].creeps.upgraders2.length + "/" + Memory.spawns[4].counters.avgUpgradersValue
        //   + ", d/m/h: " + Memory.spawns[4].creeps.attackersD.length + "/" + Memory.spawns[4].summon.atkD + " " + Memory.spawns[4].creeps.attackersM.length + "/" + Memory.spawns[4].summon.atkM + " " + Memory.spawns[4].creeps.attackersH.length + "/" + Memory.spawns[4].summon.atkH
        //   + ", s: " + Memory.spawns[4].creeps.scouts.length + "/" + Memory.spawns[4].spots.length
        //   + ", ST: " + Memory.spawns[4].creeps.stores.length + "/" + parseInt(Memory.spawns[4].sources.length)
        //   + " | rep: " + String(Memory.spawns[4].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        //   + ", Store: " + Game.getObjectById(Memory.spawns[4].random.storeId).store.energy;
        ////+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;

        //msg6 +=
        //    "(Spawn 5) H: " + Memory.spawns[5].creeps.harvesters2.length + "/" + Memory.spawns[5].summon.h2
        //   + ", B: " + Memory.spawns[5].creeps.builders2.length + "/" + Memory.spawns[5].summon.b2
        //   + ", U: " + Memory.spawns[5].creeps.upgraders2.length + "/" + Memory.spawns[5].counters.avgUpgradersValue
        //   + ", d/m/h: " + Memory.spawns[5].creeps.attackersD.length + "/" + Memory.spawns[5].summon.atkD + " " + Memory.spawns[5].creeps.attackersM.length + "/" + Memory.spawns[5].summon.atkM + " " + Memory.spawns[5].creeps.attackersH.length + "/" + Memory.spawns[5].summon.atkH
        //   + ", s: " + Memory.spawns[5].creeps.scouts.length + "/" + Memory.spawns[5].spots.length
        //   + ", ST: " + Memory.spawns[5].creeps.stores.length + "/" + parseInt(Memory.spawns[5].sources.length)
        //   + " | rep: " + String(Memory.spawns[5].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        //   + ", Store: " + Game.getObjectById(Memory.spawns[5].random.storeId).store.energy;
        //        //+ ", l: " + links.length + "/" + Memory.linkSource.length * 2;


        progress += "GCL " + Game.gcl.level + ": " + (Game.gcl.progress * 100 / Game.gcl.progressTotal).toFixed(2) + "%";
        progress += " | <strong>0</strong> controller <strong>" + Game.rooms[Memory.spawns[0].random.mainRoom].controller.level + "</strong>: <font color='yellow'>" + (Game.rooms[Memory.spawns[0].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[0].random.mainRoom].controller.progressTotal).toFixed(2) + "%</font>";
        progress += " | <strong>1</strong> controller <strong>" + Game.rooms[Memory.spawns[1].random.mainRoom].controller.level + "</strong>: <font color='yellow'>" + (Game.rooms[Memory.spawns[1].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[1].random.mainRoom].controller.progressTotal).toFixed(2) + "%</font>";
        progress += " | <strong>2<strong> controller <strong>" + Game.rooms[Memory.spawns[2].random.mainRoom].controller.level + "</strong>: <font color='yellow'>" + (Game.rooms[Memory.spawns[2].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[2].random.mainRoom].controller.progressTotal).toFixed(2) + "%</font>";
        progress += " | W52S29 controller " + Game.rooms[Memory.spawns[3].random.mainRoom].controller.level + ": <font color='yellow'>" + (Game.rooms[Memory.spawns[3].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[3].random.mainRoom].controller.progressTotal).toFixed(2) + "%</font>";
        //progress += " | W52S29 controller " + Game.rooms[Memory.spawns[4].random.mainRoom].controller.level + ": " + (Game.rooms[Memory.spawns[4].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[4].random.mainRoom].controller.progressTotal).toFixed(2) + "%";
        //progress += " | W59S26 controller " + Game.rooms[Memory.spawns[5].random.mainRoom].controller.level + ": " + (Game.rooms[Memory.spawns[5].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[5].random.mainRoom].controller.progressTotal).toFixed(2) + "%";

        console.log(msg);
        console.log(msg2);
        console.log(msg3);
        console.log(msg4);
        //console.log(msg5);
        //console.log(msg6);
        console.log(progress);
    }
};

module.exports = roleLogging;