var roleLab = {

    /** @param {Creep} creep **/
    run: function () {
        for (let a = 0, length = Memory.spawns.length; a < length; a++) {
            if (Memory.spawns[a].random.runReaction) {
                Game.getObjectById('57deceb85b49191922741434').runReaction(Game.getObjectById('57ddc0f8c4053ddd7aeb3767'), Game.getObjectById('57de0a4844c88be676166f38'));
                Game.getObjectById('57e84b5fbb15468048b138c5').runReaction(Game.getObjectById('57e82d19aa2ea5d53c59e273'), Game.getObjectById('57e7f576a24b7b6c03718f89'));
            }
        }
    }
};

module.exports = roleLab;