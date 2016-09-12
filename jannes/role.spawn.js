var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources, spawn) {
        
        //spawn1
        var didSpawn = false;
        for (var scout = 0, length = Memory.spawns[spawn].spots.length; scout < length; scout++) {
            var mustCreate = true;
            for (var scoutCreep = 0, length2 = scouts.length; scoutCreep < length2; scoutCreep++) {
                if (scouts[scoutCreep].memory.sourceRoom == Memory.spawns[spawn].spots[scout].sourceRoom) {
                    if (scouts[scoutCreep].ticksToLive > 150) {
                        mustCreate = false;
                        break;
                    }
                }
            }
            if (mustCreate) {
                //var newName5 = Game.spawns['Spawn1'].createCreep([MOVE, CLAIM], undefined, { role: 'scout', sourceRoom: Memory.spots[scout].sourceRoom });
                var newName5 = Game.spawns['Spawn1'].createCreep([MOVE], undefined, { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
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
                        if (Memory.spawns[spawn].counters.roomTicks > 1100) {
                            var newName5 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'store', sourceId: sources[s], spawn: spawn });
                            if (!(newName5 === parseInt(newName5, 10)))
                                Memory.spawns[spawn].counters.roomTicks = 0;
                            didSpawn = true;
                        }
                    } else {
                        var newName5 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'store', sourceId: sources[s], spawn: spawn });
                        didSpawn = true;
                    }
                }
            }
        }

        if (didSpawn == false) {
            if (harvesters.length < h) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'harvester', spawn: spawn });
            }
            if (harvesters2.length < h2) {
                var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'harvester2', spawn: spawn });
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
                var newName2 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'builder', spawn: spawn });
            }
            else if (builders2.length < b2) {
                var newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'builder2', spawn: spawn });
            }
                //console.log('Upgraders: ' + upgraders.length);
            else if (upgraders.length < u) {
                var newName3 = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader', spawn: spawn });
            }
            else if (upgraders2.length < u2 || (Game.getObjectById('57d57cd3636e2e351c38d6fe').store.energy > 25000 && Memory.spawns[spawn].counters.upgradeTicks > 400)) {
                
                var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader2', spawn: spawn });
                if (!(newName === parseInt(newName, 10)))
                    Memory.spawns[spawn].counters.upgradeTicks = 0;
            }
                //console.log('Builders: ' + builders.length);

            else if (attackers.length < atk) {
                //ranged
                var newName4 = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], undefined, { role: 'attacker', spawn: spawn });
                //melee
                //var newName4 = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], undefined, { role: 'attacker' , spawn: spawn});
            }
        }

    }
};

module.exports = roleSpawn;