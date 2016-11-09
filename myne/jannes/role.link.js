var roleLink = {

    /** @param {Creep} creep **/
    run: function (spawn) {
        for (let a = 0, length = Memory.spawns[spawn].links.producers.length; a < length; a++) {
            var linkFrom = Game.getObjectById(Memory.spawns[spawn].links.producers[a].id);
            if(!linkFrom)
                continue;
            if (linkFrom.energy < 200)
                continue;


            var linkTo = Game.getObjectById(Memory.spawns[spawn].links.receiver);
            if (!linkTo)
                continue;

            if (Memory.spawns[spawn].links.receiverC) {
                var linkToC = Game.getObjectById(Memory.spawns[spawn].links.receiverC);
                if (linkToC && linkToC.energy < 600 && Memory.spawns[spawn].links.producers[a].source) {
                    linkFrom.transferEnergy(linkToC);
                    continue;
                }
                if (linkToC && linkToC.energy < 200 && linkTo > 199)
                    linkTo.transferEnergy(linkToC);
            }

            linkFrom.transferEnergy(linkTo);
        }
    }
};

module.exports = roleLink;