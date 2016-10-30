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
            if (Memory.spawns[spawn].random.useStore && (Memory.spawns[spawn].creeps.users.length < Memory.spawns[spawn].summon.users || (Game.creeps[Memory.spawns[spawn].creeps.users[0]].body.length == 6 && Memory.spawns[spawn].creeps.users.length <= Memory.spawns[spawn].summon.users) || (Memory.spawns[spawn].creeps.users.length < 2 && Memory.spawns[spawn].creeps.users[0] && Game.creeps[Memory.spawns[spawn].creeps.users[0]].ticksToLive < 40))) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1750)
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'user', spawn: spawn });
                else
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'user', spawn: spawn });

                if (newName == -6)
                    newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'user', spawn: spawn });
                return;
            }

            if (Memory.spawns[spawn].random.defenders.length) {
                for (let def = 0, length = Memory.spawns[spawn].random.defenders.length; def < length; def++) {
                    //def = 0;
                    if (Memory.spawns[spawn].random.defenders[def] != Memory.spawns[spawn].random.mainRoom) {
                        let defs = _.filter(defenders, (creep) => Game.creeps[creep].memory.sourceRoom == Memory.spawns[spawn].random.defenders[def]);
                        if (!defs.length && Memory.spawns[spawn].random.defenders && Memory.spawns[spawn].random.defenders[def]) {
                            if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1300)
                                newName = multiSpawn([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            else
                                newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.defenders[def] });
                            return;

                        }
                        Memory.spawns[spawn].random.defenders.splice(def, 1);
                    }
                }
            }
            //Game.spawns['Spawn00'].createCreep([CARRY, CARRY, MOVE], null, { role: 'terminal', spawn: 0 });
            if (Memory.spawns[spawn].random.useLinks && !Memory.spawns[spawn].creeps.movers.length || Memory.spawns[spawn].creeps.movers.length < 2 && Memory.spawns[spawn].creeps.movers[0] && Game.creeps[Memory.spawns[spawn].creeps.movers[0]].ticksToLive < 50) {
                newName = multiSpawn([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], { role: 'mover', spawn: spawn });
                return;
            }

            //dont else if
            if (Memory.spawns[spawn].random.useStore && Memory.spawns[spawn].creeps.stores.length < sources.length) {
                for (let s = 0, length = sources.length; s < length; s++) {
                    let filterLength = _.filter(stores, (creep) => Game.creeps[creep].memory.sourceId == sources[s].id);
                    if (Memory.spawns[spawn].random.useLinks && sources[s].pos.roomName == Memory.spawns[spawn].random.mainRoom) {
                        if (!filterLength.length || (filterLength.length == 1 && Game.creeps[filterLength[0]].ticksToLive < 40)) {
                            newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], { role: 'store', sourceId: sources[s].id, spawn: spawn });
                            return;
                        }
                    }
                    else if (!filterLength.length || (filterLength.length == 1 && Game.creeps[filterLength[0]].ticksToLive < 80)) {
                        newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], { role: 'store', sourceId: sources[s].id, spawn: spawn });
                        return;
                    }

                }
            }



            if (Memory.spawns[spawn].spots.length && !Memory.spawns[spawn].random.defenders.length) {
                for (let scout = 0, length = Memory.spawns[spawn].spots.length; scout < length; scout++) {
                    let ticks = _.filter(scouts, (creep) => Game.creeps[creep].memory.sourceRoom == Memory.spawns[spawn].spots[scout].sourceRoom);
                    if (!ticks.length || (ticks.length == 1 && Game.creeps[ticks[0]].ticksToLive < 100)) {
                        if (Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom] && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation && Game.rooms[Memory.spawns[spawn].spots[scout].sourceRoom].controller.reservation.ticksToEnd > 3500 || Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1300)
                            newName = multiSpawn([MOVE], { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        else
                            newName = multiSpawn([MOVE, CLAIM, CLAIM, MOVE], { role: 'scout', sourceRoom: Memory.spawns[spawn].spots[scout].sourceRoom, spawn: spawn });
                        return;
                    }
                }
            }
            //dont else if
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
                        if (harvesters2.length == 0 && Game.rooms[Memory.spawns[spawn].random.mainRoom].energyAvailable < 1600)
                            newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'harvester2', spawn: spawn, room: Memory.spawns[spawn].random.rooms[a].name });
                        else {
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
                                newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, WORK, MOVE], { role: 'harvester2', spawn: spawn, room: Memory.spawns[spawn].random.rooms[a].name });
                        }
                        return;
                    }
                }
            }
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
            if (Game.rooms[Memory.spawns[spawn].random.mainRoom].controller.level < 8) {
                if (builders2.length < b2) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], { role: 'builder2', spawn: spawn });
                    else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                    else
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                    //newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });

                    if (typeof newName == 'string' && Memory.spawns[spawn].random.terminal) {
                        //check order
                        var total = _.sum(Memory.spawns[spawn].random.terminal.store);
                        if (total > 100000) {
                            var maxTransferEnergyCost = Memory.spawns[spawn].random.terminal.store.energy;
                            for (var resource in Memory.spawns[spawn].random.terminal.store) {
                                if (resource != 'energy' && Memory.spawns[spawn].random.terminal.store[resource] > 100000) {
                                    var amountToSell = 50000;

                                    var orders = Game.market.getAllOrders(order => order.resourceType == resource &&
                                        order.type == ORDER_BUY && order.price > 0.99 &&
                                        Game.market.calcTransactionCost(1000, Memory.spawns[spawn].random.mainRoom, order.roomName) < 700);
                                    if (orders.length) {
                                        Game.market.deal(orders[0].id, amountToSell, Memory.spawns[spawn].random.mainRoom);
                                        //Game.notify(Game.market.deal(orders[0].id, amountToSell, Memory.spawns[spawn].random.mainRoom));
                                        //Game.notify(amountToSell + " " + resource + " " + orders[0].id + " " + Memory.spawns[spawn].random.mainRoom + " " + Memory.spawns[spawn].random.terminal.store.energy);
                                    }
                                }
                            }
                        }
                    }
                    return;

                }
                else if (upgraders2.length < u2 || (Memory.spawns[spawn].random.storeId && Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > Memory.spawns[spawn].random.storageReserve && Memory.spawns[spawn].counters.upgradeTicks > 400)) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable <= 1800)
                        newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn });
                    else
                        newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn });
                    if (typeof newName == 'string')
                        Memory.spawns[spawn].counters.upgradeTicks = 0;

                    return;
                }
            }
            else {
                if (builders2.length < b2 || (Memory.spawns[spawn].random.storeId && Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > Memory.spawns[spawn].random.storageReserve && Memory.spawns[spawn].counters.upgradeTicks > 300)) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1800)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE], { role: 'builder2', spawn: spawn });
                    else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                    else
                        newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });
                    //newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE], { role: 'builder2', spawn: spawn });

                    if (typeof newName == 'string' && Memory.spawns[spawn].random.terminal) {
                        //check order
                        var total = _.sum(Memory.spawns[spawn].random.terminal.store);
                        if (total > 100000) {
                            var maxTransferEnergyCost = Memory.spawns[spawn].random.terminal.store.energy;
                            for (var resource in Memory.spawns[spawn].random.terminal.store) {
                                if (resource != 'energy' && Memory.spawns[spawn].random.terminal.store[resource] > 50000) {
                                    var amountToSell = 50000;

                                    var orders = Game.market.getAllOrders(order => order.resourceType == resource &&
                                        order.type == ORDER_BUY && order.price > 0.99 &&
                                        Game.market.calcTransactionCost(1000, Memory.spawns[spawn].random.mainRoom, order.roomName) < 700);
                                    if (orders.length) {
                                        Game.market.deal(orders[0].id, amountToSell, Memory.spawns[spawn].random.mainRoom);
                                        //Game.notify(Game.market.deal(orders[0].id, amountToSell, Memory.spawns[spawn].random.mainRoom));
                                        //Game.notify(amountToSell + " " + resource + " " + orders[0].id + " " + Memory.spawns[spawn].random.mainRoom + " " + Memory.spawns[spawn].random.terminal.store.energy);
                                    }
                                }
                            }
                        }
                    }
                    return;

                }
                else if (!upgraders2.length && Memory.spawns[spawn].random.storeId && Game.getObjectById(Memory.spawns[spawn].random.storeId).store.energy > (Memory.spawns[spawn].random.storageReserve * 0.85)) {
                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'upgrader2', spawn: spawn });
                    if (typeof newName == 'string')
                        Memory.spawns[spawn].counters.upgradeTicks = 0;

                    return;
                }
            }
            //console.log('Upgraders: ' + upgraders.length);

            //Game.spawns['Spawn10'].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], null, { role: 'upgrader2', spawn: 2 });

            //console.log('Builders: ' + builders.length);

            if (Memory.spawns[spawn].random.extractor && Memory.spawns[spawn].random.terminal && Game.getObjectById(Memory.spawns[spawn].random.extractor).mineralAmount > 0 && _.sum(Memory.spawns[spawn].random.terminal.store) < Memory.spawns[spawn].random.terminal.storeCapacity - 50000) {

                if (_.filter(Game.creeps, (creep) => creep.memory.role == 'extractor' && creep.memory.spawn == spawn).length < 2 && !Memory.spawns[spawn].random.hostiles) {
                    newName = multiSpawn([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'extractor', spawn: spawn });
                    return;
                }
            }

            if (Memory.spawns[spawn].random.runReaction && !Memory.spawns[spawn].creeps.terminals) {
                newName = multiSpawn([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], { role: 'terminal', spawn: spawn });
                return;
            }

            else if (attackersH.length < atkH) {
                //ranged
                newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerH', spawn: spawn, getBoost: true, getBoostM: true, getBoostH: true, getBoostT: true });
                return;
                //melee
                //var newName4 = Game.spawns['Spawn' + spawn+1].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], { role: 'attacker' , spawn: spawn});
            }
            else if (attackersM.length < atkM) {
                //ranged
                //var newName4 = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK], { role: 'attacker', spawn: spawn });
                //melee
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, HEAL, HEAL, HEAL, HEAL, HEAL], { role: 'attackerM', spawn: spawn });
                else
                    newName = multiSpawn([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], { role: 'attackerM', spawn: spawn, getBoost: true, getBoostM: true, getBoostA: true, getBoostT: true });

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

            if (Memory.spawns[spawn].random.hostiles && (!Memory.spawns[spawn].creeps.defenders.length || Memory.spawns[spawn].creeps.defenders.length < 5)) {
                if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 1640)
                    newName = multiSpawn([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom });
                else if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                    newName = multiSpawn([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom });
                else
                    newName = multiSpawn([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], { role: 'defender', spawn: spawn, sourceRoom: Memory.spawns[spawn].random.mainRoom });

                Memory.spawns[spawn].random.hostiles = false;
                return;
            }
            if (spawn == 0) {
                if (Memory.spawns[3].creeps.helpers.length < 0) {
                    if (Game.rooms[Memory.spawns[spawn].random.mainRoom].energyCapacityAvailable < 5000)
                        newName = multiSpawn([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, MOVE, MOVE], { role: 'builder', spawn: 3, helper: true });
                    else
                        newName = multiSpawn([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], { role: 'builder', spawn: 3, helper: true });

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
        }
        catch (err) {
            console.log(err);
        }
    }
};

module.exports = roleSpawn;