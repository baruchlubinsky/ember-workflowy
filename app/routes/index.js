import Ember from 'ember';

export default Ember.Route.extend({
	model: function(model) {
		var root = this.store.createRecord('listItemDatum', {text: "Root", note: "Hi! I'm the root item."});
		root.get('children').addObject(this.store.createRecord('listItemDatum', {text: "List 1", note: "add a note..."}));
		return root;
	},
	actions: {
		setRoot: function(model) {
			this.transitionTo('zoom', model);
		}
	}
});