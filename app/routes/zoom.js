import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {	
		this._super(controller, model);	
		var children = model.get('children');
		if(children.content.length === 0 ) {
			children.pushObject(this.store.createRecord('listItemDatum', {}));
		}
		var menu = Ember.ArrayController.create();
		var parent = model.get('parent');
		while(parent) {
			menu.insertAt(0, parent);
			parent = parent.get('parent');
		}
		controller.set('nav', menu);
	},
	actions: {
		setRoot: function(model) {
			this.transitionTo('zoom', model);
		}
	}
});