/*======================================================================*\
  ICBIaW50OiBtYWtlIHRoaXMgYXMgY2xvc2UgdG8gcHJvZHVjdGlvbi1yZWFkeSBzb3VyY2
  UgY29kZSBhcyB5b3UgY2FuIQoKICBCb251cyBwb2ludHMgZm9yIHRlbGxpbmcgdXMgd2hh
  dCB0aGlzIGRvZXMgaW4gcGxhaW4gdGVybXM6CgogICAgJycuam9pbihpdGVydG9vbHMuY2
  hhaW4oKnppcChzWy0yOjotMl0sIHNbOjotMl0pKSk=
\*======================================================================*/

NAMESPACE = null;

if (NAMESPACE == null
        || typeof (NAMESPACE) == 'undefined') {
    NAMESPACE = {};

	var _all_ids = {};

    // Creates an object that allocates a new or references an
    // existing very expensive resource associated with `id`
    var resource = function (id) {
        // Private data
        var _closed = false;
        var _id = id;
        
        // Public data
        var persona = {
        };

        // Public methods
        var getExpensiveResource = function () {
        	if (_closed) return null;
            return _all_ids[_id]['payload'];
        };
        
        persona.getExpensiveResource = getExpensiveResource;

        var getId = function () {
            return _id;
        };
        
        persona.getId = getId;

        var close = function () {
            if (_closed) return;	
            _all_ids[_id]['refcount'] -= 1;
            _id = null;
            _closed = true;
            if (_all_ids[_id]['refcount'] == 0) delete _all_ids[_id];
        };

        persona.close = close;
        
        // Private methods
        function _CreateAndCacheExpensiveResourceById(id) {
            if (_all_ids[id] == null) {
                // Just pretend for the sake of this example
                _all_ids[id] = {
                	refcount:1,
                	payload:{value: "I'm a very expensive resource associated with ID " + id}
                };
            } else {
            	_all_ids[id]['refcount'] += 1;
            }
        }
        
        // Initialization
        _CreateAndCacheExpensiveResourceById(id);
        
        return persona;
    };

    NAMESPACE.resource = resource;
}