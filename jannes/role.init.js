var roleInit = require('role.link');

var roleCreateJSON = {

    /** @param {Creep} creep **/
    run: function () {

        //init
        var rooms = 3;

        if (!Memory.spawns)
            Memory.spawns = [];

        for (let a = 0; a < rooms; a++) {
            if (!Memory.spawns[a]) {
                Memory.spawns.push(new Object());

                Memory.spawns[a].summon = {};
                Memory.spawns[a].random = {};
                Memory.spawns[a].random.defenders = [];
                Memory.spawns[a].creeps = {};
                Memory.spawns[a].counters = {};
                Memory.spawns[a].counters.upgradeTicks = 0;
                Memory.spawns[a].counters.roomTicks = 0;
                Memory.spawns[a].random.storageReserve = 0;
                Memory.spawns[a].counters.repairLimit = 10000;
                Memory.spawns[a].counters.avgAtSource = {};
                Memory.spawns[a].counters.atSources = {};
                Memory.spawns[a].repairHp = {};
                Memory.spawns[a].repairHpHistory = {};
                Memory.spawns[a].links = {};
            }

            //reset for changes
            Memory.spawns[a].random.rooms = [];
            Memory.spawns[a].spots = [];
            Memory.spawns[a].sources = [];
            Memory.spawns[a].store = [];
            Memory.spawns[a].links.producers = [];
            Memory.spawns[a].random.hostiles = false;

            //ticks
            Memory.spawns[a].counters.upgradeTicks++;
            //Memory.spawns[a].counters.roomTicks++;
            if (Memory.spawns[a].random.storageReserve < 350000)
                Memory.spawns[a].random.storageReserve += 3;

            //repair reset if its to high
            if (Memory.spawns[a].counters.repairLimit > 10000000)
                Memory.spawns[a].counters.repairLimit = 10000;

            //current creeps
            Memory.spawns[a].creeps.harvesters = [];
            Memory.spawns[a].creeps.harvesters2 = [];
            Memory.spawns[a].creeps.builders = [];
            Memory.spawns[a].creeps.builders2 = [];
            Memory.spawns[a].creeps.upgraders = [];
            Memory.spawns[a].creeps.upgraders2 = [];
            Memory.spawns[a].creeps.stores = [];
            Memory.spawns[a].creeps.attackersM = [];
            Memory.spawns[a].creeps.attackersR = [];
            Memory.spawns[a].creeps.attackersH = [];
            Memory.spawns[a].creeps.attackersD = [];
            Memory.spawns[a].creeps.scouts = [];
            Memory.spawns[a].creeps.defenders = [];
            Memory.spawns[a].creeps.movers = [];
            Memory.spawns[a].creeps.users = [];
            Memory.spawns[a].counters.creeps = 0;
            if (Game.rooms[Memory.spawns[a].random.mainRoom].find(FIND_HOSTILE_CREEPS).length) {
                Memory.spawns[a].random.hostiles = true;
            }
        }
    }
};

module.exports = roleInit;