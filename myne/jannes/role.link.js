var roleLink = {

    /** @param {Creep} creep **/
    run: function (spawn) {
        var linkToC;

        var linkTo = Game.getObjectById(Memory.spawns[spawn].links.receiver);
        if (!linkTo)
            return;

        if(Memory.spawns[spawn].links.receiverC)
            linkToC = Game.getObjectById(Memory.spawns[spawn].links.receiverC);

        for (let a = 0, length = Memory.spawns[spawn].links.producers.length; a < length; a++) {
            var linkFrom = Game.getObjectById(Memory.spawns[spawn].links.producers[a].id);
            if(!linkFrom)
                continue;
            if (linkFrom.energy < 200)
                continue;

            if (linkToC && Memory.spawns[spawn].links.producers[a].source && linkToC.energy < 600) {
                    linkFrom.transferEnergy(linkToC);
                    continue;
            }

            linkFrom.transferEnergy(linkTo);
        }


        if (linkToC && linkToC.energy < 300 && linkTo.energy > 199)
            linkTo.transferEnergy(linkToC);
    }
};

module.exports = roleLink;