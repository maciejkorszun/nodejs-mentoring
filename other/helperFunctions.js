function countId() {
	let counter = 0;
	return () => ++counter;
}
const getNewId = countId();


module.exports = {getNewId};