var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, h2, b2, u2, atkM, atkR, atkH, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackersM, attackersR, attackersH, scouts, stores, sources, defenders, spawn) {
        try {
            var newName;
            var multiSpawn = function (parts, mem) {
                var spawnReturn = null;
                for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                    spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep(parts, null, mem);

                    if (typeof spawnReturn == 'string') {
                        let creep = Game.creeps[spawnReturn];
                        Memory.spawns[creep.memory.spawn].counters.creeps++;
                        if (creep.memory.helper)
                            Memory.spawns[creep.memory.spawn].creeps.helpers.push(creep.name);
                        else if (creep.memory.role == 'harvester')
                            Memory.spawns[creep.memory.spawn].creeps.harvesters.push(creep.name);
                        else if (creep.memory.role == 'harvester2')
                            Memory.spawns[creep.memory.spawn].creeps.harvesters2.push(creep.name);
                        else if (creep.memory.role == 'builder')
                            Memory.spawns[creep.memory.spawn].creeps.builders.push(creep.name);
                        else if (creep.memory.role == 'builder2')
                            Memory.spawns[creep.memory.spawn].creeps.builders2.push(creep.name);
                        else if (creep.memory.role == 'upgrader')
                            Memory.spawns[creep.memory.spawn].creeps.upgraders.push(creep.name);
                        else if (creep.memory.role == 'upgrader2')
                            Memory.spawns[creep.memory.spawn].creeps.upgraders2.push(creep.name);
                        else if (creep.memory.role == 'store')
                            Memory.spawns[creep.memory.spawn].creeps.stores.push(creep.name);
                        else if (creep.memory.role == 'attackerM')
                            Memory.spawns[creep.memory.spawn].creeps.attackersM.push(creep.name);
                        else if (creep.memory.role == 'attackerR')
                            Memory.spawns[creep.memory.spawn].creeps.attackersR.push(creep.name);
                        else if (creep.memory.role == 'attackerH')
                            Memory.spawns[creep.memory.spawn].creeps.attackersH.push(creep.name);
                        else if (creep.memory.role == 'scout')
                            Memory.spawns[creep.memory.spawn].creeps.scouts.push(creep.name);
                        else if (creep.memory.role == 'defender')
                            Memory.spawns[creep.memory.spawn].creeps.defenders.push(creep.name);
                        else if (creep.memory.role == 'attackerD')
                            Memory.spawns[creep.memory.spawn].creeps.attackersD.push(creep.name);
                        else if (creep.memory.role == 'mover')
                            Memory.spawns[creep.memory.spawn].creeps.movers.push(creep.name);
                        else if (creep.memory.role == 'user')
                            Memory.spawns[creep.memory.spawn].creeps.users.push(creep.name);
                        else if (creep.memory.role == 'terminal')
                            Memory.spawns[creep.memory.spawn].creeps.terminals.push(creep.name);
                        else if (creep.memory.role == 'toTerminal')
                            Memory.spawns[creep.memory.spawn].creeps.toTerminals.push(creep.name);
                        else if (creep.memory.role == 'toStore')
                            Memory.spawns[creep.memory.spawn].creeps.toStores.push(creep.name);
                        else if (creep.memory.role == 'claim')
                            Memory.spawns[creep.memory.spawn].creeps.claims.push(creep.name);

                        return spawnReturn;
                    }
                    if (spawnReturn != -4) {
                        return spawnReturn
                    }
                }
                return spawnReturn;


            }



            //Game.rooms.W59S29.energyCapacityAvailable
            //spawn harvesters
            if (Memory.spawns[spawn].random.useStore && !Memory.spawns[spawn].creeps.users.length && Game.rooms[Memory.spawns[spawn].random.mainRoom].energyAvailable < 1300) {
                newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], { role: 'user', spawn: spawn });
                return;
            }
            //Game.spawns['Spawn00'].createCreep([CARRY, CARRY, MOVE], null, { role: 'terminal', spawn: 0 });
            if (Memory.spawns[spawn].random.useLinks && !Memory.spawns[spawn].creeps.movers.length || Memory.spawns[spawn].creeps.movers.length < 2 && Memory.spawns[spawn].creeps.movers[0] && Game.creeps[Memory.spawns[spawn].creeps.movers[0]].ticksToLive < 75) {
                newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], { role: 'mover', spawn: spawn });
                return;
            }
            if (Memory.spawns[spawn].random.useStore && (Memory.spawns[spawn].creeps.users.length < Memory.spawns[spawn].summon.users || (Game.creeps[Memory.spawns[spawn].creeps.users[0]].body.length == 6 && Memory.spawns[spawn].creeps.users.length <= Memory.spawns[spawn].summon.users) || (Memory.spawns[spawn].creeps.users.length < 2 && Memory.spawns[spawn].creeps.users[0] && Game.creeps[Memory.spawns[spawn].creeps.users[0]].ticksToLive < 70))) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1750)
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'user', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 2200)
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'user', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'user', spawn: spawn });
                else
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'user', spawn: spawn });

                if (newName == -6)
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'user', spawn: spawn });
                return;
            }
            if (Memory.spawns[spawn].random.defenders.length) {
                for (let def = 0, length = Memory.spawns[spawn].random.defenders.length; def < length; def++) {
                    //def = 0;
                    if (Memory.spawns[spawn].random.defenders[def] != Memory.spawns[spawn].random.mainRoom) {
                        var defs = _.filter(defenders, (creep) => Game.creeps[creep].memory.sourceRoom == Memory.spawns[spawn].random.defenders[def]);
                        var defType = false;
                        for (let s = 0, lengthS = Memory.spawns[spawn].spots.length; s < lengthS; s++) {
                            if (Memory.spawns[spawn].spots[s].sourceRoom == Memory.spawns[spawn].random.defenders[def]) {
                                if (Memory.spawns[spawn].spots[s].sk)
                                    defType = true;
                            }

                        }
                        if (((!defs.length && !defType) || ((defs.length < 2 || defs.length < 3 && Game.creeps[defs[0]].ticksToLive < 210) && defType)) && Memory.spawns[spawn].random.defenders && Memory.spawns[spawn].random.defenders[def] && Memory.spawns[spawn].random.defenders[def] != undefined) {
                            if (defType)
                                newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK, ATTACK, RANGED_ATTACK, ATTACK, RANGED_ATTACK, ATTACK, RANGED_ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, HEAL, HEAL, HEAL, HEAL, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1300)
                                newName = multiSpawn([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                                newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            else
                                newName = multiSpawn([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, HEAL, HEAL, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            return;

                        }
                        Memory.spawns[spawn].random.defenders.splice(def, 1);
                    }
                }
            }


            if (Memory.spawns[spawn].spawnDefenders && Memory.spawns[spawn].spawnDefenders.length) {
                for (let b = 0, lengthB = Memory.spawns[spawn].spawnDefenders.length; b < lengthB; b++) {
                    let dCreeps = _.filter(defenders, (creep) => Game.creeps[creep].memory.sourceRoom == Memory.spawns[spawn].random.mainRoom && Memory.spawns[spawn].spawnDefenders[b] == Game.creeps[creep].memory.rampart);
                    if (dCreeps.length < 2) {
                        newName = multiSpawn([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom, mustBoost: true, rampart: Memory.spawns[spawn].spawnDefenders[b] });
                        return;
                    }

                }
            }
            if (Memory.spawns[spawn].random.hostiles && (!Memory.spawns[spawn].creeps.defenders.length || _.filter(defenders, (creep) => Game.creeps[creep].memory.sourceRoom == Memory.spawns[spawn].random.mainRoom).length < 2)) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1640)
                    newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom});
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom });
                else
                    newName = multiSpawn([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom, mustBoost: false });

                Memory.spawns[spawn].random.hostiles = false;
                return;
            }

            //dont else if
            if (Memory.spawns[spawn].random.useStore && Memory.spawns[spawn].creeps.stores.length < sources.length) {
                for (let s = 0, length = sources.length; s < length; s++) {
                    let filterLength = _.filter(stores, (creep) => Game.creeps[creep].memory.sourceId == sources[s]);
                    if (!filterLength.length || (filterLength.length == 1 && Game.creeps[filterLength[0]].ticksToLive < 100)) {
                        let roomCheck = Game.getObjectById(sources[s]);
                        if (roomCheck) {
                            if (roomCheck.energyCapacity == 4000) {
                                newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'store', sourceId: sources[s], spawn: spawn, sk: true });
                                return;
                            }
                            else {
                                if (!filterLength.length || (filterLength.length == 1 && Game.creeps[filterLength[0]].ticksToLive < 80)) {
                                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], { role: 'store', sourceId: sources[s], spawn: spawn });
                                    return;
                                }
                            }
                        }
                    }

                }
            }

            if (atkH > 0) {
                if (attackersH.length < atkH) {
                    newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerH', spawn: spawn, getBoost: true, getBoostM: true, getBoostH: true, getBoostT: true });
                    return;
                }
                for (let c = 0, length2 = attackersH.length; c < length2; c++) {
                    if (!Game.creeps[attackersH[c]].memory.resummoned && Game.creeps[attackersH[c]] && Game.creeps[attackersH[c]].ticksToLive < 600) {
                        newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerH', spawn: spawn, getBoost: true, getBoostM: true, getBoostH: true, getBoostT: true });
                        if (typeof newName == 'string') {
                            Game.creeps[attackersH[c]].memory.resummoned = true;
                        }
                        return;
                    }
                }
            }
            if (attackersM.length < atkM) {
                //ranged
                //var newName4 = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], { role: 'attacker', spawn: spawn });
                //melee
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerM', spawn: spawn });
                else
                    newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerM', spawn: spawn, getBoost: true, getBoostM: true, getBoostA: true, getBoostT: true });

                for (let c = 0, length2 = attackersM.length; c < length2; c++) {
                    if (!Game.creeps[attackersM[c]].memory.resummoned && Game.creeps[attackersM[c]] && Game.creeps[attackersM[c]].ticksToLive < 600) {
                        newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerM', spawn: spawn, getBoost: true, getBoostM: true, getBoostA: true, getBoostT: true });
                        if (typeof newName == 'string') {
                            Game.creeps[attackersM[c]].memory.resummoned = true;
                        }
                        return;
                    }
                }
                return;
            }
            if (attackersR.length < atkR) {
                //ranged
                newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], { role: 'attackerR', spawn: spawn });
                //melee
                //var newName4 = Game.spawns['Spawn' + spawn+1].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], { role: 'attacker' , spawn: spawn});
                return;
            }

            if (Memory.spawns[spawn].summon.atkD > 0) {
                if (Memory.spawns[spawn].creeps.attackersD.length < Memory.spawns[spawn].summon.atkD) {
                    newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerD', spawn: spawn, getBoost: true, getBoostM: true, getBoostA: true, getBoostT: true });
                    return;
                }
                for (let c = 0, length2 = Memory.spawns[spawn].creeps.attackersD.length; c < length2; c++) {
                    if (!Game.creeps[Memory.spawns[spawn].creeps.attackersD[c]].memory.resummoned && Game.creeps[Memory.spawns[spawn].creeps.attackersD[c]] && Game.creeps[Memory.spawns[spawn].creeps.attackersD[c]].ticksToLive < 600) {
                        newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerD', spawn: spawn, getBoost: true, getBoostM: true, getBoostA: true, getBoostT: true });
                        if (typeof newName == 'string') {
                            Game.creeps[Memory.spawns[spawn].creeps.attackersD[c]].memory.resummoned = true;
                        }
                        return;
                    }
                }
            }

            if (Memory.spawns[spawn].spots.length) {
                for (let scout = 0, length = Memory.spawns[spawn].spots.length; scout < length; scout++) {
                    let ticks = _.filter(scouts, (creep) => Game.creeps[creep].memory.sourceRoom == Memory.spawns[spawn].spots[scout].sourceRoom);
                    if (!ticks.length || (ticks.length == 1 && Game.creeps[ticks[0]].ticksToLive < 100)) {
                        if (Memory.spawns[spawn].spots[scout].sk) {
                            newName = multiSpawn([MOVE], { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn, sk: true, x: Memory.spawns[spawn].spots[scout].x, y: Memory.spawns[spawn].spots[scout].y, flag: Memory.spawns[spawn].spots[scout].flag });
                            return;
                        }
                        if (Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom] && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation.ticksToEnd > 3500 || Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1300)
                            newName = multiSpawn([MOVE], { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        else
                            newName = multiSpawn([MOVE, CLAIM, CLAIM, MOVE], { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        return;
                    }
                }
            }

            //dont else if
            if (Game.rooms[Memory.spawns[spawn].random.mainRoom].controller.level < 8) {
                if (builders2.length < b2) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], { role: 'builder2', spawn: spawn });
                    else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                    else
                        //newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });


                    return;

                }
                else if (upgraders2.length < u2 || (Memory.spawns[spawn].random.storeId && Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > Memory.spawns[spawn].random.storageReserve && Memory.spawns[spawn].counters.upgradeTicks > 400)) {
                    let getBoost = false;
                    if (Memory.spawns[spawn].random.upgradeBoost)
                        getBoost = true;
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable <= 1800)
                        newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn, getBoost: getBoost });
                    else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn, getBoost: getBoost });
                    else
                        newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn, getBoost: getBoost });
                    if (typeof newName == 'string')
                        Memory.spawns[spawn].counters.upgradeTicks = 0;

                    return;
                }
            }
            else {
                if (builders2.length < b2) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], { role: 'builder2', spawn: spawn });
                    else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                    else
                        //newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });

                    return;

                }
                else if ((!upgraders2.length || (Game.creeps[upgraders2[0]] && Game.creeps[upgraders2[0]].ticksToLive < 90 && upgraders2.length < 2)) && Memory.spawns[spawn].random.storeId && Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > (Memory.spawns[spawn].random.storageReserve * 0.50)) {
                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn });
                    return;
                }


                if (Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > Memory.spawns[spawn].random.storageReserve && (!Memory.spawns[spawn].creeps.toTerminals.length || Memory.spawns[spawn].counters.upgradeTicks > 300)) {
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'toTerminal', spawn: spawn });
                    if (typeof newName == 'string')
                        Memory.spawns[spawn].counters.upgradeTicks = 0;
                    return;
                }
            }
            let extractor = Game.getObjectById(Memory.spawns[spawn].random.extractor);
            let terminal = Game.getObjectById(Memory.spawns[spawn].random.terminal);

            if (extractor && terminal && extractor.mineralAmount > 0 && _.sum(terminal.store) < terminal.storeCapacity - 50000) {

                if (_.filter(Game.creeps, (creep) => creep.memory.role == 'extractor' && creep.memory.spawn == spawn).length < 1 && !Memory.spawns[spawn].random.hostiles) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'extractor', spawn: spawn });
                    else
                        newName = multiSpawn([CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'extractor', spawn: spawn });

                    return;
                }
            }
            let lab = Game.getObjectById(Memory.spawns[spawn].random.defLab);
            if (!Memory.spawns[spawn].creeps.terminals.length && (Memory.spawns[spawn].random.runReaction || (terminal && terminal.store['XUH2O'] && lab && lab.mineralType == 'XUH2O' && lab.mineralAmount < 1000))) {
                newName = multiSpawn([MOVE, CARRY, CARRY], { role: 'terminal', spawn: spawn });
                return;
            }
            if (harvesters.length < h) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550 || harvesters.length == 0 && Game.rooms[Memory.spawns[spawn].random.mainRoom].energyAvailable < 550)
                    newName = multiSpawn([WORK, CARRY, MOVE], { role: 'harvester', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    newName = multiSpawn([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], { role: 'harvester', spawn: spawn });
                else
                    newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'harvester', spawn: spawn });
                return;
            }
            else if (harvesters2.length < h2) {
                for (let a = 0, length = Memory.spawns[spawn].random.rooms.length; a < length; a++) {
                    if (Memory.spawns[spawn].random.rooms[a].spawn > _.filter(harvesters2, (creep) => Game.creeps[creep].memory.room == Memory.spawns[spawn].random.rooms[a].name).length) {
                        if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1750)
                            newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'harvester2', spawn: spawn, room: Memory.spawns[spawn].random.rooms[a].name });
                            //else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 2050)
                            //    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'harvester2', spawn: spawn });
                        else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 2250) {
                            newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'harvester2', spawn: spawn, room: Memory.spawns[spawn].random.rooms[a].name });
                        }
                        else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                            newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'harvester2', spawn: spawn, room: Memory.spawns[spawn].random.rooms[a].name });
                        else
                            newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE], { role: 'harvester2', spawn: spawn, room: Memory.spawns[spawn].random.rooms[a].name, sk: Memory.spawns[spawn].random.rooms[a].sk });

                        return;
                    }
                }
            }
            if (builders.length < b) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    newName = multiSpawn([WORK, CARRY, MOVE], { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    newName = multiSpawn([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'builder', spawn: spawn });
                return;
            }
            if (upgraders.length < u) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    newName = multiSpawn([WORK, CARRY, MOVE], { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    newName = multiSpawn([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader', spawn: spawn });
                return;
            }


            if (terminal && terminal.store.energy > 55000 && !Memory.spawns[spawn].creeps.toStores.length && Game.rooms[Memory.spawns[spawn].random.mainRoom].controller.level != 8) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'toStore', spawn: spawn });
                else
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'toStore', spawn: spawn });
                return;
            }
            if (terminal && terminal.store.energy > 180000 && Memory.spawns[spawn].creeps.toStores.length && Memory.spawns[spawn].creeps.toStores.length < 4 && Game.rooms[Memory.spawns[spawn].random.mainRoom].controller.level != 8) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'toStore', spawn: spawn });
                else
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'toStore', spawn: spawn });
                return;
            }

            
            if (Memory.spawns[spawn].random.boostRoom) {
                let boosting = Memory.spawns[spawn].random.boostNumber;
                let store = Game.getObjectById(Memory.spawns[boosting].random.storeId);
                if (store) {
                    let storeVal;
                    if (Game.rooms[Memory.spawns[boosting].random.mainRoom].controller.level < 6) {
                        storeVal = store.store.energy / 100000 + 1 | 0;
                        if (storeVal > 6)
                            storeVal = 6;
                    }
                    else
                        storeVal = (store.store.energy - 700000) / 50000 + 1 | 0;
                    if (Memory.spawns[boosting].creeps.upgraders2.length < (storeVal < 1 ? 1 : storeVal)) {
                        let getBoost = false;
                        if (Memory.spawns[boosting].random.upgradeBoost)
                            getBoost = true;
                        newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: boosting, getBoost: getBoost, boost: true });

                        return;
                    }
                    if (Game.rooms[Memory.spawns[boosting].random.mainRoom].controller.level < 6 && Game.rooms[Memory.spawns[boosting].random.mainRoom].controller.level > 3) {
                        var toId = store.id;
                        //if(Memory.spawns[boosting].random.terminal)
                        //    toId = Memory.spawns[boosting].random.terminal;
                        if (Game.getObjectById(Memory.spawns[spawn].random.terminal).store.energy > 80000 && (!Memory.spawns[boosting].creeps.toTerminals.length || Memory.spawns[boosting].counters.upgradeTicks > 250)) {
                            newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'toTerminal', spawn: boosting, boost: true, from: Memory.spawns[spawn].random.terminal, to: toId, twr: Memory.spawns[boosting].random.twr });
                            if (typeof newName == 'string')
                                Memory.spawns[boosting].counters.upgradeTicks = 0;
                            return;
                        }

                    }
                    var toId = store.id;
                    if (Game.rooms[Memory.spawns[boosting].random.mainRoom].terminal.store.energy && !Memory.spawns[boosting].creeps.toTerminals.length) {
                        newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE], { role: 'toTerminal', spawn: boosting, boost: true, from: Game.rooms[Memory.spawns[boosting].random.mainRoom].terminal.id, to: toId, twr: Memory.spawns[boosting].random.twr });
                        return;

                    }
                }
                if (!Memory.spawns[boosting].creeps.claims.length && (!Game.rooms[Memory.spawns[boosting].random.mainRoom].controller.level == 8 || Game.rooms[Memory.spawns[boosting].random.mainRoom].controller.progress > 10000000)) {
                    newName = multiSpawn([MOVE, CLAIM], { role: 'claim', spawn: boosting, sourceRoom: Memory.spawns[boosting].random.mainRoom, boost: true });
                }
            }

            if (spawn == 0) {
                if (Memory.spawns[13].creeps.helpers.length < 3) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, MOVE, WORK, WORK, MOVE, MOVE], { role: 'builder', spawn: 6, helper: true });
                    else
                        newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader', spawn: 13, helper: true });

                    return;
                }
                if (Memory.spawns[2].creeps.helpers.length < 0) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, MOVE, MOVE], { role: 'harvester', spawn: 1, helper: true });
                    else
                        newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'builder', spawn: 1, helper: true });

                    return;
                }

                if (Memory.spawns[2].creeps.helpers.length < 0) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader', spawn: 1, helper: true });
                    else
                        newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'builder', spawn: 1, helper: true });

                    return;
                }
            }
            //power
            if (Memory.spawns[spawn].power.hasPower) {

                if (!Game.creeps['atkPower' + [spawn] + '-' + 0] && !Game.creeps['atkPower' + [spawn] + '-' + 1]) {
                    for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                        spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, MOVE], 'atkPower' + [spawn] + '-' + 0, { role: 'powerA', spawn: spawn, room: Memory.spawns[spawn].power.room, dontLoot: true });
                        if (typeof spawnReturn == 'string')
                            return;
                    }

                }

                if (!Game.creeps['healPower' + [spawn] + '-' + 0 + '|' + 0] && !Game.creeps['healPower' + [spawn] + '-' + 0 + '|' + 1]) {
                    for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                        spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE], 'healPower' + [spawn] + '-' + 0 + '|' + 0, { role: 'powerH', spawn: spawn, room: Memory.spawns[spawn].power.room, target: 'atkPower' + [spawn] + '-' + 0, dontLoot: true });
                        if (typeof spawnReturn == 'string')
                            return;
                    }

                }

                if (!Game.creeps['healPower' + [spawn] + '-' + 1 + '|' + 0] && !Game.creeps['healPower' + [spawn] + '-' + 1 + '|' + 1]) {
                    for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                        spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE], 'healPower' + [spawn] + '-' + 1 + '|' + 0, { role: 'powerH', spawn: spawn, room: Memory.spawns[spawn].power.room, target: 'atkPower' + [spawn] + '-' + 0, dontLoot: true });
                        if (typeof spawnReturn == 'string')
                            return;
                    }

                }

                if (!Game.creeps['atkPower' + [spawn] + '-' + 1] && Game.creeps['atkPower' + [spawn] + '-' + 0] && Game.creeps['atkPower' + [spawn] + '-' + 0].ticksToLive < 500) {
                    for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                        spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, MOVE], 'atkPower' + [spawn] + '-' + 1, { role: 'powerA', spawn: spawn, room: Memory.spawns[spawn].power.room, dontLoot: true });
                        if (typeof spawnReturn == 'string') {
                            Memory.spawns[spawn].power.spawnedLast = true;
                            return;
                        }
                    }

                }

                if (!Game.creeps['healPower' + [spawn] + '-' + 0 + '|' + 1] && Game.creeps['healPower' + [spawn] + '-' + 0 + '|' + 0] && Game.creeps['healPower' + [spawn] + '-' + 0 + '|' + 0].ticksToLive < 500) {
                    for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                        spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE], 'healPower' + [spawn] + '-' + 0 + '|' + 1, { role: 'powerH', spawn: spawn, room: Memory.spawns[spawn].power.room, target: 'atkPower' + [spawn] + '-' + 1, dontLoot: true });
                        if (typeof spawnReturn == 'string')
                            return;
                    }

                }
                if (!Game.creeps['healPower' + [spawn] + '-' + 1 + '|' + 1] && Game.creeps['healPower' + [spawn] + '-' + 1 + '|' + 0] && Game.creeps['healPower' + [spawn] + '-' + 1 + '|' + 0].ticksToLive < 500) {
                    for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                        spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE], 'healPower' + [spawn] + '-' + 1 + '|' + 1, { role: 'powerH', spawn: spawn, room: Memory.spawns[spawn].power.room, target: 'atkPower' + [spawn] + '-' + 1, dontLoot: true });
                        if (typeof spawnReturn == 'string')
                            return;
                    }

                }
                if (Memory.spawns[spawn].power.spawned < Memory.spawns[spawn].power.spawn) {
                    for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                        spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], null, { role: 'powerC', spawn: spawn, room: Memory.spawns[spawn].power.room, dontLoot: true });
                        if (typeof spawnReturn == 'string') {
                            Memory.spawns[spawn].power.spawned++;
                            return;
                        }
                    }

                }
                if (Memory.spawns[spawn].power.spawnedLast && !Game.creeps['atkPower' + [spawn] + '-' + 1])
                    Memory.spawns[spawn].power.hasPower = false;
            }

        }
        catch (err) {
            console.log(err + ' SPAWN');
        }
    }
};

module.exports = roleSpawn;