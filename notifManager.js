module.exports = function(io) {
	var fireDailyNotif = function(title, classification) {
		io.sockets.emit('dailyNotif', {'title' : title, 'classification' : classification});
	}
}