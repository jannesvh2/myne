var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources) {
        //clearing memory of non existing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        var didSpawn = false;
        for (var scout = 0, length = Memory.spots.length; scout < length; scout++) {
            var mustCreate = true;
            for (var scoutCreep = 0, length2 = scouts.length; scoutCreep < length2; scoutCreep++) {
                if (scouts[scoutCreep].memory.sourceRoom == Memory.spots[scout].sourceRoom) {
                    if (scouts[scoutCreep].ticksToLive > 150) {
                        mustCreate = false;
                        break;
                    }
                }
            }
            if (mustCreate) {
                //var newName5 = Game.spawns['Spawn1'].createCreep([MOVE, CLAIM], undefined, { role: 'scout', sourceRoom: Memory.spots[scout].sourceRoom });
                var newName5 = Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'scout', sourceRoom: Memory.spots[scout].sourceRoom });
                didSpawn = true;
            }
        }
        //Game.rooms.W59S29.energyCapacityAvailable
        //spawn harvesters
        if (didSpawn == false) {
            for (var s = 0, length = sources.length; s < length; s++) {
                var mustCreate = true;
                for (var storeCreep = 0, length2 = stores.length; storeCreep < length2; storeCreep++) {
                    if (stores[storeCreep] && stores[storeCreep].ticksToLive > 100 && stores[storeCreep].memory.sourceId.id == sources[s].id) {
                        mustCreate = false;
                        break;
                    }
                }
                if (mustCreate) {
                    if (sources[s].id == '579fa85c0700be0674d2d80c') {
                        if (Memory.roomTicks > 1100) {
                            var newName5 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'store', sourceId: sources[s] });
                            if (newName5 == OK)
                                Memory.roomTicks = 0;
                            didSpawn = true;
                        }
                    } else {
                        var newName5 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'store', sourceId: sources[s] });
                        didSpawn = true;
                    }
                }
            }
        }

        if (didSpawn == false) {
            if (harvesters.length < h) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'harvester' });
            }
            if (harvesters2.length < h2) {
                var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'harvester2' });
            }
                //else if (links.length < Memory.linkSource.length * 2) {
                //    for (var l = 0, length = Memory.linkSource.length; l < length; l++) {
                //        var summonSource = true;
                //        var summonContainer = true;
                //        for (var c = 0, length2 = links.length; c < length2; c++) {
                //            if (links[c].memory.type == 'source' && links[c].ticksToLive > 200 && Memory.linkSource[l].id == links[c].memory.id)
                //                summonSource = false;
                //            if (links[c].memory.type == 'container' && links[c].ticksToLive > 200 && Memory.linkSource[l].sourceRoom == links[c].memory.sourceRoom)
                //                summonContainer = false;

                //        }
                //        if(summonSource)
                //            var newName6 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'link', type: 'source', sourceRoom: Memory.linkSource[l].sourceRoom, id: Memory.linkSource[l].id });
                //        if (summonContainer)
                //            var newName7 = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, { role: 'link', type: 'container', sourceRoom: Memory.linkSource[l].sourceRoom });
                //    }
                //}
            else if (builders.length < b) {
                var newName2 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'builder' });
            }
            else if (builders2.length < b2) {
                var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'builder2' });
            }
                //console.log('Upgraders: ' + upgraders.length);
            else if (upgraders.length < u) {
                var newName3 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader' });
            }
            else if (upgraders2.length < u2 || (Game.getObjectById('57d57cd3636e2e351c38d6fe').store.energy > 25000 && Memory.upgradeTicks > 400)) {
                
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader2' });
                if (newName == OK)
                    Memory.upgradeTicks = 0;
            }
                //console.log('Builders: ' + builders.length);

            else if (attackers.length < atk) {
                //ranged
                var newName4 = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], undefined, { role: 'attacker' });
                //melee
                //var newName4 = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], undefined, { role: 'attacker' });
            }
        }

    }
};

module.exports = roleSpawn;