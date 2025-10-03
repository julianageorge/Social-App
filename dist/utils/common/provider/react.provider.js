"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionProvider = void 0;
const error_1 = require("../../error");
const enum_1 = require("../enum");
const addReactionProvider = async (repo, id, userId, reaction) => {
    const ModelExist = await repo.exist({ _id: id });
    if (!ModelExist) {
        throw new error_1.NotFoundException("Post Not Found!");
    }
    let userReacted = ModelExist.reactions.findIndex((reaction) => {
        return reaction.userId.toString() == userId.toString();
    });
    if (userReacted == -1) {
        await repo.update({ _id: id }, { $push: { reactions: { reaction: [null, undefined, ""].includes(reaction) ? enum_1.REACTION.like : reaction, userId } } });
    }
    else if ([undefined, null, ""].includes(reaction)) {
        await repo.update({ _id: id }, { $pull: { reactions: ModelExist.reactions[userReacted] } });
    }
    else {
        await repo.update({ _id: id, "reactions.userId": userId }, { $set: { "reactions.$.reaction": reaction } });
    }
};
exports.addReactionProvider = addReactionProvider;
