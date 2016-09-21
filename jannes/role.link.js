var roleLink = {

    /** @param {Creep} creep **/
    run: function (spawn) {
        for (let a = 0, length = Memory.spawns[spawn].links.producers; a < length; a++) {

            var linkFrom = Game.getObjectById(Memory.spawns[spawn].links.producers[a]);

            var linkTo =  Game.getObjectById(Memory.spawns[spawn].links.receiver);

            linkFrom.transferEnergy(linkTo);
        }
    }
};

module.exports = roleLink;