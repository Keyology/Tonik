module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send('******This is Tonik backend you are not authorized to be here!******')
    });
}