function getNewIdFunction() {
	let counter = 0;
	return () => ++counter;
}
const getNewId = getNewIdFunction();


module.exports = { getNewId };