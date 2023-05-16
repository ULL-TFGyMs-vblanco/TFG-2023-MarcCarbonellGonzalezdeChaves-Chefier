"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeUtils {
}
exports.default = RecipeUtils;
_a = RecipeUtils;
RecipeUtils.isValidUpdate = (update) => {
    const allowedUpdates = ['likes', 'saved', 'valorations', 'averageRating'];
    const updateEntries = Object.entries(update);
    const actualUpdates = updateEntries.map((entry) => {
        if (entry[0] === '$push' || entry[0] === '$pull') {
            if (typeof entry[1] === 'object' && entry[1] !== null) {
                return Object.keys(entry[1])[0];
            }
        }
        return entry[0];
    });
    return actualUpdates.every((update) => allowedUpdates.includes(update));
};
RecipeUtils.getAggregateSearch = (searchTerms) => {
    const search = {
        index: 'default',
        compound: {
            filter: [],
        },
    };
    search.compound.filter.push({
        text: {
            query: searchTerms,
            path: {
                wildcard: '*',
            },
            fuzzy: { maxEdits: 2, prefixLength: 3 },
        },
    });
    return search;
};
RecipeUtils.getAggregateMatch = (filters) => {
    const match = { $and: [] };
    Object.keys(filters).forEach((filter) => {
        if (filter === 'cookTime' || filter === 'averageRating') {
            const limits = filters[filter].split('-').map((limit) => {
                return parseInt(limit);
            });
            const filterObject = {};
            filterObject[filter] = {
                $gte: limits[0],
                $lte: limits[1],
            };
            match.$and.push(filterObject);
        }
        else if (filter === 'tags') {
            const tags = {
                breakfast: 'Desayuno',
                lunch: 'Almuerzo',
                dinner: 'Cena',
                dessert: 'Postre',
                snack: 'Picoteo',
                drink: 'Bebida',
            };
            const $or = [];
            Object.keys(tags).forEach((tag) => {
                if (filters.tags.includes(tag)) {
                    const filterObject = {};
                    filterObject[`tags.${tag}`] = tags[tag];
                    $or.push(filterObject);
                }
            });
            match.$and.push({ $or });
        }
        else if (filter === 'difficulty') {
            const difficulties = {
                easy: 'Fácil',
                medium: 'Media',
                hard: 'Difícil',
            };
            const $or = [];
            Object.keys(difficulties).forEach((difficulty) => {
                if (filters.difficulty.includes(difficulty)) {
                    const filterObject = {};
                    filterObject[`difficulty`] = difficulties[difficulty];
                    $or.push(filterObject);
                }
            });
            match.$and.push({ $or });
        }
        else if (filter === 'likes' ||
            filter === 'saved' ||
            filter === 'following') {
            const filterObject = {};
            filterObject[filter] = {
                $in: [filters[filter]],
            };
            match.$and.push(filterObject);
        }
        else {
            const filterObject = {};
            filterObject[filter] = filters[filter];
            match.$and.push(filterObject);
        }
    });
    return match;
};
RecipeUtils.getAverageRating = (recipe) => {
    const average = recipe.valorations.reduce((acc, valoration) => acc + valoration.rating, 0) / recipe.valorations.length;
    return isNaN(average) ? 0 : average;
};
RecipeUtils.getMinAndMaxRating = (recipes) => {
    let min = 5;
    let max = 0;
    recipes.forEach((recipe) => {
        const averageRating = _a.getAverageRating(recipe);
        if (averageRating < min)
            min = averageRating;
        if (averageRating > max)
            max = averageRating;
    });
    return [min, max];
};
RecipeUtils.getMinAndMaxTime = (recipes) => {
    let min = 1500;
    let max = 0;
    recipes.forEach((recipe) => {
        if (recipe.cookTime < min)
            min = recipe.cookTime;
        if (recipe.cookTime > max)
            max = recipe.cookTime;
    });
    return [min, max];
};
RecipeUtils.getDifficulties = (recipes) => {
    const difficulties = { easy: false, medium: false, hard: false };
    recipes.forEach((recipe) => {
        if (recipe.difficulty === 'Fácil')
            difficulties.easy = true;
        if (recipe.difficulty === 'Media')
            difficulties.medium = true;
        if (recipe.difficulty === 'Difícil')
            difficulties.hard = true;
    });
    return difficulties;
};
RecipeUtils.getTags = (recipes) => {
    const tags = {
        breakfast: false,
        lunch: false,
        dinner: false,
        dessert: false,
        snack: false,
        drink: false,
    };
    recipes.forEach((recipe) => {
        if (recipe.tags.breakfast)
            tags.breakfast = true;
        if (recipe.tags.lunch)
            tags.lunch = true;
        if (recipe.tags.dinner)
            tags.dinner = true;
        if (recipe.tags.dessert)
            tags.dessert = true;
        if (recipe.tags.snack)
            tags.snack = true;
        if (recipe.tags.drink)
            tags.drink = true;
    });
    return tags;
};
