var roleLink = {

    /** @param {Creep} creep **/
    run: function (spawn) {
        for (let a = 0, length = Memory.spawns[spawn].links.producers.length; a < length; a++) {
            var linkFrom = Game.getObjectById(Memory.spawns[spawn].links.producers[a].id);
            if (linkFrom.energy < 200)
                continue;
            if (Memory.spawns[spawn].links.receiverc) {
                var linkToC = Game.getObjectById(Memory.spawns[spawn].links.receiverc);
                if (linkToC && linkToC.energy < 600 && Memory.spawns[spawn].links.producers[a].source) {
                    linkFrom.transferEnergy(linkToC);
                    continue;
                }
                if (linkToC && linkToC.energy < 200)
                    linkTo.transferEnergy(linkToC);
            }

            var linkTo = Game.getObjectById(Memory.spawns[spawn].links.receiver);
            if (!linkFrom || !linkTo)
                continue;


            linkFrom.transferEnergy(linkTo);
        }
    }
};

module.exports = roleLink;