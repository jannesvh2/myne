var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (h, b, u, h2, b2, u2, atkM, atkR, atkH, harvesters, builders, upgraders, harvesters2, builders2, upgraders2, attackersM, attackersR, attackersH, scouts, stores, sources, defenders, spawn) {

        var didSpawn = false;
        var newName;
        var multiSpawn = function (parts, mem) {
            var spawnReturn = "";
            for (let a = 0; a < Memory.spawns[spawn].summon.spawns; a++) {
                let spawnReturn = Game.spawns['Spawn' + parseInt(spawn) + "" + a].createCreep(parts, null, mem);
                if (spawnReturn != -4) {
                    return spawnReturn;
                }
            }
            return spawnReturn;

        }
        //Game.rooms.W59S29.energyCapacityAvailable
        //spawn harvesters
        if (Memory.spawns[spawn].random.useStore && !Memory.spawns[spawn].creeps.users.length) {
            if (didSpawn == false) {
                newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], { role: 'user', spawn: spawn });
                return;
                didSpawn = true;


            }
        }
        if (Memory.spawns[spawn].random.useStore && Memory.spawns[spawn].creeps.users.length < Memory.spawns[spawn].summon.users) {
            if (didSpawn == false) {
                newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'user', spawn: spawn });
                return;
                didSpawn = true;


            }
        }

        if (Memory.spawns[spawn].random.defenders.length) {
            if (didSpawn == false) {
                for (let def = 0, length = Memory.spawns[spawn].random.defenders.length; def < length; def++) {
                    //def = 0;
                    if (Memory.spawns[spawn].random.defenders[def] != Memory.spawns[spawn].random.mainRoom) {
                        let defs = _.filter(defenders, (creep) => creep.memory.sourceRoom == Memory.spawns[spawn].random.defenders[def]);
                        if (!defs.length) {
                            newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            return;
                            didSpawn = true;
                            break;
                        }

                    }
                    Memory.spawns[spawn].random.defenders.splice(def, 1);
                }
            }
        }
        //Game.spawns['Spawn00'].createCreep([CARRY, CARRY, MOVE], null, { role: 'terminal', spawn: 0 });
        if (Memory.spawns[spawn].random.useLinks && !Memory.spawns[spawn].creeps.movers.length) {
            if (didSpawn == false) {
                newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], { role: 'mover', spawn: spawn });
                return;
                didSpawn = true;


            }
        }

        //dont else if
        if (Memory.spawns[spawn].random.useStore) {
            if (didSpawn == false) {
                for (let s = 0, length = sources.length; s < length; s++) {
                    let filterLength = _.filter(stores, (creep) => creep.memory.sourceId.id == sources[s].id);
                    if (Memory.spawns[spawn].random.useLinks && sources[s].pos.roomName == Memory.spawns[spawn].random.mainRoom) {
                        if (!filterLength.length || (filterLength.length == 1 && filterLength[0].ticksToLive < 40)) {

                            if (didSpawn == false) {
                                newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'store', sourceId: sources[s], spawn: spawn });
                                return;
                                didSpawn = true;
                                break;
                            }
                        }
                    }
                    else if (!filterLength.length || (filterLength.length == 1 && filterLength[0].ticksToLive < 80)) {

                        if (didSpawn == false) {
                            newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'store', sourceId: sources[s], spawn: spawn });
                            return;
                            didSpawn = true;
                            break;
                        }
                    }

                }
            }
        }
        //dont else if
        if (harvesters.length < h) {
            if (didSpawn == false) {
                didSpawn = true;
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    newName = multiSpawn([WORK, CARRY, MOVE], { role: 'harvester', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], { role: 'harvester', spawn: spawn });
                else
                    newName = multiSpawn([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'harvester', spawn: spawn });
                return;
            }
        }
        else if (harvesters2.length < h2) {
            if (didSpawn == false) {
                didSpawn = true;
                if (harvesters2.length == 0)
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'harvester2', spawn: spawn });
                else {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'harvester2', spawn: spawn });
                    else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 2050)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'harvester2', spawn: spawn });
                    else
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'harvester2', spawn: spawn });
                }
                return;
            }
        }
        else if (Memory.spawns[spawn].spots.length && !Memory.spawns[spawn].random.defenders.length) {
            if (didSpawn == false) {
                for (let scout = 0, length = Memory.spawns[spawn].spots.length; scout < length; scout++) {
                    let ticks = _.filter(scouts, (creep) => creep.memory.sourceRoom == Memory.spawns[spawn].spots[scout].sourceRoom);
                    if (!ticks.length || (ticks.length == 1 && ticks[0].ticksToLive < 120)) {
                        if (Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom] && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation.ticksToEnd > 3500 || Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1300)
                            newName = multiSpawn([MOVE], { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        else
                            newName = multiSpawn([MOVE, CLAIM, CLAIM, MOVE], { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        return;
                        didSpawn = true;
                        break;

                    }
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
            //            var newName6 = Game.spawns['Spawn' + spawn+1].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], { role: 'link', type: 'source', sourceRoom: Memory.linkSource[l].sourceRoom, id: Memory.linkSource[l].id });
            //        if (summonContainer)
            //            var newName7 = Game.spawns['Spawn' + spawn+1].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], { role: 'link', type: 'container', sourceRoom: Memory.linkSource[l].sourceRoom });
            //    }
            //}

            if (builders.length < b) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    newName = multiSpawn([WORK, CARRY, MOVE], { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], { role: 'builder', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    newName = multiSpawn([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'builder', spawn: spawn });
                return;
            }
            else if (builders2.length < b2) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], { role: 'builder2', spawn: spawn });
                else
                    newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });

                if (typeof newName == 'string' && Memory.spawns[spawn].random.terminal) {
                    //check order
                    var total = _.sum(Memory.spawns[spawn].random.terminal.store);
                    if (total > 100000) {
                        var maxTransferEnergyCost = Memory.spawns[spawn].random.terminal.store.energy;
                        for (var resource in Memory.spawns[spawn].random.terminal.store) {
                            if (resource != 'energy' && Memory.spawns[spawn].random.terminal.store[resource] > 50000) {
                                var amountToSell = 50000;

                                var orders = Game.market.getAllOrders(order => order.resourceType == resource &&
                                    order.type == ORDER_BUY && order.price > 0.49 &&
                                    Game.market.calcTransactionCost(1000, Memory.spawns[spawn].random.mainRoom, order.roomName) < 700);
                                if (orders.length)
                                    Game.notify(Game.market.deal(orders[0].id, amountToSell, Memory.spawns[spawn].random.mainRoom));
                            }
                        }
                    }
                }
                return;

            }
                //console.log('Upgraders: ' + upgraders.length);
            else if (upgraders.length < u) {

                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 550)
                    newName = multiSpawn([WORK, CARRY, MOVE], { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 800)
                    newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], { role: 'upgrader', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable >= 800)
                    newName = multiSpawn([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader', spawn: spawn });
                return;
            }
                //Game.spawns['Spawn10'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], null, { role: 'upgrader2', spawn: 2 });
            else if (upgraders2.length < u2 || (Memory.spawns[spawn].random.storeId && Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > Memory.spawns[spawn].random.storageReserve && Memory.spawns[spawn].counters.upgradeTicks > 400)) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 2200)
                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn });
                else
                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn });
                if (typeof newName == 'string')
                    Memory.spawns[spawn].counters.upgradeTicks = 0;
                return;
            }
                //console.log('Builders: ' + builders.length);

            else if (Memory.spawns[spawn].random.extractor && Memory.spawns[spawn].random.terminal && Game.getObjectById(Memory.spawns[spawn].random.extractor).mineralAmount > 0 && _.sum(Memory.spawns[spawn].random.terminal.store) < Memory.spawns[spawn].random.terminal.storeCapacity - 50000) {
                if (_.filter(Game.creeps, (creep) => creep.memory.role == 'extractor' && creep.memory.spawn == spawn).length < 3)
                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'extractor', spawn: spawn });
                return;
            }
            else if (attackersH.length < atkH) {
                //ranged
                newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL], { role: 'attackerH', spawn: spawn, getBoost: false });
                return;
                //melee
                //var newName4 = Game.spawns['Spawn' + spawn+1].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], { role: 'attacker' , spawn: spawn});
            }
            else if (attackersM.length < atkM) {
                //ranged
                //var newName4 = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], { role: 'attacker', spawn: spawn });
                //melee
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, HEAL], { role: 'attackerM', spawn: spawn });
                else
                    newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, HEAL, HEAL], { role: 'attackerM', spawn: spawn, getBoost: false });

                return;
            }
            else if (attackersR.length < atkR) {
                //ranged
                newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], { role: 'attackerR', spawn: spawn });
                //melee
                //var newName4 = Game.spawns['Spawn' + spawn+1].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], { role: 'attacker' , spawn: spawn});
                return;
            }

            else if (Memory.spawns[spawn].creeps.attackersD.length < Memory.spawns[spawn].summon.atkD) {
                //ranged
                newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK], { role: 'attackerD', spawn: spawn });
                return;
                //melee
                //var newName4 = Game.spawns['Spawn' + spawn+1].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], { role: 'attacker' , spawn: spawn});
            }
            else if (Memory.spawns[spawn].random.hostiles) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom });
                else
                    newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, HEAL, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[a].random.mainRoom });

                Memory.spawns[spawn].random.hostiles = false;
                return;
            }
        }

    }
};

module.exports = roleSpawn;