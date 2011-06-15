// FogBugz API v8
var xml2js = require('xml2js'),
    rest = require('restler'),
    url = require('url'),
    querystring = require('querystring');

function FogBugz() {
  this.relativeAPIPath = '/api.asp?';
}

FogBugz.prototype.authenticate = function(email, password, location, callback) {
  var q = querystring.stringify({cmd: 'logon', email: email, password: password});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'token', callback);
};

FogBugz.prototype.allProjects = function(token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'listProjects', fwrite: 1});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'projects.project', callback);
};

FogBugz.prototype.allPeople = function(projectID, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'listPeople'});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'people.person', callback);
};

FogBugz.prototype.allMilestones = function(projectID, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'listFixFors', ixProject: projectID});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'fixfors.fixfor', callback);
};

FogBugz.prototype.allAreas = function(projectID, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'listAreas', ixProject: projectID});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'areas.area', callback);
};

FogBugz.prototype.allPriorities = function(token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'listPriorities'});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'priorities.priority', callback);
};

FogBugz.prototype.allCategories = function(token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'listCategories'});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'categories.category', callback);
};

FogBugz.prototype.allStatuses = function(token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'listStatuses'});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'statuses.status', callback);
};

FogBugz.prototype.newCase = function(values, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'new'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: values });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.editCase = function(values, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'edit'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: values });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.reopenCase = function(values, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'reopen'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: values });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.reactivateCase = function(values, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'reactivate'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: values });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.resolveCase = function(values, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'resolve'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: values });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.closeCase = function(values, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'close'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: values });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.reactivateCase = function(values, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'reactivate'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: values });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.startWork = function(caseID, token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'startWork'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml, data: {ixBug: caseID} });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.stopWork = function(token, location, callback) {
  var q = querystring.stringify({token: token, cmd: 'stopWork'});
  var request = rest.post(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'case', callback);
};

FogBugz.prototype.timeIntervals = function(fromDate, location, token, callback) {
  var dateString = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate();
  var q = querystring.stringify({token: token, cmd: 'listIntervals', dtStart: dateString});
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'intervals.interval', callback);
};

FogBugz.prototype.cases = function(query, columns, limit, token, location, callback) {
  var q = { token: token, cols: columns, cmd: 'search', q: query };
  if (limit) {
    q.max = limit;
  }
  q = querystring.stringify(q);
  var request = rest.get(url.resolve(location, this.relativeAPIPath + q), { parser: rest.parsers.xml });
  this._unwind(request, 'cases.case', callback);
};

FogBugz.prototype._unwind = function(request, keyPath, callback) {
  request.on('success', function(data) {
    var properties = keyPath.split('.');
    var object = data;
    for (var i=0; i<properties.length; i++) {
      var property = properties[i];
      if (object.hasOwnProperty(property)) {
        object = object[property];
      } else if (object.hasOwnProperty('error')) {
        message = object.error['#'];
        callback(message, null);
        return;
      } else {
        callback(null, null);
        return;
      }
    }

    if (!object.length) object = [object];
    callback(null, object);
  });

  request.on('error', function(data) {
    callback(error, null);
  });
};

module.exports = FogBugz;
