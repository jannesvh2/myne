var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, h2, b2, u2, atk, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackers, scouts, stores, sources, defenders, spawn) {

        var didSpawn = false;
        //Game.rooms.W59S29.energyCapacityAvailable
        //spawn harvesters
        if (harvesters.length < h) {
            didSpawn = true;
            if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester', spawn: spawn });
            else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'harvester', spawn: spawn });
            else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'harvester', spawn: spawn });
        }
        else if (harvesters2.length < h2) {
            didSpawn = true;
            if (harvesters2.length == 0)
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'harvester2', spawn: spawn });
            else
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'harvester2', spawn: spawn });
        }

        else if (Memory.spawns[spawn].random.useStore) {
            if (didSpawn == false) {
                for (let s = 0, length = sources.length; s < length; s++) {
                    let filterLength = _.filter(stores, (creep) => creep.memory.sourceId.id == sources[s].id);
                    if (sources[s].id == '579fa85c0700be0674d2d80c') {
                        try {
                            if (!filterLength && Memory.spawns[spawn].counters.roomTicks > 500 || filterLength.length < 2 && Memory.spawns[spawn].counters.roomTicks > 500) {
                                var newName5 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'store', sourceId: sources[s], spawn: spawn });
                                if (typeof newName5 == 'string')
                                    Memory.spawns[spawn].counters.roomTicks = 0;
                                didSpawn = true;
                                break;
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    if (!filterLength.length || (filterLength.length == 1 && filterLength[0].ticksToLive < 80)) {

                        if (didSpawn == false) {
                            var newName5 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'store', sourceId: sources[s], spawn: spawn });
                            didSpawn = true;
                            break;
                        }
                    }

                }
            }
        }

        if (Memory.spawns[spawn].spots.length) {
            if (didSpawn == false) {
                for (let scout = 0, length = Memory.spawns[spawn].spots.length; scout < length; scout++) {
                    let ticks = _.filter(scouts, (creep) => creep.memory.sourceRoom == Memory.spawns[spawn].spots[scout].sourceRoom);
                    if (!ticks.length || (ticks.length == 1 && ticks[0].ticksToLive < 120)) {
                        if (Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom] && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation.ticksToEnd > 3500)
                            var newName5 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([MOVE], undefined, { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        else
                            var newName5 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([MOVE, CLAIM, CLAIM, MOVE], undefined, { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        didSpawn = true;
                        break;

                    }
                }
            }
        }

        if (Memory.spawns[spawn].random.defenders.length) {
            if (didSpawn == false) {
                for (let def = 0, length = Memory.spawns[spawn].random.defenders.length; def < length; def++) {
                    def = 0;
                        if (Memory.spawns[spawn].random.defenders[def] != Memory.spawns[spawn].random.mainRoom) {
                            let defs = _.filter(defenders, (creep) => creep.memory.sourceRoom == Memory.spawns[spawn].random.defenders[scout].sourceRoom);
                            if (!defs.length) {
                                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], undefined, { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                                didSpawn = true;
                                break;
                            }
                            
                        }
                        Memory.spawns[spawn].random.defenders.splice(def, 1);
                    }
            }
        }
        if (didSpawn == false) {
            //else if (links.length < Memory.linkSource.length * 2) {
            //    for (let l = 0, length = Memory.linkSource.length; l < length; l++) {
            //        var summonSource = true;
            //        var summonContainer = true;
            //        for (let c = 0, length2 = links.length; c < length2; c++) {
            //            if (links[c].memory.type == 'source' && links[c].ticksToLive > 200 && Memory.linkSource[l].id == links[c].memory.id)
            //                summonSource = false;
            //            if (links[c].memory.type == 'container' && links[c].ticksToLive > 200 && Memory.linkSource[l].sourceRoom == links[c].memory.sourceRoom)
            //                summonContainer = false;

            //        }
            //        if(summonSource)
            //            var newName6 = Game.spawns['Spawn' + spawn+1].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'link', type: 'source', sourceRoom: Memory.linkSource[l].sourceRoom, id: Memory.linkSource[l].id });
            //        if (summonContainer)
            //            var newName7 = Game.spawns['Spawn' + spawn+1].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, { role: 'link', type: 'container', sourceRoom: Memory.linkSource[l].sourceRoom });
            //    }
            //}

            if (builders.length < b) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    var newName2 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, CARRY, MOVE], undefined, { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'builder', spawn: spawn });
            }
            else if (builders2.length < b2) {
                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], undefined, { role: 'builder2', spawn: spawn });
            }
                //console.log('Upgraders: ' + upgraders.length);
            else if (upgraders.length < u) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    var newName3 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, CARRY, MOVE], undefined, { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader', spawn: spawn });
            }
            else if (upgraders2.length < u2 || (Game.getObjectById('57d57cd3636e2e351c38d6fe').store.energy > 25000 && Memory.spawns[spawn].counters.upgradeTicks > 400)) {

                var newName = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, { role: 'upgrader2', spawn: spawn });
                if (typeof newName == 'string')
                    Memory.spawns[spawn].counters.upgradeTicks = 0;
            }
                //console.log('Builders: ' + builders.length);

            else if (attackers.length < atk) {
                //ranged
                var newName4 = Game.spawns['Spawn' + parseInt(spawn + 1)].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], undefined, { role: 'attacker', spawn: spawn });
                //melee
                //var newName4 = Game.spawns['Spawn' + spawn+1].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], undefined, { role: 'attacker' , spawn: spawn});
            }
        }

    }
};

module.exports = roleSpawn;