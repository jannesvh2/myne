var roleLab = {

    /** @param {Creep} creep **/
    run: function () {
        for (let a = 0, length = Memory.spawns.length; a < length; a++) {
            if (Memory.spawns[a].random.runReaction) {
                for (let s = 0, lengthS = Memory.spawns[creep.memory.spawn].reactions.length; s < lengthS; s++) {
                    Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][0]).runReaction(Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][1]), Game.getObjectById(Memory.spawns[creep.memory.spawn].reactions[s][2]));
                }
            }
        }
    }
};

module.exports = roleLab;