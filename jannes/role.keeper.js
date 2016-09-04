var roleKeeper = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //clearing memory of non existing creeps
        creep.say("keeper");
        creep.moveTo(21, 18, 'W14N58');
    }
};

module.exports = roleKeeper;