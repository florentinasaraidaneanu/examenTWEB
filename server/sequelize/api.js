import "./sync.js"
import { router } from "../server-init.js"
import { sequelizeOperationsAPI } from "./operations-api.js"

//GET - All movies and crewmembers
router.route("/sequelize/get-movies-and-crewmembers")
    .get(async function getMoviesAndCrewMembers(_, response) {
        const result = await sequelizeOperationsAPI.getMoviesAndCrewMembers();
        if (result.length == 0) {
            response.status(300).json("There is no movie to show!");
        } else response.status(200).json(result);
    });

//GET - Movie by id
router.route("/sequelize/get-movie/:movieId")
    .get(async function getMovieById(request, response) {
        const movieId = +request.params.movieId;
        sequelizeOperationsAPI.validateId(movieId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getMovieById(movieId);
            if (result == null) response.status(300).json(`There is no movie to show!`);
            else response.status(200).json(result);
        });
    });

//GET - Crewmember by id
router.route("/sequelize/get-crewmember/:crewmemberId")
    .get(async function getCrewmemberById(request, response) {
        const crewmemberId = +request.params.crewmemberId;
        sequelizeOperationsAPI.validateId(crewmemberId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getCrewmemberById(crewmemberId);
            if (result == null) response.status(300).json(`There is no crewmember to show!`);
            else response.status(200).json(result);
        });
    });

//GET - Movie paginate
router.route("/sequelize/get-movies")
    .get(async function getMovies(_, response) {

        const result = await sequelizeOperationsAPI.getMovies();
        if (result.length == 0) {
            response.status(300).json("There is no movie to show!");
        } else response.status(200).json(result);

    });

//GET - Movie asc
router.route("/sequelize/get-movie-asc")
    .get(async function getMovieAsc(_, response) {

        const result = await sequelizeOperationsAPI.getMovieAsc();
        if (result.length == 0) {
            response.status(300).json("There is no movie to show!");
        } else response.status(200).json(result);

    });

//POST - Movie
router.route("/sequelize/create-movie")
    .post(async function createMovie({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (body.Title == '') {
                    response.status(300).json("The format is incorrect!");
                } else if (body.Title.length < 3) {
                    response.status(300).json("The title should have at least 3 characters!!");
                } else {
                    await sequelizeOperationsAPI.createMovie(body);
                    response.status(200).json("The movie was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });

//PUT - Update movie
router.route("/sequelize/update-movie/:movieId")
    .put(async function updateMovie({ params: { movieId }, body }, response) {
        try {
            sequelizeOperationsAPI.validateId(+movieId, response, async function handleSuccessfulValidation() {
                const record = await sequelizeOperationsAPI.getMovieById(+movieId);
                if (record == null) response.status(300).json("The movie does not exits!");
                else {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        if (body.Title == '') {
                            response.status(300).json("The format is incorrect!");
                        } else if (body.Title.length < 3) {
                            response.status(300).json("The name should have at least 3 characters!!");
                        } else {
                            await sequelizeOperationsAPI.updateMovie(+movieId, body);
                            response.status(200).json("The movie was updated!");
                        }
                    });
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });

//DELETE - Delete Movie
router.route("/sequelize/delete-movie/:movieId")
    .delete(async function deleteMovie({ params: { movieId } }, response) {
        try {
            sequelizeOperationsAPI.validateId(+movieId, response, async function handleSuccessfulValidation() {
                const record = await sequelizeOperationsAPI.getMovieById(+movieId);
                if (record == null) {
                    response.status(300).json("The movie does not exist!");
                } else {

                    await sequelizeOperationsAPI.deleteMovie(+movieId);
                    response.status(200).json("The movie was deleted!");

                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`)
        }
    });

//GET - All crewmembers
router.route("/sequelize/get-crewmembers")
    .get(async function getCrewmember(_, response) {
        const result = await sequelizeOperationsAPI.getCrewmember();
        if (result.length == 0) {
            response.status(300).json("There is no movie to show!");
        } else response.status(200).json(result);
    });

//POST - Crewmember
router.route("/sequelize/create-crewmember")
    .post(async function createCrewmember({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (body.Name == '' || body.Role == '') {
                    response.status(300).json("The format is incorrect!");
                } else if (body.Name.length < 5) {
                    response.status(300).json("The name should have at least 5 characters!!");
                } else {
                    await sequelizeOperationsAPI.createCrewmember(body);
                    response.status(200).json("The crewmember was created!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });

//PUT - Update crewmember
router.route("/sequelize/update-crewmember/:crewmemberId")
    .put(async function updateCrewmember({ params: { crewmemberId }, body }, response) {
        try {
            sequelizeOperationsAPI.validateId(+crewmemberId, response, async function handleSuccessfulValidation() {
                const record = await sequelizeOperationsAPI.getCrewmemberById(+crewmemberId);
                if (record == null) response.status(300).json("The crewmember does not exits!");
                else {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        if (body.Name == '') {
                            response.status(300).json("The format is incorrect!");
                        } else if (body.Name.length < 5) {
                            response.status(300).json("The name should have at least 5 characters!!");
                        } else {
                            await sequelizeOperationsAPI.updateCrewmember(+crewmemberId, body);
                            response.status(200).json("The crewmember was updated!");
                        }
                    });
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });


//DELETE - Delete crewmember
router.route("/sequelize/delete-crewmember/:crewmemberId")
    .delete(async function deleteCrewmember({ params: { crewmemberId } }, response) {
        try {
            sequelizeOperationsAPI.validateId(+crewmemberId, response, async function handleSuccessfulValidation() {
                const record = await sequelizeOperationsAPI.getCrewmemberById(+crewmemberId);
                if (record == null) {
                    response.status(300).json("The crewmember does not exist!");
                } else {

                    await sequelizeOperationsAPI.deleteCrewmember(+crewmemberId);
                    response.status(200).json("The crewmember was deleted!");

                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`)
        }
    });
