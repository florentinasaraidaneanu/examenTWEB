import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

const sequelizeConnection = new Sequelize("db", "root", "Florentina1802", sequelizeConfigProps);

//definire entitate 1
export const Movie = sequelizeConnection.define("Movie", {
    MovieId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Title: {
        type: Sequelize.STRING,
    },
    Category: {
        type: Sequelize.STRING,
    },
    PublicationDate: {
        type: Sequelize.DATEONLY
    },
});

//definire entitate 2
export const CrewMember = sequelizeConnection.define("CrewMember", {
    CrewMemberId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING,
    },
    Role: {
        type: Sequelize.STRING,
    },
    MovieId: {
        type: Sequelize.INTEGER,
    },
});

//definire relatie
Movie.hasMany(CrewMember, {
    foreignKey: "MovieId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKeyConstraint: true,
});

sequelizeOperationsAPI.init(sequelizeConnection);

export { sequelizeConnection };