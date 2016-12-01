var roleLab = {

    /** @param {Creep} creep **/
    run: function () {
        for (let a = 0, length = Memory.spawns.length; a < length; a++) {
            if (Memory.spawns[a].random.runReaction) {
                for (let s = 0, lengthS = Memory.spawns[a].reactions.length; s < lengthS; s++) {
                    Game.getObjectById(Memory.spawns[a].reactions[s][0].l).runReaction(Game.getObjectById(Memory.spawns[a].reactions[s][1].l), Game.getObjectById(Memory.spawns[a].reactions[s][2].l));
                }
            }
        }
    }
};

module.exports = roleLab;