var roleStore = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        else if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('storing');
        }

        if (creep.memory.skSpawn) {
            if (creep.memory.run) {
                if (creep.pos.getRangeTo(Game.getObjectById(creep.memory.sourceId)) < 5 || creep.pos.getRangeTo(Game.getObjectById(creep.memory.skSpawn)) < 5)
                    creep.moveTo(Game.spawns['Spawn' + parseInt(creep.memory.spawn) + "" + 0]);

                let skCheck2 = Game.getObjectById(creep.memory.skSpawn);
                if (skCheck2 && skCheck2.ticksToSpawn > 9) {
                    let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (enemy && enemy.id)
                        creep.memory.enemy = enemy.id;
                    else {
                        delete creep.memory.run;
                        delete creep.memory.enemy;
                        return;

                    }

                }

                if (creep.memory.enemy) {
                    if (!Game.getObjectById(creep.memory.enemy)) {
                        delete creep.memory.run;
                        delete creep.memory.enemy;
                        return;
                    }

                }
                return;
            }
            let skCheck = Game.getObjectById(creep.memory.skSpawn);

            if (skCheck && skCheck.ticksToSpawn < 9) {
                creep.memory.run = true;
            }
        }
        if (creep.memory.full) {
            var creepSource = Game.getObjectById(creep.memory.sourceId);
            if (Memory.spawns[creep.memory.spawn].random.useLinks && creep.room.name == Memory.spawns[creep.memory.spawn].random.mainRoom) {
                if (creep.memory.linkId) {
                    let link = Game.getObjectById(creep.memory.linkId);
                    if (link) {
                        var transfer = creep.transfer(link, RESOURCE_ENERGY);
                        if (transfer != OK && transfer != ERR_FULL) {
                            delete creep.memory.linkId;
                        }
                        else
                            return;
                    }

                }

                if (creep.pos.getRangeTo(creepSource) < 2) {
                    var targets = creep.pos.findInRange(FIND_STRUCTURES, 2, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_LINK);
                        }
                    });
                    if (targets[0]) {
                        creep.memory.linkId = targets[0].id;

                        var transfer = creep.transfer(targets[0], RESOURCE_ENERGY);
                        if (transfer == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                        return;
                    }
                }
            }
            var sourceEmpty = creep.harvest(creepSource);
            if (sourceEmpty != OK) {
                creep.moveTo(creepSource);
            }

            if (!creep.memory.rep)
                creep.memory.rep = 0;
            creep.memory.rep++;
            if (creep.memory.rep > 7) {
                creep.memory.rep = 0;

                if (!creep.memory.containerId) {
                    if (creep.pos.isNearTo(creepSource)) {
                        if (creep.memory.sk) {
                            if (!creep.memory.skSpawn) {
                                let skFind = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                        return (structure.owner && structure.owner.username == 'Source Keeper')
                                    }
                                });
                                if (skFind && skFind.id) {
                                    creep.memory.skSpawn = skFind.id;
                                }
                            }
                        }
                        creep.memory.containerId = creep.pos.findInRange(FIND_STRUCTURES, 2, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER)
                            }
                        })[0];
                        if (creep.memory.containerId)
                            creep.memory.containerId = creep.memory.containerId.id;
                        else {
                            var sites = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 2);
                            if (!sites.length)
                                Game.rooms[creep.room.name].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_CONTAINER);

                            if (sites && sites.length) {
                                creep.build(sites[0]);
                                creep.memory.rep = 7;
                            }
                            else {
                                var sites = creep.pos.findInRange(creepSource, 3);
                                if (!sites.length) {
                                    creep.moveTo(creepSource);

                                }
                            }
                        }
                    }
                }
                else {
                    let container = Game.getObjectById(creep.memory.containerId);
                    creep.repair(container);
                    if (creep.pos.getRangeTo(container) > 0) {
                        creep.moveTo(container);
                        creep.memory.rep = 7;
                        delete creep.memory.containerId;
                    }
                }
            }
        }

        else {
            var creepSource = Game.getObjectById(creep.memory.sourceId);
            var sourceEmpty = creep.harvest(creepSource);
            if (sourceEmpty != OK)
                creep.moveTo(creepSource);
        }
    }
};

module.exports = roleStore;