import { CrewMember, Movie } from "./sync.js";

async function sequelizeAuth(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has successfully connected to the database!");
    }
    catch (err) {
        console.error(`There was an error connecting to the database : ${err}`);
    }
}

async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: false, alter: true });
        console.log("Sync completed!");
    }
    catch (err) {
        console.error(`Sync failed : ${err}`);
    }
}

// async function executeInitialDatabasePopulation() {
//     await Movie.create({
//         Title: "The Godfather",
//         Category: "Crime, Drama",
//         PublicationDate: new Date(1972, 3, 12),
//     });
//     await Movie.create({
//         Title: "The Dark Knight",
//         Category: "Action, Crime, Drama, Thriller",
//         PublicationDate: new Date(2008, 1, 12),
//     });
//     await CrewMember.create({
//         Name: "Popescu Maria",
//         Role: "Writer",
//         MovieId: 1
//     });
//     await CrewMember.create({
//         Name: "Critescu Ion",
//         Role: "Screenwriter",
//         MovieId: 1
//     });
//     await CrewMember.create({
//         Name: "Vasile Ana-Maria",
//         Role: "Writer",
//         MovieId: 2
//     });
//     await CrewMember.create({
//         Name: "Ionescu Andrei",
//         Role: "Director",
//         MovieId: 2
//     });
// }

async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    // await executeInitialDatabasePopulation();
}

async function validateId(sentId, response, callbackFn = function () { }) {
    if (Number.isFinite(sentId) && sentId > 0) return callbackFn();
    else response.status(300).json("Invalid id!");
}
async function validateBody(sentBody, response, callbackFn = function () { }) {
    if (Object.keys(sentBody).length != 0) return callbackFn();
    else response.status(300).json("Body is missing!");
}

async function execAsyncRequest(asyncRequest) {
    try {
        return await asyncRequest();
    } catch (err) {
        throw err;
    }
}

async function getMoviesAndCrewMembers() {
    return await execAsyncRequest(async function retreivedMovies() {
        return await Movie.findAll({
            include: [{
                model: CrewMember
            }
            ]
        });
    })
}

async function getMovieById(movieId) {
    return await execAsyncRequest(async function retreivedMovies() {
        return await Movie.findByPk(movieId);
    });
}

async function createMovie(movie) {
    return await execAsyncRequest(async function createMovie() {
        await Movie.create({
            Title: movie.Title,
            Category: movie.Category,
            PublicationDate: new Date(movie.PublicationDate),
        });
    });
}

async function updateMovie(movieId, movie) {
    await execAsyncRequest(async function updateMovie() {
        const record = await Movie.findByPk(movieId);
        if (record) {
            await record.update({
                Title: movie.Title,
                Category: movie.Category,
                PublicationDate: new Date(movie.PublicationDate),
            });
        }
    });
}

async function deleteMovie(movieId) {
    await execAsyncRequest(async function deleteMovie() {
        const record = await Movie.findByPk(movieId);
        if (record) await record.destroy();
    });
}

async function getMovies() {
    return await execAsyncRequest(async function retreivedMovies() {
        return await Movie.findAll();
    });
}

async function getCrewmemberById(crewmemberId) {
    return await execAsyncRequest(async function retreivedCrewmember() {
        return await CrewMember.findByPk(crewmemberId);
    });
}

async function getMovieAsc() {
    return await execAsyncRequest(async function retreivedMovies() {
        return await Movie.findAll({
            order: [
                ["Title", "ASC"],
            ], include: [{
                model: CrewMember
            }
            ]
        });
    });
}

async function createCrewmember(crewmember) {
    return await execAsyncRequest(async function createCrewmember() {
        await CrewMember.create({
            Name: crewmember.Name,
            Role: crewmember.Role,
            MovieId: crewmember.MovieId,
        });
    });
}

async function getCrewmember() {
    return await execAsyncRequest(async function retreivedMovies() {
        return await CrewMember.findAll();
    })
}

async function updateCrewmember(crewmemberId, crewmember) {
    await execAsyncRequest(async function updateCrewmember() {
        const record = await CrewMember.findByPk(crewmemberId);
        if (record) {
            await record.update({
                Name: crewmember.Name,
                Role: crewmember.Role,
                MovieId: crewmember.MovieId,
            });
        }
    });
}

async function deleteCrewmember(crewmemberId) {
    await execAsyncRequest(async function deleteCrewmember() {
        const record = await CrewMember.findByPk(crewmemberId);
        if (record) await record.destroy();
    });
}


export const sequelizeOperationsAPI = {
    init: sequelizeInit,
    validateId: validateId,
    validateBody: validateBody,
    getMoviesAndCrewMembers: getMoviesAndCrewMembers,
    getMovieById: getMovieById,
    createMovie: createMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,
    getMovies: getMovies,
    getCrewmemberById: getCrewmemberById,
    getMovieAsc: getMovieAsc,
    createCrewmember: createCrewmember,
    getCrewmember: getCrewmember,
    updateCrewmember: updateCrewmember,
    deleteCrewmember: deleteCrewmember,
};