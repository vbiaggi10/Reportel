window.writeNewReport = (user_id, id_service, id_operator, id_signal_type, observation, latitude, longitude) => {
  // A post entry.
  var reportData = {
    user_id: user_id,
    id_service: id_service,
    id_operator: id_operator,
    id_signal_type: id_signal_type,
    observation: observation,
    latitude: latitude,
    longitude: longitude
  };

  // Get a key for a new Post.
  var newReportKey = firebase.database().ref().child('report').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/report/' + newReportKey] = reportData;
  updates['/user-report/' + user_id + '/' + newReportKey] = reportData;

  return firebase.database().ref().update(updates);
}
