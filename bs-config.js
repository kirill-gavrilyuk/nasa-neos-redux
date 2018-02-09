// Still no transcompliier support in BS config :(

module.exports = {
    port: 8000,
    files: ["./src/**/*.{html,htm,css,js}"],
    server: { "baseDir": "./build" }
};
