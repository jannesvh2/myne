var roleLogging = {

    /** @param {Creep} creep **/
    run: function () {


        for (let a = 0, length = Memory.global.roomCount; a < length; a++) {
            let msg;
            if (Memory.spawns[a].random.useStore) {
                msg = "(Spawn " + a + ") H: " + Memory.spawns[a].creeps.harvesters2.length + "/" + Memory.spawns[a].summon.h2
                + ", B: " + Memory.spawns[a].creeps.builders2.length + "/" + Memory.spawns[a].summon.b2
                + ", U: " + Memory.spawns[a].creeps.upgraders2.length + "/" + Memory.spawns[a].counters.avgUpgradersValue
                + ", d/m/h: " + Memory.spawns[a].creeps.attackersD.length + "/" + Memory.spawns[a].summon.atkD + " " + Memory.spawns[a].creeps.attackersM.length + "/" + Memory.spawns[a].summon.atkM + " " + Memory.spawns[a].creeps.attackersH.length + "/" + Memory.spawns[a].summon.atkH
                + ", s: " + Memory.spawns[a].creeps.scouts.length + "/" + Memory.spawns[a].spots.length
                + ", ST: " + Memory.spawns[a].creeps.stores.length + "/" + parseInt(Memory.spawns[a].sources.length)
                + " | rep: " + String(Memory.spawns[a].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
                + ", Store: <font color='#4EE2EC'>" + Game.getObjectById(Memory.spawns[a].random.storeId).store.energy + "</font>"
                + " | <font color='yellow'>(" + Game.rooms[Memory.spawns[a].random.mainRoom].controller.level + ") " + (Game.rooms[Memory.spawns[a].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[a].random.mainRoom].controller.progressTotal).toFixed(2) + "%</font>";
            }
            else {
                msg = "(Spawn " + a + ") H: " + Memory.spawns[a].creeps.harvesters.length + "/" + Memory.spawns[a].summon.h
               + ", B: " + Memory.spawns[a].creeps.builders.length + "/" + Memory.spawns[a].summon.b
               + ", U: " + Memory.spawns[a].creeps.upgraders.length + "/" + Memory.spawns[a].summon.u
               + ", d/m/h: " + Memory.spawns[a].creeps.attackersD.length + "/" + Memory.spawns[a].summon.atkD + " " + Memory.spawns[a].creeps.attackersM.length + "/" + Memory.spawns[a].summon.atkM + " " + Memory.spawns[a].creeps.attackersH.length + "/" + Memory.spawns[a].summon.atkH
               + ", s: " + Memory.spawns[a].creeps.scouts.length + "/" + Memory.spawns[a].spots.length
               + ", ST: " + Memory.spawns[a].creeps.stores.length + "/" + parseInt(Memory.spawns[a].sources.length)
               + " | rep: " + String(Memory.spawns[a].counters.repairLimit).replace(/(.)(?=(\d{3})+$)/g, '$1,')
                + " | <font color='yellow'>(" + Game.rooms[Memory.spawns[a].random.mainRoom].controller.level + ") " + (Game.rooms[Memory.spawns[a].random.mainRoom].controller.progress * 100 / Game.rooms[Memory.spawns[a].random.mainRoom].controller.progressTotal).toFixed(2) + "%</font>";
            }
            console.log(msg);
        }
    }
};


module.exports = roleLogging;