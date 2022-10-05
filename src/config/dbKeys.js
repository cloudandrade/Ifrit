const DBUSER= process.env.DB_USER
const DBPASSWD= process.env.DB_PASS
const DBNAME = process.env.DB_NAME

module.exports = {
	MongoURI:
		`mongodb+srv://${DBUSER}:${DBPASSWD}@cluster0.jswospc.mongodb.net/${DBNAME}?retryWrites=true&w=majority`,
};