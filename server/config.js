export const sequelizeConfigProps = {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        options: {
            enableArithAbort: true,
            truestedConnection: true,
        },
    },
}