var roleLink = {

    /** @param {Creep} creep **/
    run: function (spawn) {
        for (let a = 0, length = Memory.spawns[spawn].links.producers.length; a < length; a++) {

            var linkFrom = Game.getObjectById(Memory.spawns[spawn].links.producers[a]);
            if (linkFrom.energy < 300)
                continue;
            var linkTo =  Game.getObjectById(Memory.spawns[spawn].links.receiver);

            if (linkFrom.transferEnergy(linkTo) == OK)
                break;
        }
    }
};

module.exports = roleLink;